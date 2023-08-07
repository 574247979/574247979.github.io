/**********************************************
The Town of Glenvale
***********************************************/

// General Puzzles
function FindItTablet(doc)
{
	var sText = doc.FormChar.research.value.toLowerCase().trim();
	if ((checkPlaceFlag("Crypt", 3) && sText == "modest") ||
		 (checkPlaceFlag("Crypt", 4) && sText == "mason") ||
		 (checkPlaceFlag("Crypt", 5) && sText == "garlic"))
	{
		if (perKurndorf.getQuestCrypt() == 18) perKurndorf.setQuestCrypt(19); // Bambi path set to "have entered crypt"
		setPlaceKnown("Crypt");  // Sets it so you can Enter the Crypt
		var perMonique = findPerson("Monique");
		perMonique.setFlag(5, false);
		gotoPlace(247, '', "Correct! The ground shakes as the great tablet before you crumbles to dust beneath your feet. You have discovered an ancient crypt.");
	}
}

function PuzzleComputer(doc)
{
	if ((perDavy.checkFlag(33) && doc.FormChar.research.value.toLowerCase().trim() == 'e') ||
		 (perDavy.checkFlag(34) && doc.FormChar.research.value.split(" ").join("").split("'").join("").toLowerCase().trim() == 'butiwontdothat') ||
		 (perDavy.checkFlag(35) && doc.FormChar.research.value.toLowerCase().trim() == 'sandman')) {
		gotoPlace(81,"type=passwordright");
	} else gotoPlace(81,"type=passwordwrong");
}

function FindIt105(doc)
{
	if (isRunes()) Research("Spell", "ShioStinMur", "time1.jpg", 81);
	else ResearchOLD("P", doc.FormChar.research.value);
}

function PuzzleRadio(doc)	{
	var perMadison = findPerson("Madison");
	if ((perMadison.checkFlag(33) && (doc.Puzzle.answera.selectedIndex * 44 / 25) == 1.76) ||
		 (perMadison.checkFlag(34) && doc.Puzzle.answera.value == 5) ||
		 (perMadison.checkFlag(35) && doc.Puzzle.answera.value == 3))	{
		gotoPlace(45, "type=radiocorrect");
	} else {
		gotoPlace(45, "type=wradiorong");
	}
}


function initialiseGlenvale()
{
	// The Town
	addPerson("Glenvale", 0, 'Glenvale', '', false);

	//per.extra = [0, 0, 0];
	
	per.getPossessionFace = function() { return "shops-nudist1"; };

	per.passTimeDay = function() {
		this.flags[0] = 0;
		return '';
	};

	per.showPersonTextHere = function(md)
	{
		if (sType !== "" || Math.floor(this.place) != Place) return;
		
		var id = Math.round((this.place - Math.floor(this.place)) * 100);
		var bPublic = id > 70;
		var bNude = id > 40 && id < 71;

		switch (Place) {		
		case 26:
			if (!bNude) md.write('<p>You some people hiking along a track.</p>');
			break;
		case 2:
		case 94:
		case 194:
		case 238:
		case 360:
		case 455:
			md.write('<p>The streets near the center of Glenvale are busiest in the daytime, there are people walking around nearby.</p>');
			break;
		case 63:
			md.write('<p>The park can be quite busy on sunny days, people walking or just sitting in the sun.</p>');
			break;
		case 70:
			md.write('<p>You notice through a classroom door a student teacher you have seen around school. You have never been in one of his classes and you cannot quite remember his name.</p>');
			break;
		case 125:
			md.write('<p>Some people are playing a game on one of the courts.</p>');
			break;			
		case 144:
			md.write('<p>Some sporty students are around playing on the fields.</p>');
			break;
		case 195:
			if (id == 1) md.write('<p>An affectionate couple are browsing at one of the counters.</p>');
			else if (id == 2) md.write('<p>You pass a scantily clad young woman trying to decide on an item. Perhaps unfairly the word "Bimbo" comes to mind...</p>');
			break;
		case 199:
			md.write("<p>You notice some people are doing their laundry.</p>");
			break;
		case 239:
			if (id == 1) md.write('<p>You see a number of people studying the exhibits.</p>');
			else if (id == 2) md.write('<p>You see an older couple taking a rest.</p>');
			break;
		case 282:
			if (id == 1) md.write('<p>You see a young woman serving drinks, but she is rather exotically dressed, maybe she likes cosplay?</p>');
			else if (id == 2) md.write('<p>You see two young women dressed quite oddly, maybe they are cosplayers. As you look they glance back at you seductively, and leave. A few minutes later they take to the stage, so they were exotic dancers!</p>');
			else if (id == 3) md.write('<p>A blonde dancer is on the stage, looking happy and fit!</p>');
			else if (id == 4) md.write('<p>An attractive woman is doing a pole dance, you hear one of the other customers comment that she is from Australia.</p>');
			break;
		case 318:
			if (id == 1) md.write('<p>You see a young lady near the stained glass windows, illuminated by them. She looks at you briefly but returns to her prayers.</p>');
			else if (id == 5) {
				var nun = Math.floor(Math.random() * oChurch.cult.length) + 1;
				var cult = getPersonOther("Daria");
				if (nun <= cult) md.write('<p>You see one of the nuns your have inducted into Mother Superior\'s cult. She also sees you and adjusts her habit as a token offering.</p>');
				else md.write('<p>You see on of the nuns moving around doing some work in the church.</p>');
			} else md.write('<p>You see some people praying in the church.</p>');
			break;
		case 361:
		case 369:
		case 370:
			if (id == 8) md.write('<p>You see the busty woman you met before, still wandering around and clearly enjoying the glances of people at her figure.</p>');
			else md.write('<p>A couple is near one of the tanks, the aquarium is one of the towns major date spots.</p>');
			break;
		case 435:
			md.write("<p>The gym can be quite busy at times, you see a number of people working-out.</p>");
			break;
		}
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (sType !== "" || Math.floor(this.place) != Place) return '';
		
		var id = Math.round((this.place - Math.floor(this.place)) * 100);
		if (id > 70) id = '-public' + (id - 70);
		else if (id > 40) id = '-nudist' + (id - 40);

		if (Place == 282) return this.showPersonAnon("stripclub" + id + ".jpg", '', '', '', '', false, "string");
		else if (Place == 318 && id == 5) {
			var nun = Math.floor(Math.random() * oChurch.cult.length) + 1;
			var cult = getPersonOther("Daria");
			this.health = nun;
			this.shown = true;
			return addImageString("Church/Nun" + nun + "/" + (nun <= cult ? "after.jpg" : "start.jpg"));
		}
		return '';
	};

	per.isPlaceImageRight = function()
	{
		return Math.floor(this.place) == Place && sType === "";		//  && !this.shown;
	};

	per.showPlaceImageRight = function(md)
	{
		var idn = Math.round((this.place - Math.floor(this.place)) * 100);
		var id = idn;
		if (id > 70) id = '-public' + (id - 70);
		else if (id > 40) id = '-nudist' + (id - 40);
		
		switch (Place) {			
		case 26:
			this.showPersonAnon("wildranges" + id + ".jpg");
			break;
		case 63:
			this.showPersonAnon("park" + id + ".jpg");
			break;
		case 70:
			this.setFlag(3);
			this.showPersonAnon("school1.jpg");
			break;
		case 125:
			this.showPersonAnon("tennis" + id + ".jpg");
			break;			
		case 144:
			this.showPersonAnon("sportsfields" + id + ".jpg");
			break;
		case 199:
			this.showPersonAnon("laundromat" + id + ".jpg");
			break;			
		case 269:
			this.showPersonAnon("pool" + id + ".jpg");
			break;			
		case 194:
		case 238:
		case 360:
		case 94:
		case 455:
		case 2:
			this.showPersonAnon("street" + id + ".jpg");
			break;
		case 195:
			if (idn == 9) this.showPersonAnon("generalstore-exh1.jpg");
			else this.showPersonAnon("generalstore" + id + ".jpg");
			break;
		case 239:
			if (idn == 1) {
				this.showPersonAnon("museum2.jpg");
				this.setFlag(1);
			} else if (idn == 2) this.showPersonAnon("museum1.jpg");
			else this.showPersonAnon("museum" + id + ".jpg");
			break;
		case 318:
			this.showPersonAnon("church" + id + ".jpg");
			this.setFlag(2);
			break;
		case 361:
		case 369:
		case 370:
			if (idn == 9) {
				this.showPersonAnon("aquarium-busty2.gif");
				this.setFlag(5);
			} else this.showPersonAnon("aquarium" + id + ".jpg");
			break;
		case 435:
			this.showPersonAnon("gym" + id + ".jpg");
			break;			
		}
	};

	per.showEventPopup = function()
	{	
		if (sType !== "") return false;

		// Initial meeting with the busty woman
		if (((Place == 369 && this.place == 369.09) || (Place == 370 && this.place == 370.09)) && !this.checkFlag(38)) {
			this.setFlag(38);
			this.setFlag(5);
			showPopupWindow("A Well-endowed Woman",
				this.addPersonString("aquarium-busty1.gif", "40%", "right") +
				"<img src='Images/aquarium-busty1.gif' class='imgpopup' alt='Woman'>" +
				"You see a happy looking woman walking near one of the displays, your eyes are drawn to her bust, it is barely contained in her dress.</p>" +
				"<p>As she notices your glance she happily gives a little dance and then walks away clearly wanting to look at her and proud of her figure!"
			);
			return true;
		}		
		// Initial meeting with the exhibitionist
		if (Place == 195 && this.place == 195.09 && !this.checkFlag(35)) {
			this.setFlag(35);
			showPopupWindow("A Vaguely Familiar Woman",
				this.addPersonString("generalstore-exh2.jpg", "height:max%", "right") +
				"A young woman approaches you and she is very familiar to you. For a moment you thought she was Leanne, she sort of looked like her for a moment.</p>" +
				"<p>You start to ask her what she wants and she suddenly exposes her breasts to you! You are quite sure you did not say 'show us your tits' and she quickly covers up and walks away with saying a word."
			);
			return true;
		}
		
		if (!this.checkFlag(41) && isSpellKnown("Possession")) {
			this.setFlag(41);
			showPopupWindow("Possession Spell",
				'<div style="position:absolute;bottom:0;right:0;width:100%;z-index:-1">' +
				addImageString(addBGSuffix("possession.jpg"), "100%", "rightpopup") +
				"</div><div style='height:98%;height:calc(100% - 1.5em);width:60%;cursor:pointer;margin-bottom:-4px;font-size:1.1em;margin-top:1.5em'>" +
				"<p>The spell of possession is a form of Astral Projection but where you can project yourself to another person that you have a <b>magical link</b> to and take control of their body. Normally they will not be conscious of this, but some strong willed people might be aware in some way.. " +
				'A common magical link is a <b>personal possession</b> they have owned for a substantial time, but a <b>lock of hair</b> is even better.</p>' +
				'<p>The spell can <b>bypass</b> some forms of magical defence and things like strong will do not matter at all. As such the spell can be useful to have people remove or move their items.</p>' +
				'<p>The possession will be limited to the building they are currently in, crossing boundaries in or out of a property will disrupt the spell or you maybe unable to cross! Also dawn will end the possession spell like many magical spells.</p>' +
				'<p>Take care, you have heard legends of people having the silver cord that ties them to their body severed, either killing them or making them a souless thing...'
			);
			return true;
		}
		return false;
	};

	per.setEventIdRorX = function(type, bNudist, bPublic, bExplicit)
	{
		var oBase = bExplicit === true ? oImages.People.Glenvale.Explicit : oImages.People.Glenvale;
		var cnt = 0;
		if (bNudist === true) {
			cnt = getImageOCnt(oBase, type + "nude");
			if (cnt != 0) this.place = Place + (Math.floor(Math.random() * cnt + 41) / 100);
		}
		if (bPublic === true && cnt === 0) {
			cnt = getImageOCnt(oBase, type + "public");
			if (cnt != 0) this.place = Place + (Math.floor(Math.random() * cnt + 71) / 100);
		}		
		if (cnt === 0) {
			cnt = getImageOCnt(oBase, type);
			if (cnt !== 0) this.place = Place + (Math.floor(Math.random() * cnt + 1) / 100);
		}
	};
	
	per.setEventId = function(type, chance, bNudist, bPublic)
	{
		if (chance !== undefined && chance > 0) {
			if (Math.random() >= chance) return false;
		}
		if (isExplicit()) {
			this.setEventIdRorX(type, bNudist, bPublic, true);
			if (this.place != 0) return;
		}
		this.setEventIdRorX(type, bNudist, bPublic, false);
	};
	
	per.showEvent = function()
	{
		var md, perMadison;
		
		if (Place == 81) {
		
			if (sType == "passwordpuzzle") {
				md = WritePlaceHeader(true);

				if (!perDavy.checkAnyFlags()) perDavy.setFlag(Math.floor(Math.random() * 3) + 33);

				addPlaceTitle(md, "Davy\'s Computer", '', 0, true);

				if (!isSpellKnown("Teleport")) {
					// if we don't already have the spell
					findPerson("Monique");
					per.setFlag(4);  // Set it to "have read the puzzle, need help.
				}

				md.write(
					'<p>You turn the computer on and access requires you to logon to the account. You try to guess a password but it is wrong, and a hint is shown for the correct one. If you can crack the meaning of the hint you will have access to Davy\'s files.</p>' +
					'<table class="table-main">' +
					'<tr><td class="td-left">' +
						'<img src="Images/time1.jpg" style="float:left;border-width:1px;width:95%" alt="Time">' +
					'</td>' +
					'<td class="td-center">' +
						'<p>Solve the problem:</p>' +
						'<div style="text-align:left">' +
						'<table class="table-main">' +
							'<tr><td style="text-align:center;background-image:url(' + getThemeFolder() + 'background.jpg)">'
				);
				if (perDavy.checkFlag(33)) md.write('<p style="text-align:center">What is at the beginning of eternity, the	end of time, the beginning of every end, and the end of every place?</p>');
				else if (perDavy.checkFlag(34)) md.write('<p style="text-align:center">Complete this line "I\'d do anything for love ..."</p>');
				else if (perDavy.checkFlag(35)) md.write('<p style="text-align:center">Complete this title "Enter ..."</p>');
				md.write('</td>' +
							'</tr>' +
							'<tr><td>' +
									'<form name="FormChar" onsubmit="PuzzleComputer(document);return false">' +
										'<input type="text" size="20" name="research">' +
										'<input type="submit" value="enter">' +
									'</form>' +
								'</td>' +
							'</tr>' +
						'</table>' +
						'</div><br>'
				);

				startQuestions();
				addLinkToPlace(md, "forget the password", 81);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType === "passwordright") {

				md = WritePlaceHeader(false);
				addPlaceTitle(md, "Right Answer", '', 0, true);
				if (!perDavy.checkFlag(12)) addWallpapers(11, oImages.fixed.phonewallpapers);

				findPerson("Monique");
				per.setFlag(4, false);  // Gave the right answer, don't need help anymore

				md.write(
					'<p>You enter the correct password into the laptop and after a browsing for a while you find a couple of interesting images that you upload into your phone as wallpapers.</p>' +
					'<p>You then find a document that is called <b>"Spell to be deciphered"</b>. You examine the document and start working to decipher the spell.</p>'
				);
				if (!isRunes()) {
					md.write(
						'<div style="text-align:center">' +
							'<p style="margin-bottom:0">Unscramble the letters: hot rum is sin</p>' +
							'<table class="table-main">' +
								'<tr>' +
									'<td>' +
										'<form method="POST" name="FormChar">' +
											'<input type="text" size="20" name="research">' +
											'<input type="button" name="button" value="enter" onClick="FindIt105(document)">' +
										'</form>' +
									'</td>' +
								'</tr>' +
							'</table>' +
						'</div><br>');
				}

				startQuestions();

				if (isRunes()) addOptionLink(md, 'try to learn the spell', "FindIt105(document)");

				addLinkToPlace(md, 'forget the spell for now', 81);
				AddRightColumnLarge();
				AddImage('time1.jpg');				
				WritePlaceFooter(md);				
				return true;

			}
			
			if (sType == "passwordwrong") {
				md = WritePlaceHeader(false);
				addPlaceTitle(md, "Wrong Answer", '', 0, true);

				md.write('<p>You didn\'t get it right. Better luck next time.</p>');

				startQuestions();
				addLinkToPlace(md, "leave Davy\'s room", 176);
				AddRightColumnLarge();
				AddImage('time1.jpg');
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 45) {
			if (sType == "radiopuzzle") {
				md = WritePlaceHeader();
				perMadison = findPerson("Madison");

				if (!perMadison.checkAnyFlags(33, 35)) perMadison.setFlag(Math.floor(Math.random() * 3) + 33);

				if (perYou.getQuestRustyKey() < 3) perYou.setQuestRustyKey(3); 	//  Set the Variable to "Trying the puzzle"
				if (!isPlaceKnown("TVStation")) setPlaceKnown("TVStation");	//Know about the radio station after trying the puzzle

				addPlaceTitle(md, "Phone Call", getThemeFolder() + 'antenna.png');

				md.write(
					'<p>You listen to the phone message.</p>' +
					'<p>"Hi," says a clear male voice. "This is local radio station MC 550. You are our lucky random call. Can you guess the answer to this puzzle for a prize stereo?"</p>'
				);

				if (!isPuzzles()) {
					md.write('<p>The person asks you to answer a word game, and you are fairly sure you know the answer.</p>');
					startQuestions();
					addLinkToPlace(md, "answer confidently", 45, "type=radiocorrect");
					addLinkToPlace(md, "ummmm...on second thoughts I do not know", 45, "type=radiowrong");
					WritePlaceFooter(md);
					return true;
				}

				if (perMadison.checkFlag(33)) {
					md.write(
						'<p>What comes next in this sequence:</p>' +
						'<form method="POST" name="Puzzle">' +
							'<div style="text-align:center"><table style="background-image:url(' + getThemeFolder() + 'background.jpg);padding:0px;border-collapse:collapse;border-spacing:0">' +
							'<tr>' +
								'<td>Dog, Cat, Mouse, Mole, Deer, Pig,&nbsp;</td>' +
								'<td> ' +
									'<select name="answera" size="1">' +
										'<option selected value="1">Cow</option>' +
										'<option value="2">Llama</option>' +
										'<option value="3">Rabbit</option>' +
										'<option value="4">Frog</option>' +
									'</select>'
					);
				} else if (perMadison.checkFlag(34)) {
					md.write(
						'<p>What mathematical symbol can be put between 5 and 9, to get a number bigger than 5 and smaller than 9?</p>' +
						'<form method="POST" name="Puzzle">' +
							'<div style="text-align:center"><table style="background-image:url(' + getThemeFolder() + 'background.jpg);padding:0px;border-collapse:collapse;border-spacing:0">' +
							'<tr>' +
								'<td>+-*/.|&amp;,&nbsp;</td>' +
								'<td> ' +
									'<select name="answera" size="1">' +
										'<option selected value="1">+</option>' +
										'<option value="2">-</option>' +
										'<option value="3">/</option>' +
										'<option value="4">*</option>' +
										'<option value="5">.</option>' +
										'<option value="6">|</option>' +
										'<option value="7">&amp;</option>' +
									'</select>'
					);
				} else {
					md.write(
						'<p>Two men decided to take a fishing trip. Both had one son and brought him along. Everyone on the trip caught and kept at least one fish. What\'s the fewest number of fish that could have been kept?</p>' +
						'<form method="POST" name="Puzzle">' +
							'<div style="text-align:center"><table style="background-image:url(' + getThemeFolder() + 'background.jpg);padding:0px;border-collapse:collapse;border-spacing:0">' +
							'<tr>' +
								'<td>How many?&nbsp;</td>' +
								'<td> ' +
									'<select name="answera" size="1">' +
										'<option selected value="1">1</option>' +
										'<option value="2">2</option>' +
										'<option value="3">3</option>' +
										'<option value="4">4</option>' +
									'</select>'
					);
				}

				md.write(	'</td>' +
							'<td> ' +
								'<input type="button" name="button" value="Answer" onClick="PuzzleRadio(document)">' +
							'</td>' +
						'</tr>' +
						'</table>' +
						'</div>' +
					'</form><br>'
				);

				startQuestions();
				addLinkToPlace(md, "give up", 45);
				WritePlaceFooter(md);
				return true;
			}

			if (sType == "radiocorrect") {
				md = WritePlaceHeader();
				perMadison = findPerson("Madison");					
				if (perYou.getQuestRustyKey() < 5) perYou.setQuestRustyKey(5);
				perYou.setFlag(1);
				addPlaceTitle(md, "Correct Answer!", getThemeFolder() + "antenna.png");

				if (!isPuzzles()) md.write('<p>"You got it!"</p>');
				else {
					if (perMadison.checkFlag(33)) md.write('<p>"You got it! Llama! The length of each word is the same length of the numbers one, two, three, four, five, six, etc."</p>');
					else if (perMadison.checkFlag(34)) md.write('<p>"You got it! It\'s a trick, you put a Decimal Point, 5.9 works nicely"</p>');
					else md.write('<p>"You got it! There were only three people. The son, his father, and his grandfather."</p>');
				}

				md.write('<p>"Congratulations, your prize will be delivered very soon by \'G.R USX Deliveries\' a subsidary of MC 550 Radio!"</p>');
				startQuestions();
				addLinkToPlace(md, "Hang up the phone", 45);
				WritePlaceFooter(md);
				return true;
			}

			if (sType == "radiowrong") {
				md = WritePlaceHeader();
				perMadison = findPerson("Madison");					
				if (perYou.getQuestRustyKey() < 900) perYou.setQuestRustyKey(900);
				addPlaceTitle(md, "Wrong Answer!", getThemeFolder() + "antenna.png");

				md.write(
					'<p>"Bad luck. Now for our next caller..."</p><p>The person hangs up, you have lost your chance for a new stereo.</p>'
				);

				startQuestions();
				addLinkToPlace(md, "Hang up the phone", 45);
				WritePlaceFooter(md);
				return true;
			}				
		}		

		if (sType == "learnwealth") {
			// Learn Wealth
			if (isRunes()) {
				Research("Spell", "DertPher", "", 161);
				return true;
			}
			md = WritePlaceHeader();
			addPlaceTitle(md, "Cupboard Spell", "cellar1.jpg");
			md.write(
				'<form method="POST" name="FormChar">' +
				'<p>What is the meaning of wealth? Enter the correct words to find the spell:</p>' +
				'<p><input type="text" size="20" name="research">'
			);
			md.write('<input type="button" name="button" value="please" onClick="ResearchOLD(\'W\', document.FormChar.research.value)"></p></form>');
			startQuestions("or give up for now");
			addLinkToPlace(md, 'Never mind...', 161);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "tabletpuzzle") {
			// Tablet puzzle to access the crypt
			md = WritePlaceHeader();
			var perMonique = findPerson("Monique");
			perMonique.setFlag(5);

			addPlaceTitle(md, "Tablet Puzzle", "Items/tablet.jpg");

			if (!checkPlaceFlag("Crypt", 3) && !checkPlaceFlag("Crypt", 4) && !checkPlaceFlag("Crypt", 5)) setPlaceFlag("Crypt", Math.floor(Math.random() * 3) + 3);
			
			md.write('<p>Embossed are the words, ');
			if (checkPlaceFlag("Crypt", 3)) md.write('&quot;One is vain by nature, <b>teomds</b> by necessity.&quot;');
			else if (checkPlaceFlag("Crypt", 4)) md.write('&quot;A maker of tablets, often said to be free <b>amnos</b>.&quot;');
			else md.write('&quot;A guard against the dead and often the living, <b>aiglcr</b>.&quot;');

			md.write(
				'</p><form method="POST" name="FormChar"><p>Unscramble the letters:</p>' +
				'<p><input type="text" size="20" name="research"><input type="button" name="button" value="please" onClick="FindItTablet(document)"></p></form>'
			);

			startQuestions();
			addLinkToPlace(md, 'go to the Wild Ranges?', 26);

			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "cultoffering") {
			// Offering from a nun in the church
			md = WritePlaceHeader();
			this.place = 0;		// Prevent the event happening again
			AddImage("Church/Nun" + this.health + "/charm2.jpg");

			addPlaceTitle(md, "An Offering");

			md.write(
				'<p>You call the nun over and she leads you to a small store area out of sight of the public, and she makes you an offering, her body!</p>' +
				'<p>After she leaves the church to other duties elsewhere in the abbey.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'return to the main area of the church', Place);

			WritePlaceFooter(md);
			return true;
		}

		if (sType !== "") return false;

		// Select a new event?
		if (Place == Math.floor(this.place)) return false;
		if (this.place !== 0 && !isOutside(Math.floor(this.place)) && !gameState.nLastOut) return false;	// no change of event when inside
		
		this.place = 0;		// New location, allow new encounter
		
		var nDaysNude = Math.floor((nTime - this.other) / 24);
		if (nDaysNude > 8) nDaysNude = 8;
		else if (nDaysNude < 2) nDaysNude = 2;
		var bNudist = this.checkFlag(37) ? (Math.random() * 10) < nDaysNude : false;
		var nDaysPublic = Math.floor((nTime - this.extra[0]) / 24);
		if (nDaysPublic > 8) nDaysPublic = 8;
		else if (nDaysPublic < 1) nDaysPublic = 1;
		var bPublic = this.checkFlag(40) ? (Math.random() * 10) < nDaysPublic : false;

		// Is there an encounter here?
		// Open museum
		if (Place == 239 && isShopOpen(2, 0, true) && !checkPlaceFlag("Museum", 8) && Math.random() < 0.2) {
			// Museum main hall and it is open
			this.setEventId("museum", 0.1, bNudist, bPublic);
		}
		// Church
		else if (Place == 318 && Math.random() < 0.2 && !this.checkFlag(2)) {
			// Church cathedral/main area
			if (!this.checkFlag(33)) this.place = 318.01;
			else this.setEventId("church", 1, bNudist, bPublic);
			return false;  // override default small size
		}
		// General Store
		else if (Place == 195 && checkPersonFlag("Leanne", 25) && Math.random() < 0.2) {
			if (!this.checkFlag(35)) this.place = 195.09;
			else if (this.checkFlag(1)) this.place = 195.01;
			else this.setEventId("generalstore", 0.1, bNudist, bPublic);
		}
		// School
		else if (Place == 70 && isShopOpen(2) && Math.random() < 0.05 && !this.checkFlag(3)) this.place = 70;	// Student Teacher
		// Streets
		else if (isDay() && (Place == 194 || Place == 238 || Place == 360 || Place == 94 || Place == 455 || Place == 2)) this.setEventId("streets", 0.15, bNudist, bPublic);
		// Wild Ranges
		else if (Place == 26 && isDay()) this.setEventId("wildranges", 0.1, bNudist, bPublic);
		// Aquarium
		else if (isShopOpen(2, 0, true) && (Place == 361 || Place == 369 || Place == 370) && Math.random() < 0.2) {
			if (!this.checkFlag(38) && (Place == 369 || Place == 370)) this.place = Place + 0.09;
			else if (this.checkFlag(38) && !this.checkFlag(5) && (Place == 369 || Place == 370) && Math.random() < 0.3) this.place = Place + 0.08;
			else this.place = Place + (Math.floor(Math.random() * 3 + 1) / 100);
		}
		// Sports field
		else if (Place == 144 && wherePerson("Kylie") != 144 && isShopOpen(2)) this.setEventId("sportsfield", 0.2, bNudist, bPublic);
		// Park Pathway
		else if (Place == 63 && isDay()) this.setEventId("park", 0.1, bNudist, bPublic);
		// Hotel Pool
		else if (Place == 269 && isDay()) this.setEventId("pool", 0.1, bNudist, bPublic);
		// Tennis Court
		else if (Place == 125 && isDay()) this.setEventId("tennis", 0.1, bNudist, false);		
		// Laundromat
		else if (Place == 199) this.setEventId("laundromat", 0.1, false, false);
		// Gym
		else if (Place == 435 && Math.random() < 0.1) {
			if (isPersonHere("Alison") || isPersonHere("OfficerKhan")) return false;
			this.setEventId("gym", 0.1, bNudist, bPublic);
		// Avernus club
		} else if (Place == 282 && isShopOpen(-2, -2, true, true)) this.setEventId("stripclub", 0.1, false, false);
		// Library
		else if (Place == 7 && isShopOpen(2, 1, true)) this.setEventId("library", 0.1, bNudist, bPublic);
		// Shops
		else if (Place == 194 && isDay()) this.setEventId("shops", 0.1, bNudist, bPublic);
		
		// Set the image size for the event
		if (this.place !== 0) SetRightColumnSize("");

		return false;
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (sType !== "" || Math.floor(this.place) != Place) return;
		
		var id = Math.round((this.place - Math.floor(this.place)) * 100);
		var bPublic = id > 70;
		var bNude = id > 40 && id < 71;

		switch (Place) {		
		case 318:
			if (id == 5) {
				var cult = getPersonOther("Daria");
				if (this.health <= cult) addLinkToPlaceC(md, 'ask the nun over to make a full offering', Place, 'type=cultoffering');
			}
			break;
		}
	};

}

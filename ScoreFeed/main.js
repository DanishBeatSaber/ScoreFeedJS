// Setup our environment variables via dotenv
require('dotenv').config()
// Import relevant modules
const WebSocket = require('ws');
const fetch = require('node-fetch');
const XMLHttpRequest = require('xhr2');

/**
 * sendMessage()
 * @param {*} id 
 * @param {*} name 
 * @param {*} pfp 
 * @param {*} country 
 * @param {*} ur 
 * @param {*} cr 
 * @param {*} rank 
 * @param {*} pp 
 * @param {*} weight 
 * @param {*} badCuts 
 * @param {*} missedNotes 
 * @param {*} fullCombo 
 * @param {*} hmd 
 * @param {*} leaderboardId 
 * @param {*} mapId 
 * @param {*} songHash 
 * @param {*} songName 
 * @param {*} songSubName 
 * @param {*} songAuthorName 
 * @param {*} levelAuthorName 
 * @param {*} songDiff 
 * @param {*} stars 
 * @param {*} maxScore 
 * @param {*} coverImage 
 * @param {*} acc 
 * @param {*} ranked 
 * @param {*} replayurl 
 */

function sendMessage(id, name, pfp, country, ur, cr, rank, pp, weight, badCuts, missedNotes, fullCombo, hmd, leaderboardId, mapId, songHash, songName, songSubName, songAuthorName, levelAuthorName, songDiff, stars, maxScore, coverImage, acc, ranked, replayurl) {
	var id = id; //id
	var name = name.replace(/[\u0250-\ue007]/g, ''); //name
	var pfp = pfp; //pfp
	var country = country; //country
	var rank = rank; //rank
	var pp = pp; //pp
	var weight = weight; //weight
	var badCuts = badCuts; //badCuts
	var missedNotes = missedNotes; //missedNotes
	var fullCombo = fullCombo; //fullCombo
	var hmd = hmd; //hmd
	var leaderboardId = leaderboardId; //leaderboardId
	var songHash = songHash; //songHash
	var songName = songName; //songName
	var songSubName = songSubName; //songSubName
	var songAuthorName = songAuthorName; //songAuthorName
	var levelAuthorName = levelAuthorName; //levelAuthorName
	var difficulty = songDiff; //difficulty
	var stars = stars; //stars
	var maxScore = maxScore; //maxScore
	var coverImage = coverImage; //coverImage
	var acc = acc; //acc
	var mapId = mapId;
	var isRanked = ranked;
	var replayurl = replayurl;
	var replayDisabled = "";

	if (rank < 500 && isRanked == 1) {
		replayDisabled = false;
	} else {
		replayDisabled = true;
	}

	if (rank == 1) { //If rank 1
		var color = "#FFC700";
	} else if (rank == 2) { //If rank 2
		var color = "#AAAAAA";
	} else if (rank == 3) { //If rank 3
		var color = "#954500";
	} else if (rank >= 4 && rank <= 10) { //If between rank 4-10
		var color = "#E91E63";
	} else if (rank >= 11 && rank <= 25) { //If between rank 11-25
		var color = "#CA00FF";
	} else if (rank >= 26 && rank <= 50) { //If above rank 26
		var color = "#04D3F8";
	} else if (rank >= 51 && rank <= 100) { //If above rank 26
		var color = "#2ECC71";
	} else if (rank >= 101) {
		var color = "#9CFFF4";
	}

	const request = new XMLHttpRequest(); // Create a request
	request.open("POST", process.env.DISCORD_WEBHOOK); //Set Webhook
	request.setRequestHeader('Content-type', 'application/json'); //Set Header

	var myEmbed = { //Create Embed
		author: { //Author
			name: name, //Name
			url: "https://scoresaber.com/u/" + id, //URL
		},
		thumbnail: { //Thumbnail
			url: pfp, //URL
		},
		//title: "Laur - Attractor Dimension | Laur Fanclub",
		title: songAuthorName + " - " + songName + " | " + levelAuthorName, //Title
		type: "rich", //Type
		description: "Map rank: **#" + rank + "**", //Description
		url: "https://scoresaber.com/leaderboard/" + leaderboardId, //URL
		color: hexToDecimal(color), //Color
		footer: { //Footer
			text: name + " - " + hmd + " - Global: " + ur + " - Local: " + cr, //Footer Text
			icon_url: pfp, //Footer Icon
		},
		timestamp: new Date(), //Timestamp
		fields: [
			{
				name: "Difficulty:", //Field Name
				value: "```" + difficulty + " " + stars.toFixed(2) + "★ ```", //Field Value
				inline: true, //Inline
			},
			{
				name: 'PP: (Weighted PP)', //Field Name
				value: "```" + pp.toFixed(2) + "pp [" + (pp * weight).toFixed(2) + "pp]```", //Field Value
				inline: true, //Inline
			},
			{
				name: 'ACC *(Bad cut/Miss)*:', //Field Name
				value: "```" + acc.toFixed(2) + "% (" + badCuts + "/" + missedNotes + ") " + fullCombo + "```", //Field Value
				inline: true, //Inline
			}
		]
	}
	var myComponents = {
		type: 1,
		components: [
			{
				style: 5,
				label: 'Player',
				url: 'https://scoresaber.com/u/' + id,
				disabled: false,
				emoji: {
					id: null,
					name: '👱'
				},
				type: 2
			},
			{
				style: 5,
				label: 'Leaderboard',
				url: 'https://scoresaber.com/leaderboard/' + leaderboardId,
				disabled: false,
				emoji: {
					id: null,
					name: '📈'
				},
				type: 2
			},
			{
				style: 5,
				label: 'Beat Saver',
				url: 'https://beatsaver.com/maps/' + mapId,
				disabled: false,
				emoji: {
					id: null,
					name: '🗺'
				},
				type: 2
			},
			{
				style: 5,
				label: 'Replay',
				url: replayurl,
				disabled: replayDisabled,
				emoji: {
					id: null,
					name: '⏪'
				},
				type: 2
			}
		]
	}
	var params = { //Create Params
		tts: false, //TTS
		username: process.env.DISCORD_USERNAME, //Username
		avatar_url: process.env.DISCORD_PROFILEPICTURE, //Avatar URL
		embeds: [myEmbed], //Add embeds to message
		components: [myComponents] //Add components to message
	}

	request.send(JSON.stringify(params)); //Send Params

	// function that converts a color HEX to a valid Discord color
	function hexToDecimal(hex) { //Convert Hex to Decimal
		return parseInt(hex.replace("#", ""), 16) //Convert Hex to Decimal
	}
}

/**
 * The connect-function, that starts the WebSocket connection
 */
function connect() {
	var SSSock = new WebSocket("wss://scoresaber.com/ws"); // Open WebSocket to ScoreSaber
	SSSock.onopen = function (event) { //When socket is open, do this
		console.log("We're in!"); // log that the connection was made
	};

	SSSock.onmessage = async function (event) { // event.data is the message
		if (event.data !== "Connected to the ScoreSaber WSS") {
			jsonObj = JSON.parse(event.data); // parse the message as JSON

			if (jsonObj.commandName === "score") /*Check for command*/ {
				if (jsonObj.commandData.score.modifiers == "") /*Check if user is using modifier */ {
					var id = jsonObj.commandData.score.leaderboardPlayerInfo.id; //User ID
					var name = jsonObj.commandData.score.leaderboardPlayerInfo.name; //Username
					var pfp = jsonObj.commandData.score.leaderboardPlayerInfo.profilePicture; //Profilepicture
					var country = jsonObj.commandData.score.leaderboardPlayerInfo.country; //Country
					var rank = jsonObj.commandData.score.rank; //Rank
					var ranked = jsonObj.commandData.leaderboard.ranked; //Ranked?
					var baseScore = jsonObj.commandData.score.baseScore; //Base score
					var modifiedScore = jsonObj.commandData.score.modifiedScore; //Modified score
					var pp = jsonObj.commandData.score.pp; //PP
					var weight = jsonObj.commandData.score.weight; //Weight
					var multiplier = jsonObj.commandData.score.multiplier; //Multiplier
					var badCuts = jsonObj.commandData.score.badCuts; //Bad cuts
					var missedNotes = jsonObj.commandData.score.missedNotes; //Missed notes
					var fullCombo = jsonObj.commandData.score.fullCombo; //Full combo
					var hmd = jsonObj.commandData.score.deviceHmd; //HMD
					var lController = jsonObj.commandData.score.deviceControllerLeft; //Left controller
					var rController = jsonObj.commandData.score.deviceControllerRight; //Left controller
					var leaderboardId = jsonObj.commandData.leaderboard.id; //Leaderboard ID
					var songHash = jsonObj.commandData.leaderboard.songHash; //Song hash
					var songName = jsonObj.commandData.leaderboard.songName; //Song name
					var songSubName = jsonObj.commandData.leaderboard.songSubName; //Song sub name
					var songAuthorName = jsonObj.commandData.leaderboard.songAuthorName; //Song author name
					var levelAuthorName = jsonObj.commandData.leaderboard.levelAuthorName; //Level author name
					var songDiff = jsonObj.commandData.leaderboard.difficulty.difficulty; //Difficulty
					var stars = jsonObj.commandData.leaderboard.stars; //Stars
					var maxScore = jsonObj.commandData.leaderboard.maxScore; //Max score
					var coverImage = jsonObj.commandData.leaderboard.coverImage; //Cover image
					var acc = ((baseScore / maxScore) * 100); //Calculates the acc
					var replayurl = replayurl;

					if (hmd === null || hmd === undefined) {
						hmd = "Unknown";
					}

					if (lController === null || lController === undefined) {
						lController = "Unknown";
					}

					if (rController === null || rController === undefined) {
						rController = "Unknown";
					}

					switch (fullCombo) {
						case true:
							fullCombo = "FC";
							break;
						case false:
							fullCombo = "";
							break;
					}

					switch (songDiff) {
						case 1:
							songDiff = "Easy";
							break;
						case 3:
							songDiff = "Normal";
							break;
						case 5:
							songDiff = "Hard";
							break;
						case 7:
							songDiff = "Expert";
							break;
						case 9:
							songDiff = "ExpertPlus";
							break;
					}

					async function getRank(id) {
						try {
							const response = await fetch("https://scoresaber.com/api/player/" + id + "/basic", {
								method: 'GET',
								headers: {
									'Content-Type': 'application/json',
									'User-Agent': 'NodeJS/1.0.0 (ScoreFeed)'
								}
							});
							const data = await response.json();
							var rank = data.rank;
							var countryRank = data.countryRank;
							return [rank, countryRank];
						} catch (error) {
							console.log(error);
							return [0, 0];
						}
					}

					async function getBeatSaverId(hash) {
						try {
							const response = await fetch("https://api.beatsaver.com/maps/hash/" + hash);
							const data = await response.json();
							var id = data.id;
							return id;
						} catch (error) {
							console.log(error);
							return 0;
						}
					}

					async function getReplay(id, songHash, songDiff) {
						try {
							const response = await fetch("https://api.beatleader.xyz/score/" + id + "/" + songHash + "/" + songDiff + "/Standard");
							const data = await response.json();
							if (response.status === 404) {
								return "0";
							} else {
								return data.id;
							}
						} catch (error) {
							return "0";
						}
					}

					if (country == process.env.SS_COUNTRY) /*Check if user is from set country */ {

						/*Default ScoreFeed*/
						if (ranked) /*Check if score is on ranked map */ {
							if (rank <= process.env.SS_MAPRANK || weight >= process.env.SS_PPWeight) /*Check if users maprank is lower between 1 and set maprank, or weighted PP is higher than set PP weight */ {
								if (pp >= process.env.PP_MINIMUM) {
									let mapId = await getBeatSaverId(songHash);
									var replayConstructor = await getReplay(id, songHash, songDiff);
									if (replayConstructor === "0") {
										replayUrl = "https://replay.beatleader.xyz/?id=" + mapId + "&difficulty=" + songDiff + "&playerID=" + id;
									} else {
										replayUrl = "https://replay.beatleader.xyz/?scoreId=" + replayConstructor;
									}
									console.log("Timestamp: " + new Date().toLocaleString() + " | Name: " + name + " | ID: " + id + " | Score: " + baseScore + " | ACC: " + acc + " | Song name: \"" + songAuthorName + " - " + songName + "\" | Diff: " + songDiff + " | Map ID: " + mapId);
									if (acc >= process.env.BS_ACC) /*Check if user acc is above set acc-requirement */ {
										getRank(id).then(function (result) {
											ur = result[0];
											cr = result[1];
											console.log("Above score got submitted.");
											sendMessage(id, name, pfp, country, ur, cr, rank, pp, weight, badCuts, missedNotes, fullCombo, hmd, leaderboardId, mapId, songHash, songName, songSubName, songAuthorName, levelAuthorName, songDiff, stars, maxScore, coverImage, acc, 1, replayUrl); //Send message to Discord
										});
									}
								}
							}

							/*69 MISS/BADCUTS ScoreFeed*/
							if (missedNotes == 69 || badCuts == 69) /*Check if the player have missed exactly 69 notes */ {
								let mapId = await getBeatSaverId(songHash);
								console.log("Timestamp: " + new Date().toLocaleString() + " | Name: " + name + " | ID: " + id + " | Score: " + baseScore + " | ACC: " + acc + " | Song name: \"" + songAuthorName + " - " + songName + "\" | Diff: " + songDiff + " | Map ID: " + mapId);
								if (acc >= process.env.BS_ACC) /*Check if user acc is above set acc-requirement */ {
									getRank(id).then(function (result) {
										ur = result[0];
										cr = result[1];
										console.log("Above score got submitted.");
										sendMessage(id, name, pfp, country, ur, cr, rank, pp, weight, badCuts, missedNotes, fullCombo, hmd, leaderboardId, mapId, songHash, songName, songSubName, songAuthorName, levelAuthorName, songDiff, stars, maxScore, coverImage, acc, 0, ""); //Send message to Discord
									});
								}
							}
						}

						if (songHash == "CB9F1581FF6C09130C991DB8823C5953C660688F" && !ranked) /* Check if user passed FF9 */ {
							let mapId = await getBeatSaverId(songHash);
							console.log("Timestamp: " + new Date().toLocaleString() + " | Name: " + name + " | ID: " + id + " | Score: " + baseScore + " | ACC: " + acc + " | Song name: \"" + songAuthorName + " - " + songName + "\" | Diff: " + songDiff + " | Map ID: " + mapId);
							getRank(id).then(function (result) {
								ur = result[0];
								cr = result[1];
								console.log("Above score got submitted.");
								sendMessage(id, name, pfp, country, ur, cr, rank, pp, weight, badCuts, missedNotes, fullCombo, hmd, leaderboardId, mapId, songHash, songName, songSubName, songAuthorName, levelAuthorName, songDiff, stars, maxScore, coverImage, acc, 0, ""); //Send message to Discord
							});
						}

					}

					if (ranked) /*Check if score is on ranked map */ {
						if (country !== process.env.SS_COUNTRY) /*Check if not Danish potato */ {
							if (acc == 69)  /*Check if very nice acc */ {
								let mapId = await getBeatSaverId(songHash);
								console.log("Timestamp: " + new Date().toLocaleString() + " | Name: " + name + " | ID: " + id + " | Score: " + baseScore + " | ACC: " + acc + " | Song name: \"" + songAuthorName + " - " + songName + "\" | Diff: " + songDiff + " | Map ID: " + mapId);
								getRank(id).then(function (result) {
									ur = result[0];
									cr = result[1];
									console.log("Above score got submitted.");
									
									sendMessage(id, name, pfp, country, ur, cr, rank, pp, weight, badCuts, missedNotes, fullCombo, hmd, leaderboardId, mapId, songHash, songName, songSubName, songAuthorName, levelAuthorName, songDiff, stars, maxScore, coverImage, acc, 0, ""); //Send message to Discord
								});
							}
						}
					}
				}
			}
		}
	};

	SSSock.onclose = function (e) {
		console.log('Socket is closed. Reconnect will be attempted in 10 seconds.', e.reason);
		setTimeout(function () {
			connect();
		}, 10000);
	};

	SSSock.onerror = function (err) {
		console.error('Socket encountered error: ', err.message, 'Closing socket');
		SSSock.close();
	};
}

/**
 * Triggers the connect function.
 */
connect();

/*
*
* REMEMBER TO MAKE YOUR OWN CONDITIONS FOR WHAT MAPS SHOULD GO THROUGH!
* This file is taken from the 'Fun After Dark' ScoreFeed, and the only
* condition here is that the person is registered to the bot.
*
* You can safely remove the database requirement by removing
* the `if (ids.includes(id)) {}` clause, and implement your own if you want.
*/


// Setup our environment variables via dotenv
require('dotenv').config()
// Import relevant modules
const WebSocket = require('ws');
const fetch = require('node-fetch');
const { Pool } = require("pg");
const XMLHttpRequest = require('xhr2');

 const Information = new Pool({
 	user: "postgres",
 	host: "localhost",
 	database: "db",
 	password: "password",
 	port: 1200,
});

function removeEscapeSequences(input) {
	return input.replace(/[\b\f\n\r\t\v\\]/g, '');
}

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
 * @param (*) gameMode
 * @param (*) ranked
 */

function sendMessage(id, name, pfp, country, ur, cr, rank, pp, weight, badCuts, missedNotes, fullCombo, hmd, leaderboardId, mapId, songHash, songName, songSubName, songAuthorName, levelAuthorName, songDiff, stars, maxScore, coverImage, acc, ranked, replayurl, gameMode, ranked) {
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
	var songName = removeEscapeSequences(songName); //songName
	var songSubName = removeEscapeSequences(songSubName); //songSubName
	var songAuthorName = removeEscapeSequences(songAuthorName); //songAuthorName
	var levelAuthorName = removeEscapeSequences(levelAuthorName); //levelAuthorName
	var difficulty = songDiff; //difficulty
	var stars = stars; //stars
	var maxScore = maxScore; //maxScore
	var coverImage = coverImage; //coverImage
	var acc = acc; //acc
	var mapId = mapId;
	var isRanked = ranked;
	var replayurl = replayurl;
	var replayDisabled = "";
	var gameMode = gameMode;

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

	var myComponents = [
		{
		  type: 17,
		  accent_color: hexToDecimal(color),
		  spoiler: false,
		  components: [
			{
			  type: 9,
			  accessory: {
				type: 11,
				media: {
				  url: pfp,
				},
				description: null,
				spoiler: false,
			  },
			  components: [
				{
				  type: 10,
				  content:
					`[${name}](<https://scoresaber.com/u/${id}>)`,
				},
				{
				  type: 10,
				  content:
					`## [${songAuthorName} - ${songName} | ${levelAuthorName}](<https://scoresaber.com/leaderboard/${leaderboardId}>)`,
				},
				{ type: 10, content: `Map rank: **#${rank}**` },
			  ],
			},
			{ type: 14, divider: true, spacing: 2 },
			{
			  type: 1,
			  components: ranked ? [
				{
				  type: 2,
				  style: 4,
				  label: `${difficulty} ${stars.toFixed(2)}★`,
				  emoji: { name: "DIFF", id: "1366520018044715158" },
				  disabled: true,
				  custom_id: "diff_id",
				},
				{
				  type: 2,
				  style: 1,
				  label: `${pp.toFixed(2)}pp (${(pp * weight).toFixed(2)}pp)`,
				  emoji: { name: "PP", id: "1366520480395431976" },
				  disabled: true,
				  custom_id: "pp_id",
				},
				{
				  type: 2,
				  style: 3,
				  label: `${acc.toFixed(2)}% ${fullCombo === "FC" ? "FC" : `(${badCuts} Badcuts/${missedNotes} Misses)`}`,
				  emoji: { name: "🎯", id: null },
				  disabled: true,
				  custom_id: "acc_id",
				},
			  ] : [
				{
				  type: 2,
				  style: 4,
				  label: `${difficulty}`,
				  emoji: { name: "DIFF", id: "1366520018044715158" },
				  disabled: true,
				  custom_id: "diff_id",
				},
				{
				  type: 2,
				  style: 3,
				  label: `${acc.toFixed(2)}% ${fullCombo === "FC" ? "FC" : `(${badCuts} Badcuts/${missedNotes} Misses)`}`,
				  emoji: { name: "🎯", id: null },
				  disabled: true,
				  custom_id: "acc_id",
				},
			  ]
			},
			{ type: 14, divider: true, spacing: 2 },
			{
			  type: 1,
			  components: [
				{
				  type: 2,
				  style: 5,
				  label: "Player",
				  emoji: { name: "👤", id: null },
				  disabled: false,
				  url: `https://scoresaber.com/u/${id}`,
				},
				{
				  type: 2,
				  style: 5,
				  label: "Leaderboard",
				  emoji: { name: "📈", id: null },
				  disabled: false,
				  url: `https://scoresaber.com/leaderboard/${leaderboardId}`,
				},
				{
				  type: 2,
				  style: 5,
				  label: "Map",
				  emoji: { name: "🗺️", id: null },
				  disabled: false,
				  url: `https://beatsaver.com/maps/${mapId}`,
				},
				{
				  type: 2,
				  style: 5,
				  label: "Replay",
				  emoji: { name: "⏪", id: null },
				  disabled: replayDisabled,
				  url: replayurl,
				},
			  ],
			},
			{ type: 14, divider: true, spacing: 2 },
			{
			  type: 10,
			  content: `-# ${name} (${country}) - ${hmd} - Global: ${ur} - Local: ${cr}`,
			},
		  ],
		},
	  ];
	
	  var params = {
		//Create Params
		tts: false, //TTS
		username: process.env.DISCORD_USERNAME, //Username
		avatar_url: process.env.DISCORD_PROFILEPICTURE, //Avatar URL
		components: myComponents, //Add components v2 to message - Message CANNOT be sent with embeds.
		flags: 32768
	  };

	request.send(JSON.stringify(params));

	function hexToDecimal(hex) {
		return parseInt(hex.replace("#", ""), 16)
	}
}

let ids = [];
async function getUsers(first) {
	try {
		const dbResponse = await Information.query("SELECT platformid FROM users");
		try {
		    for (var i = 0; i < dbResponse.rows.length; i++) {
		    ids.push(dbResponse.rows[i].platformid);
		   }

		if (first) {
			console.log("Current ID List:");
			console.table(ids)
		}
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		console.log(error);
		console.log("Current ID List:");
		console.table(ids)
	}
}

function connect() {
	var SSSock = new WebSocket("wss://scoresaber.com/ws"); // Open WebSocket to ScoreSaber
	SSSock.onopen = function (event) { //When socket is open, do this
		console.log("WE ARE CONNECTED BOIS"); // log that the connection was made
	};

	SSSock.onmessage = async function (event) { // event.data is the message
		if (event.data !== "Connected to the ScoreSaber WSS") {
			jsonObj = JSON.parse(event.data); // parse the message as JSON

			if (jsonObj.commandName === "score") /*Check for command*/ {
				var id = jsonObj.commandData.score.leaderboardPlayerInfo.id; //User ID

				if (ids.includes(id)) {

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
					var rawDiff = jsonObj.commandData.leaderboard.difficulty.difficulty; //Difficulty, but only in plain text
					var gameMode = jsonObj.commandData.leaderboard.difficulty.gameMode; //Game mode
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

					switch (gameMode) {
						case "SoloStandard": 
							gameMode = "Standard";
							break;
						case "SoloLawless":
							gameMode = "Lawless";
							break;
						case "SoloOneSaber":
							gameMode = "One Saber";
							break;
						case "SoloNoArrows":
							gameMode = "No Arrows";
							break;
						case "Solo90Degree":
							gameMode = "90 Degree";
							break;
						case "Solo360Degree":
							gameMode = "360 Degree";
							break;
						case "SoloLightshow":
							gameMode = "Lightshow";
							break;
						default:
							gameMode = "Standard";
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
							rawDiff = "Easy";
							break;
						case 3:
							songDiff = "Normal";
							rawDiff = "Normal";
							break;
						case 5:
							songDiff = "Hard";
							rawDiff = "Hard";
							break;
						case 7:
							songDiff = "Expert";
							rawDiff = "Expert";
							break;
						case 9:
							songDiff = "Expert+";
							rawDiff = "ExpertPlus";
							break;
					}

					async function getRank(id) {
						try {
							const response = await fetch("https://scoresaber.com/api/player/"+id+"/basic", {
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

					async function getReplay(id, songHash, rawDiff) {
						try {
							const response = await fetch("https://api.beatleader.xyz/score/" + id + "/" + songHash + "/" + rawDiff + "/Standard");
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

					await new Promise(resolve => setTimeout(resolve, 5000));

					let mapId = await getBeatSaverId(songHash);
					var replayConstructor = await getReplay(id, songHash, rawDiff);
					if (replayConstructor === "0") {
						replayUrl = "https://replay.beatleader.xyz/?id=" + mapId + "&difficulty=" + rawDiff + "&playerID=" + id;
					} else {
						replayUrl = "https://replay.beatleader.xyz/?scoreId=" + replayConstructor;
					}
					console.log("Name: " + name + " | ID: " + id + " | Score: " + baseScore + " | ACC: " + acc + " | Song name: \"" + songAuthorName + " - " + songName + "\" | Diff: " + songDiff + " | Map ID: " + mapId);
					getRank(id).then(function (result) {
						ur = result[0];
						cr = result[1];
						console.log("Above score got submitted to FAD.");
						sendMessage(id, name, pfp, country, ur, cr, rank, pp, weight, badCuts, missedNotes, fullCombo, hmd, leaderboardId, mapId, songHash, songName, songSubName, songAuthorName, levelAuthorName, songDiff, stars, maxScore, coverImage, acc, 1, replayUrl, gameMode, ranked); //Send message to Discord
					});
				}
			}
		}
	};

	SSSock.onclose = function (e) {
		console.log('Socket is closed. Reconnect will be attempted in 5 seconds.', e.reason);
		setTimeout(function () {
			connect();
		}, 5000);
	};

	SSSock.onerror = function (err) {
		console.error('Socket encountered error: ', err.message, 'Closing socket');
		SSSock.close();
	};

	setInterval(function () {
		SSSock.ping('Ping!');
	}, 120000); // 60 * 1000 milsec

}

setInterval(function () {
	getUsers(false);
}, 60000);
getUsers(true);
connect();

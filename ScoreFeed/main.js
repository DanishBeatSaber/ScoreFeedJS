// Setup our environment variables via dotenv
require('dotenv').config()
// Import relevant modules
const WebSocket = require('ws');
const fetch = require('node-fetch');
const XMLHttpRequest = require('xhr2');

function sendMessage(id,name,pfp,country,ur,cr,rank,pp,weight,badCuts,missedNotes,fullCombo,hmd,leaderboardId,songHash,songName,songSubName,songAuthorName,levelAuthorName,songDiff,stars,maxScore,coverImage,acc) {
	var id = id; //id
	var name = name; //name
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
			url:"https://scoresaber.com/u/"+id, //URL
		},
		thumbnail: { //Thumbnail
			url: pfp, //URL
		},
		//title: "Laur - Attractor Dimension | Laur Fanclub",
		title: songAuthorName+" - "+songName+" | "+levelAuthorName, //Title
		type: "rich", //Type
		description: "Map rank: **#"+rank+"**", //Description
		url: "https://scoresaber.com/leaderboard/"+leaderboardId, //URL
		color: hexToDecimal(color), //Color
		footer: { //Footer
		text: name + " - "+hmd+" - Global: "+ur+" - Local: "+cr, //Footer Text
		icon_url: pfp, //Footer Icon
		},
		timestamp: new Date(), //Timestamp
		fields: [ 
			{
				name: "Difficulty:", //Field Name
				value: "```"+difficulty+" "+stars.toFixed(2)+"★ ```", //Field Value
				inline: true, //Inline
			},
			{
				name: 'PP: (Weighted PP)', //Field Name
				value: "```"+pp.toFixed(2)+"pp ["+(pp*weight).toFixed(2)+"pp]```", //Field Value
				inline: true, //Inline
			},
			{
				name: 'ACC *(Bad cut/Miss)*:', //Field Name
				value: "```"+acc.toFixed(2)+"% ("+badCuts+"/"+missedNotes+") "+fullCombo+"```", //Field Value
				inline: true, //Inline
			}
		]
	}
	var params = { //Create Params
		tts: false, //TTS
		username: process.env.DISCORD_USERNAME, //Username
		avatar_url: process.env.DISCORD_PROFILEPICTURE, //Avatar URL
		embeds: [myEmbed] //Embeds
	}

	request.send(JSON.stringify(params)); //Send Params

	// function that converts a color HEX to a valid Discord color
	function hexToDecimal(hex) { //Convert Hex to Decimal
		return parseInt(hex.replace("#",""), 16) //Convert Hex to Decimal
	}
}

var TAsock = new WebSocket("wss://scoresaber.com/ws"); // Open WebSocket to ScoreSaber
TAsock.onopen = function(event) { //When socket is open, do this
console.log("WE ARE CONNECTED BOIS"); // log that the connection was made
};

TAsock.onmessage = async function(event) { // event.data is the message
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
				var hmd = jsonObj.commandData.score.hmd; //HMD
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
				var acc = ((baseScore / maxScore) * 100);
				
				switch (hmd) {
					case 0:
						hmd = "Unknown";
						break;
					case 1:
						hmd = "Oculus Rift CV1";
						break;
					case 2:
						hmd = "HTC Vive";
						break;
					case 4:
						hmd = "HTC Vive Pro";
						break;
					case 8:
						hmd = "Windows Mixed Reality";
						break;
					case 16:
						hmd = "Oculus Rift S";
						break;
					case 32:
						hmd = "Oculus Quest 1/2";
						break;
					case 64:
						hmd = "Valve Index";
						break;
					case 128:
						hmd = "HTC Vive Cosmos";
						break;
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
							
				fetch('https://new.scoresaber.com/api/player/'+id+'/basic') //Fetch player info from scoresaber
				.then(response => response.json()) //Parse response
				.then(data2 => {
					if (data2.hasOwnProperty('playerInfo')){
						var ur = data2.playerInfo.rank; //Set ur to player rank
						var cr = data2.playerInfo.countryRank; //Set cr to player country rank
					} else {
						var ur = 0;
						var cr = 0;
					}
					
					/*Default ScoreFeed*/
					if (ranked) /*Check if score is on ranked map */ {
						if (rank <= process.env.SS_MAPRANK || weight >= process.env.SS_PPWeight) /*Check if users maprank is lower between 1 and set maprank, or weighted PP is higher than set PP weight */ {	
							if (country == process.env.SS_COUNTRY) /*Check if user is from set country */{
								
								console.log(id+" "+acc+" "+songDiff);
								if (acc >= process.env.BS_ACC)  /*Check if user acc is above set acc-requirement */ {
									sendMessage(id,name,pfp,country,ur,cr,rank,pp,weight,badCuts,missedNotes,fullCombo,hmd,leaderboardId,songHash,songName,songSubName,songAuthorName,levelAuthorName,songDiff,stars,maxScore,coverImage,acc); //Send message to Discord
								}
							}
						}
					}
					
					/* This can be removed */
					if (songHash == "CB9F1581FF6C09130C991DB8823C5953C660688F") /* Check if user passed FF9 */ {
						if (country == process.env.SS_COUNTRY) /*Check if Danish */{	
								console.log(id+" "+acc+" "+songDiff);
								sendMessage(id,name,pfp,country,ur,cr,rank,pp,weight,badCuts,missedNotes,fullCombo,hmd,leaderboardId,songHash,songName,songSubName,songAuthorName,levelAuthorName,songDiff,stars,maxScore,coverImage,acc); //Send message to Discord
						}
					}
							
					if (ranked) /*Check if score is on ranked map */ {
						if (country !== process.env.SS_COUNTRY) /*Check if not Danish potato */{
							if (acc == 69)  /*Check if very nice acc */{
								console.log(id+" "+acc+" "+songDiff);
								sendMessage(id,name,pfp,country,ur,cr,rank,pp,weight,badCuts,missedNotes,fullCombo,hmd,leaderboardId,songHash,songName,songSubName,songAuthorName,levelAuthorName,songDiff,stars,maxScore,coverImage,acc); //Send message to Discord
							}
						}
					}
					/* Down to here, just for fun stuff for Dane Saber */
				});
			}
		}
	}
};
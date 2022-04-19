function sendMessage(id,name,pfp,country,ur,cr,rank,pp,weight,badCuts,missedNotes,fullCombo,hmd,leaderboardId,songHash,songName,songSubName,songAuthorName,levelAuthorName,songDiff,stars,maxScore,coverImage,acc,beatsaver) {
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
	var beatsaver = beatsaver; //beatsaver

const request = new XMLHttpRequest(); // Create a request
request.open("POST", "WEBHOOK HERE"); //Set Webhook
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
	color: hexToDecimal("#ff0000"), //Color
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
	username: "Dane Saber - Top 100 scores", //Username
	avatar_url: "https://danesaber.cc/images/logo.png", //Avatar URL
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
jsonObj = JSON.parse(event.data); // parse the message as JSON

	if (jsonObj.commandName === "score") /*Check for command*/ {
		if (jsonObj.commandData.score.leaderboardPlayerInfo.country == "DK") /*Check if Danish */{			
			if (jsonObj.commandData.score.rank <= 100 || jsonObj.commandData.score.weight >= 0.4903952634930577) /*Check if user is top100 on map */ {
                if (jsonObj.commandData.leaderboard.ranked == true) /*Check if score is on ranked map */ {
						var id = jsonObj.commandData.score.leaderboardPlayerInfo.id; //User ID
						var name =  jsonObj.commandData.score.leaderboardPlayerInfo.name; //Username
						var pfp =  jsonObj.commandData.score.leaderboardPlayerInfo.profilePicture; //Profilepicture
						var country =  jsonObj.commandData.score.leaderboardPlayerInfo.country; //Country
						var rank =  jsonObj.commandData.score.rank; //Rank
						var baseScore =  jsonObj.commandData.score.baseScore; //Base score
						var modifiedScore =  jsonObj.commandData.score.modifiedScore; //Modified score
						var pp =  jsonObj.commandData.score.pp; //PP
						var weight =  jsonObj.commandData.score.weight; //Weight
						var multiplier =  jsonObj.commandData.score.multiplier; //Multiplier
						var badCuts =  jsonObj.commandData.score.badCuts; //Bad cuts
						var missedNotes =  jsonObj.commandData.score.missedNotes; //Missed notes
						var fullCombo =  jsonObj.commandData.score.fullCombo; //Full combo
						var hmd =  jsonObj.commandData.score.hmd; //HMD
						var leaderboardId =  jsonObj.commandData.leaderboard.id; //Leaderboard ID
						var songHash =  jsonObj.commandData.leaderboard.songHash; //Song hash
						var songName =  jsonObj.commandData.leaderboard.songName; //Song name
						var songSubName =  jsonObj.commandData.leaderboard.songSubName; //Song sub name
						var songAuthorName =  jsonObj.commandData.leaderboard.songAuthorName; //Song author name
						var levelAuthorName =  jsonObj.commandData.leaderboard.levelAuthorName; //Level author name
						var difficulty =  jsonObj.commandData.leaderboard.difficulty.difficulty; //Difficulty
						var stars =  jsonObj.commandData.leaderboard.stars; //Stars
						var maxScore =  jsonObj.commandData.leaderboard.maxScore; //Max score
						var coverImage = jsonObj.commandData.leaderboard.coverImage; //Cover image
							if (hmd == 0) {hmd = "Unknown"}; //If HMD is 0, set it to unknown
							if (hmd == 1) {hmd = "Oculus Rift CV1"}; //If HMD is 1, set it to Oculus Rift CV1
							if (hmd == 2) {hmd = "HTC Vive"}; //If HMD is 2, set it to HTC Vive
							if (hmd == 4) {hmd = "HTC Vive Pro"}; //If HMD is 4, set it to HTC Vive Pro
							if (hmd == 8) {hmd = "Windows Mixed Reality"}; //If HMD is 8, set it to Windows Mixed Reality
							if (hmd == 16) {hmd = "Oculus Rift S"}; //If HMD is 16, set it to Oculus Rift S
							if (hmd == 32) {hmd = "Oculus Quest 1/2"}; //If HMD is 32, set it to Oculus Quest 1/2
							if (hmd == 64) {hmd = "Valve Index"}; //If HMD is 64, set it to Valve Index
							if (hmd == 128) {hmd = "HTC Vive Cosmos"}; //If HMD is 128, set it to HTC Vive Cosmos
								if (fullCombo == true) { //If full combo is true, set it to true
									var fullCombo = "FC"; //Set full combo to FC
								} else { //If full combo is false, set it to false
									var fullCombo = ""; //Set full combo to nothing
								} 
						var songHash = jsonObj.commandData.leaderboard.songHash; //Song hash
						var songDiff = jsonObj.commandData.leaderboard.difficulty.difficulty; //Song difficulty
							if (songDiff == 1) {songDiff = "Easy"}; //If song difficulty is 1, set it to Easy
							if (songDiff == 3) {songDiff = "Normal"}; //If song difficulty is 3, set it to Normal 
							if (songDiff == 5) {songDiff = "Hard"}; //If song difficulty is 5, set it to Hard
							if (songDiff == 7) {songDiff = "Expert"}; //If song difficulty is 7, set it to Expert
							if (songDiff == 9) {songDiff = "ExpertPlus"}; //If song difficulty is 9, set it to ExpertPlus
						fetch('https://api.beatsaver.com/maps/hash/'+songHash) //Fetch song info from beatsaver
						.then(response => response.json()) //Parse response
						.then(data => { 
						var beatsaver = data.id; //Set beatsaver ID
							
						const findNotes = (difficulty, data) => {
						let notes = [] //Create notes array
						data.forEach(diff => { //For each difficulty
							if (diff.difficulty === difficulty) { 
								notes = diff.notes //Set notes to difficulty notes
							//console.log(notes); //Log notes
							} 
						}) 
							return notes //Return notes
						}
						var passDiff = findNotes(songDiff, data.versions[0].diffs); //Find notes for song difficulty
						var maxScore = (((passDiff - 13) * 920) + 4715); //Calculate max score
						var acc = (modifiedScore / maxScore * 100); //Calculate accuracy
	
							fetch('https://new.scoresaber.com/api/player/'+id+'/basic') //Fetch player info from scoresaber
							.then(response => response.json()) //Parse response
							.then(data2 => {
							var ur = data2.playerInfo.rank; //Set ur to player rank
							var cr = data2.playerInfo.countryRank; //Set cr to player country rank
							//console.log(ur); //Log ur
							//console.log(cr); //Log cr
								sendMessage(id,name,pfp,country,ur,cr,rank,pp,weight,badCuts,missedNotes,fullCombo,hmd,leaderboardId,songHash,songName,songSubName,songAuthorName,levelAuthorName,songDiff,stars,maxScore,coverImage,acc,beatsaver); //Send message to Discord
							})
						});	
				}
			}
		} 
	}
};

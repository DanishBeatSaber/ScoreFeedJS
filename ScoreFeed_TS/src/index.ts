import "dotenv/config";
import WebSocket from "ws";

import { MessageType, PlayerInfo, ScoreInfo, SongInfo } from "./helpers/types";
import handler from "./handler";

/**
 * @function testMsg
 * @description Sends a test message with player, score, and song information if the test variable is set to true.
 * @returns {void}
**/
import testMsg from "./test";
const test: boolean = false;
if (test) {
    testMsg();
}

/**
 * @constant wsUrl
 * @description The URL of the WebSocket server to connect to.
 * @type {string}
**/
const wsUrl: string = "wss://scoresaber.com/ws";
let sSocket: WebSocket;

/**
 * @constant restartInterval
 * @description Interval in miliseconds, to countdown until we restart and reconnect the WebSocket.
 * @type {number}
**/
const restartInterval: number = 1000 * 60 * 60; // 1 hour

/**
 * @function connectWebSocket
 * @description Connects to the WebSocket server, sets up event listeners for open, message, and close events.
 * If the connection is closed, it will attempt to reconnect after 10 seconds.
 * @throws {Error} If the WebSocket connection fails.
 */
async function connectWebSocket() {
    sSocket = new WebSocket(wsUrl);

    sSocket.on("open", async () => {
        console.log(`[${new Date().toLocaleString()}] WebSocket connected!`);
        setInterval(() => {
            sSocket.close(1000, "Restarting ScoreFeed connection.");
        }, restartInterval);
    });

    sSocket.on("message", async (data: WebSocket.Data) => {
        if (data.toString() === "Connected to the ScoreSaber WSS") return;

        const jsonObj = JSON.parse(data.toString());

        if (jsonObj.commandData.score.leaderboardPlayerInfo.country !== process.env.SS_COUNTRY && process.env.LIMIT_BY_COUNTRY) return;
        if (jsonObj.commandName !== "score") return;

        const player: PlayerInfo = {
            id: jsonObj.commandData.score.leaderboardPlayerInfo.id,
            name: jsonObj.commandData.score.leaderboardPlayerInfo.name,
            pfp: jsonObj.commandData.score.leaderboardPlayerInfo.profilePicture,
            country: jsonObj.commandData.score.leaderboardPlayerInfo.country,
            globalRank: 0,
            localRank: 0,
            hmd: jsonObj.commandData.score.deviceHmd
        };

        const score: ScoreInfo = {
            mapRank: jsonObj.commandData.score.rank,
            nonWeightedPP: jsonObj.commandData.score.pp,
            ppWeight: jsonObj.commandData.score.weight,
            accuracy: ((jsonObj.commandData.score.baseScore / jsonObj.commandData.leaderboard.maxScore) * 100),
            badCuts: jsonObj.commandData.score.badCuts,
            missedNotes: jsonObj.commandData.score.missedNotes,
            fullCombo: jsonObj.commandData.score.fullCombo,
            maxScore: jsonObj.commandData.leaderboard.maxScore,
            replayUrl: null
        };

        const song: SongInfo = {
            leaderboardId: jsonObj.commandData.leaderboard.id,
            mapId: jsonObj.commandData.leaderboard.songHash,
            songHash: jsonObj.commandData.leaderboard.songHash,
            songName: jsonObj.commandData.leaderboard.songName,
            songSubName: jsonObj.commandData.leaderboard.songSubName,
            songAuthorName: jsonObj.commandData.leaderboard.songAuthorName,
            levelAuthorName: jsonObj.commandData.leaderboard.levelAuthorName,
            songDiff: jsonObj.commandData.leaderboard.difficulty.difficulty,
            stars: jsonObj.commandData.leaderboard.stars,
            coverImage: jsonObj.commandData.leaderboard.coverImage,
            ranked: jsonObj.commandData.leaderboard.ranked
        };

        const messageData: MessageType = {
            player,
            score,
            song
        };

        if (process.env.RANKED_ONLY && song.ranked || !process.env.RANKED_ONLY) {
            if (score.mapRank <= process.env.SS_MAPRANK || score.ppWeight >= process.env.SS_PPWeight) {
                await handler(messageData as MessageType);
            }
        }
    });

    sSocket.on("close", async (code: number, reason: string) => {
        console.log(`[${new Date().toLocaleString()}] WebSocket closed with code ${code} and reason: ${reason}`);
        setTimeout(function () {
            connectWebSocket();
        }, 10000);
    });

}

connectWebSocket();

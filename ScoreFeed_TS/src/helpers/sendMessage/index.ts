import "dotenv/config";
import axios from "axios";
import { MessageType, PlayerInfo, ScoreInfo, SongInfo } from "../types";
import { hexToDecimal } from "../universal";

export default async function sendMessage(data: MessageType) {

    /**
     * @variable scoreInfo
     * @description Contains details about the score, including map rank, PP values, accuracy, and replay URL.
     * @type {ScoreInfo}
     */
    const scoreInfo: ScoreInfo = data.score;

    /**
     * @variable playerInfo
     * @description Contains details about the player, including their ID, name, profile picture, country, and ranks.
     * @type {PlayerInfo}
     */
    const playerInfo: PlayerInfo = data.player;

    /**
     * @variable songInfo
     * @description Contains details about the song, including its name, author, difficulty, and ranking status.
     * @type {SongInfo}
     */
    const songInfo: SongInfo = data.song;

    /**
     * @param replayDisabled
     * @description Determines if the replay should be disabled based on the map rank and song ranking status.
     * @variable replayDisabled
     * @type {boolean}
     * @default false
     */
    let replayDisabled: boolean = false;

    if (scoreInfo.replayUrl === "https://allpoland.github.io/ArcViewer/?scoreID=0") {
        replayDisabled = true;
    }

    /**
     * @variable embedHexColor
     * @description Determines the color of the embed based on the map rank.
     * @type {string}
     */
    const embedHexColor: string = scoreInfo.mapRank === 1 ? "#FFC700" :
        scoreInfo.mapRank === 2 ? "#AAAAAA" :
            scoreInfo.mapRank === 3 ? "#954500" :
                scoreInfo.mapRank <= 10 ? "#E91E63" :
                    scoreInfo.mapRank <= 25 ? "#CA00FF" :
                        scoreInfo.mapRank <= 50 ? "#04D3F8" :
                            scoreInfo.mapRank <= 100 ? "#2ECC71" :
                                "#9CFFF4";

    /**
     * @variable embedComponents
     * @description Constructs the components for the embed message, including player and song information, score details, and action buttons.
     * @type {any[]}
    **/
    let embedComponents: any[] = [
        {
            type: 17,
            accent_color: hexToDecimal(embedHexColor),
            spoiler: false,
            components: [
                {
                    type: 9,
                    accessory: {
                        type: 11,
                        media: {
                            url: playerInfo.pfp,
                        },
                        description: null,
                        spoiler: false,
                    },
                    components: [
                        {
                            type: 10,
                            content: `[${playerInfo.name}](<https://scoresaber.com/u/${playerInfo.id}>)`,
                        },
                        {
                            type: 10,
                            content:
                                `## [${songInfo.songAuthorName} - ${songInfo.songName} | ${songInfo.levelAuthorName}](<https://scoresaber.com/leaderboard/${songInfo.leaderboardId}>)`,
                        },
                        { type: 10, content: `Map rank: **#${scoreInfo.mapRank}**` },
                    ],
                },
                { type: 14, divider: true, spacing: 2 },
                {
                    type: 1,
                    components: songInfo.ranked ? [
                        {
                            type: 2,
                            style: 4,
                            label: `${songInfo.songDiff} ${songInfo.stars.toFixed(2)}★`,
                            emoji: { name: "DIFF", id: "1366520018044715158" },
                            disabled: true,
                            custom_id: "diff_id",
                        },
                        {
                            type: 2,
                            style: 1,
                            label: `${scoreInfo.nonWeightedPP.toFixed(2)}pp (${(scoreInfo.nonWeightedPP * scoreInfo.ppWeight).toFixed(2)}pp)`,
                            emoji: { name: "PP", id: "1366520480395431976" },
                            disabled: true,
                            custom_id: "pp_id",
                        },
                        {
                            type: 2,
                            style: 3,
                            label: `${scoreInfo.accuracy.toFixed(2)}% ${scoreInfo.fullCombo ? "FC" : `(${scoreInfo.badCuts + scoreInfo.missedNotes} Misses)`}`,
                            emoji: { name: "🎯", id: null },
                            disabled: true,
                            custom_id: "acc_id",
                        },
                    ] : [
                        {
                            type: 2,
                            style: 4,
                            label: `${songInfo.songDiff}`,
                            emoji: { name: "DIFF", id: "1366520018044715158" },
                            disabled: true,
                            custom_id: "diff_id",
                        },
                        {
                            type: 2,
                            style: 3,
                            label: `${scoreInfo.accuracy.toFixed(2)}% ${scoreInfo.fullCombo ? "FC" : `(${scoreInfo.badCuts + scoreInfo.missedNotes} Misses)`}`,
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
                            url: `https://scoresaber.com/u/${playerInfo.id}`,
                        },
                        {
                            type: 2,
                            style: 5,
                            label: "Leaderboard",
                            emoji: { name: "📈", id: null },
                            disabled: false,
                            url: `https://scoresaber.com/leaderboard/${songInfo.leaderboardId}`,
                        },
                        {
                            type: 2,
                            style: 5,
                            label: "Map",
                            emoji: { name: "🗺️", id: null },
                            disabled: false,
                            url: `https://beatsaver.com/maps/${songInfo.mapId}`,
                        },
                        {
                            type: 2,
                            style: 5,
                            label: "Replay",
                            emoji: { name: "⏪", id: null },
                            disabled: replayDisabled,
                            url: scoreInfo.replayUrl,
                        },
                    ],
                },
                { type: 14, divider: true, spacing: 2 },
                {
                    type: 10,
                    content: `-# ${playerInfo.name} (${playerInfo.country}) - ${playerInfo.hmd} - Global: ${playerInfo.globalRank} - Local: ${playerInfo.localRank}`,
                },
            ],
        },
    ];

    /**
     * @variable params
     * @description Contains the parameters for the Discord webhook, including the username, avatar URL, components, and flags.
     * @type {object}
     * @property {boolean} tts - Text-to-speech option, set to false.
     * @property {string} username - The username to display in the webhook message.
     * @property {string} avatar_url - The URL of the avatar to display in the webhook message.
     * @property {any[]} components - The components to include in the embed message.
     * @property {number} flags - Message flags, set to 32768 for components v2.
     * @see {@link https://discord.js.org/docs/packages/discord-api-types/main/MessageFlags:enum#IsComponentsV2}
    **/
    let params: any = {
        tts: false,
        username: process.env.DISCORD_USERNAME || "ScoreSaber Feed",
        avatar_url: process.env.DISCORD_PROFILEPICTURE || "https://scoresaber.com/images/logo.svg",
        components: embedComponents,
        flags: 32768
    };

    try {
        await axios.post(process.env.DISCORD_WEBHOOK || "", JSON.stringify(params), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log(`[${new Date().toLocaleString()}] Name: ${playerInfo.name} | ID: ${playerInfo.id} | Score: ${scoreInfo.nonWeightedPP.toFixed(2)}pp | ACC: ${scoreInfo.accuracy.toFixed(2)}% | Song name: "${songInfo.songName}" | Diff: ${songInfo.songDiff} | Map ID: ${songInfo.mapId}`);
        return;
    } catch (error) {
        console.error(`[${new Date().toLocaleString()}] Error sending message to Discord webhook:`, error);
        return;
    }

}

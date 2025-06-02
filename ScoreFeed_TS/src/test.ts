
import handler from "./handler";
import { MessageType, PlayerInfo, ScoreInfo, SongInfo } from "./helpers/types";
export default async function testMsg() {
    const playerInfo: PlayerInfo = {
        id: "76561198086326146",
        name: "Hawk",
        pfp: "https://cdn.scoresaber.com/avatars/76561198086326146.jpg",
        country: "DK",
        globalRank: 2270,
        localRank: 46,
        hmd: "Valve Index"
    };
    const scoreInfo: ScoreInfo = {
        mapRank: 385,
        nonWeightedPP: 374.48,
        ppWeight: 1,
        accuracy: 95.03,
        badCuts: 1,
        missedNotes: 1,
        fullCombo: false,
        maxScore: 1144595,
        replayUrl: "",
    };
    const songInfo: SongInfo = {
        leaderboardId: "485350",
        mapId: "23596",
        songHash: "C3CFED196F96B161C0862EC387E0EE9241CD5B48",
        songName: "Novablast",
        songSubName: "",
        songAuthorName: "Rhea",
        levelAuthorName: "Bitz, Cokeinjector, Luck & Sync",
        songDiff: 5,
        stars: 8.87,
        coverImage: "https://eu.cdn.beatsaver.com/c3cfed196f96b161c0862ec387e0ee9241cd5b48.jpg",
        ranked: true,
    };

    const messageData: MessageType = {
        player: playerInfo,
        score: scoreInfo,
        song: songInfo,
    };

    await handler(messageData as MessageType);

}
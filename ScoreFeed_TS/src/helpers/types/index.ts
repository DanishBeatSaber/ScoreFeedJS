type playerInfoType = {
    id: string;
    name: string;
    pfp: string;
    country: string;
    globalRank: number;
    localRank: number;
    hmd: string;
}

type scoreInfoType = {
    mapRank: number | string | any;
    nonWeightedPP: number;
    ppWeight: number | string | any;
    accuracy: number;
    badCuts: number;
    missedNotes: number;
    fullCombo: boolean;
    maxScore: number;
    replayUrl?: string | null;
}

type songInfoType = {
    leaderboardId: string;
    mapId: string;
    songHash: string;
    songName: string;
    songSubName: string;
    songAuthorName: string;
    levelAuthorName: string;
    songDiff: number | string;
    stars: number;
    coverImage: string;
    ranked: boolean;
}

type messageType = {
    player: playerInfoType;
    score: scoreInfoType;
    song: songInfoType;
}

export { playerInfoType as PlayerInfo, scoreInfoType as ScoreInfo, songInfoType as SongInfo, messageType as MessageType };
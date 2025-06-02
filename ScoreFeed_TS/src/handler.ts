import sendMessage from "./helpers/sendMessage";
import getBeatSaverId from "./helpers/getMap";
import getRank from "./helpers/getRank";
import { MessageType, PlayerInfo, ScoreInfo, SongInfo } from "./helpers/types";
import getReplay from "./helpers/getReplay";

export default async function handler(data: MessageType) {
  const player: PlayerInfo = data.player;
  const score: ScoreInfo = data.score;
  const song: SongInfo = data.song;

  let rawDiff: string = "";

  switch (song.songDiff) {
    case 1:
      song.songDiff = "Easy";
      rawDiff = "Easy";
      break;
    case 3:
      song.songDiff = "Normal";
      rawDiff = "Normal";
      break;
    case 5:
      song.songDiff = "Hard";
      rawDiff = "Hard";
      break;
    case 7:
      song.songDiff = "Expert";
      rawDiff = "Expert";
      break;
    case 9:
      song.songDiff = "Expert+";
      rawDiff = "ExpertPlus";
      break;
  }

  const [globalRank, localRank] = await getRank(player.id);
  player.globalRank = globalRank;
  player.localRank = localRank;

  song.mapId = await getBeatSaverId(song.songHash);

  setTimeout(async () => {
    score.replayUrl = await getReplay(player.id, song.songHash, rawDiff);
    sendMessage({ player, score, song });
  }, 1000);

  return;
}

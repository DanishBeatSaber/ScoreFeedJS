export default async function getReplay(id: string, songHash: string, songDiff: string | number): Promise<string> {
    try {
        const response = await fetch("https://api.beatleader.xyz/player/" + id + "/scores?search=" + songHash + "&diff=" + songDiff + "&mode=Standard");
        const data = await response.json();
        return "https://allpoland.github.io/ArcViewer/?scoreID="+data.data[0].id;
    } catch (error) {
        return "https://allpoland.github.io/ArcViewer/?scoreID=0";
    }
}
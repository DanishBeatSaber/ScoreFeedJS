export default async function getRank(id: string): Promise<[number, number]> {
    try {
        const response = await fetch("https://scoresaber.com/api/player/" + id + "/basic", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'NodeJS/1.0.0 (ScoreFeed)'
            }
        });
        const data = await response.json();
        var globalRank = data.rank;
        var localRank = data.countryRank;

        return [globalRank, localRank];
    } catch (error) {
        console.log(error);
        return [0, 0];
    }
}
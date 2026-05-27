export default async function getRank(id: string): Promise<[number, number]> {
    try {
        const response = await fetch("https://scoresaber.com/api/v2/players/" + id + "/basic", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'NodeJS/1.0.0 (ScoreFeed)'
            }
        });
        const data = await response.json();
        var globalRank = data.stats.rank;
        var localRank = data.stats.countryRank;

        return [globalRank, localRank];
    } catch (error) {
        console.log(error);
        return [0, 0];
    }
}

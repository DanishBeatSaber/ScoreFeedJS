export default async function getBeatSaverId(hash: string): Promise<string> {
    try {
        const response = await fetch("https://api.beatsaver.com/maps/hash/" + hash);
        const data = await response.json();
        var id = data.id;
        return id;
    } catch (error) {
        console.log(error);
        return null ;
    }
}
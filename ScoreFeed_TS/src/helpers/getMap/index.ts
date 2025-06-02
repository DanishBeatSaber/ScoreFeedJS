export default async function getBeatSaverId(hash: string): Promise<string> {
    try {
        const response = await fetch("https://api.beatsaver.com/maps/hash/" + hash);
        const data = await response.json();
        return data.id;
    } catch (error) {
        console.log(error);
        return null;
    }
}

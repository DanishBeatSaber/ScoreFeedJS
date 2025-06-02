/**
 * 
 * @param hex Hexadecimal color string (e.g., "#FF5733")
 * @description Converts a hexadecimal color string to a decimal integer.
 * @returns 
 */
export function hexToDecimal(hex: string) {
	return parseInt(hex.replace("#", ""), 16)
}
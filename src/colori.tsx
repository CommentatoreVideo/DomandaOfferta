export function getRGB() {
	const rosso = Math.floor(Math.random() * 256) + "";
	const verde = Math.floor(Math.random() * 256) + "";
	const blu = Math.floor(Math.random() * 256) + "";
	return { rosso, verde, blu };
}

/**
 * Calcola e ritorna backgroundColor e borderColor
 */
export function getRandomColor() {
	const { rosso, verde, blu } = getRGB();
	return { backgroundColor: `rgba(${rosso},${verde},${blu},0.2)`, borderColor: `rgba(${rosso},${verde},${blu},1)` };
}
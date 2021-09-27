import { Calcola, DomandaOfferta, Memoria, MemoriaRaw } from "./interfaces";

const memoria: MemoriaRaw = {
	domande: [
		{
			nome: "Alice",
			coppie: [
				[12, 0],
				[8, 0],
				[7, 1],
				[6, 2],
				[4, 4],
				[1, 6],
			],
		},
		{
			nome: "Luca",
			coppie: [
				[12, 0],
				[8, 2],
				[7, 3],
				[6, 5],
				[4, 6],
				[1, 8],
			],
		},
		{
			nome: "Francesca",
			coppie: [
				[12, 1],
				[8, 2],
				[7, 4],
				[6, 5],
				[4, 7],
				[1, 8],
			],
		},
	],
	offerte: [
		{
			nome: "Livia",
			coppie: [
				[12, 11],
				[8, 7],
				[7, 4],
				[6, 3],
				[4, 2],
				[1, 1],
			],
		},
		{
			nome: "Antonio",
			coppie: [
				[12, 9],
				[8, 6],
				[7, 4],
				[6, 2],
				[4, 1],
				[1, 0],
			],
		},
	],
};

export function getMemoria(): Memoria {
	const risultato: Memoria = { domande: [], offerte: [] };
	risultato.domande = memoria.domande.slice().map((domanda, indice) => {
		return { ...domanda, indice };
	});
	risultato.offerte = memoria.offerte.slice().map((offerta, indice) => {
		return { ...offerta, indice: indice + memoria.domande.length };
	});
	return risultato;
}

/**
 * Filtra la memoria in modo da prendere solo i valori richiesti dall'utente
 * @param memoria La memoria
 * @param calcola Il vettore con le scelte su chi calcolare
 * @returns Un oggetto con le domande e le offerte filtrate
 */
export function getMemoriaValida(memoria: Memoria, calcola: Calcola) {
	const domande = memoria.domande.filter(({ indice }) => calcola.find(tripletta => tripletta[0] === indice && tripletta[2]));
	const offerte = memoria.offerte.filter(({ indice }) => calcola.find(tripletta => tripletta[0] === indice && tripletta[2]));
	return { domande, offerte };
}

export function getDomandeOfferteValide(memoria: DomandaOfferta[], calcola: Calcola) {
	return memoria.filter(({ indice }) => calcola.find(([id, , calcola]) => id === indice && calcola));
}

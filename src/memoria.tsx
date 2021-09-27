import { Calcola, DomandaOfferta, Memoria, MemoriaRaw } from "./interfaces";

export function createIndexMemoria(memoria:MemoriaRaw): Memoria {
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

export interface GraficiProps {
  memoria:Memoria;
  calcola:Array<[number,string,boolean]>;
}
export interface DomandaOfferta {
	nome: string;
	coppie: Array<[number,number]>;
  indice:number;
}
export interface DomandaOffertaRaw {
	nome: string;
	coppie: Array<[number,number]>;
}
export interface Memoria {
	domande: DomandaOfferta[];
	offerte: DomandaOfferta[];
}
export interface MemoriaRaw {
	domande: DomandaOffertaRaw[];
	offerte: DomandaOffertaRaw[];
}

export interface Dataset {
	label: string;
	data: Array<{ x: number; y: number }>;
	backgroundColor: string;
	borderColor: string;
	showLine?: boolean;
}

export interface ScatterChartMultiProps {
	datasets: Array<Dataset>;
}

export type Calcola=Array<[number,string,boolean]>;
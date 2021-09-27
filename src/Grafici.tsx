import { getRandomColor } from "./colori";
import ScatterChart from "./Components/ScatterChart";
import ScatterChartMulti from "./Components/ScatterChartMulti";
import { Calcola, Dataset, DomandaOfferta, GraficiProps } from "./interfaces";
import { getDomandeOfferteValide } from "./memoria";

function generaColGrafico(label: string, data: Array<{ x: number; y: number }>,key:number) {
	return <div key={key} className="col-xl-4">{<ScatterChart data={data}>{label}</ScatterChart>}</div>;
}
function generaColGraficoTotale(datasets: Array<Dataset>,key:number) {
	return <div key={key} className="col-xl-4">{<ScatterChartMulti datasets={datasets}></ScatterChartMulti>}</div>;
}

export function creaDataset(label: string, coppie: Array<[number, number]>) {
	return {
		label,
		...getRandomColor(),
		data: coppie.map(([prezzo, quantità]) => ({ x: quantità, y: prezzo })),
		showLine: true,
	};
}
function filtraDatasets(datasetsTotale: Array<[Dataset, number]>, calcolare: Calcola) {
	return datasetsTotale
		.filter(([dataset, indice]) => {
			if (dataset.label === "Totale") return true;
			return calcolare.find(([id]) => id === indice)?.[2]||false;
		})
		.map(([dataset]) => dataset);
}
function calcolaDatasetsTotale(memoria: DomandaOfferta[], calcola: Calcola): Array<[Dataset, number]> {
	const memoriaFiltrata = getDomandeOfferteValide(memoria, calcola);
	const grafici: Array<[Dataset, number]> = memoria.map(({ nome, coppie, indice }) => [creaDataset(nome, coppie), indice]);
	return [...grafici, [creaDataset("Totale", getTotale(memoriaFiltrata)), -1]];
}
function generaGrafici(memoria: DomandaOfferta[], vettore: any[], calcola: Calcola) {
	let riga: any[] = [];
	const datasetsEIndiciTotale = calcolaDatasetsTotale(memoria, calcola);
	const datasetFiltrati = filtraDatasets(datasetsEIndiciTotale, calcola);
	const datasetsTotale = datasetsEIndiciTotale.map(([dataset]) => dataset);
	let i=0;
	for (const { label, data } of datasetsTotale) {
		const col = label === "Totale" ? generaColGraficoTotale(datasetFiltrati,i++) : generaColGrafico(label, data,i++);
		if (riga.length === 3) {
			vettore.push(<div key={i++} className="row">{riga.slice()}</div>);
			riga = [];
		}
		riga.push(col);
	}
	if (riga.length !== 0) vettore.push(<div key={i++} className="row">{riga.slice()}</div>);
}

function generaDatasetGraficoTotale(domande: Array<[number, number]>, offerte: Array<[number, number]>) {
	return [creaDataset("Domande", domande), creaDataset("Offerte", offerte)];
}

function generaGraficoTotale(domandaTotale: Array<[number, number]>, offertaTotale: Array<[number, number]>,key:number) {
	const datasets = generaDatasetGraficoTotale(domandaTotale, offertaTotale);
	return <div className="row">{generaColGraficoTotale(datasets,key)}</div>;
}

const Grafici: React.FunctionComponent<GraficiProps> = ({ memoria:{domande,offerte}, calcola }) => {
	const graficiDomande: any[] = [];
	const graficiOfferte: any[] = [];
	generaGrafici(domande, graficiDomande, calcola);
	generaGrafici(offerte, graficiOfferte, calcola);
	const domandeFiltrate=getDomandeOfferteValide(domande,calcola);
	const offerteFiltrate=getDomandeOfferteValide(offerte,calcola);
	const graficoFinale = generaGraficoTotale(getTotale(domandeFiltrate), getTotale(offerteFiltrate),-1);
	return (
		<div>
			<h1>Domande</h1>
			{graficiDomande}
			<h1>Offerte</h1>
			{graficiOfferte}
			<h1>Domanda e offerta</h1>
			{graficoFinale}
		</div>
	);
};

export default Grafici;
/**
 * Calcola i valori per il grafico totale partendo dalle domande o dalle offerte
 * @param domandeOfferte Domande o offerte
 * @returns Il vettore delle coppie prezzo/quantità per il grafico totale
 */
function getTotale(domandeOfferte: DomandaOfferta[]) {
	const coppie: Array<[number, number]> = [];
	for (const domanda of domandeOfferte) {
		for (const [prezzo, quantità] of domanda.coppie) {
			const coppiaSalvata = coppie.find(coppia => coppia[0] === prezzo);
			if (coppiaSalvata === undefined) coppie.push([prezzo, quantità]);
			else coppiaSalvata[1] += quantità;
		}
	}
	return coppie;
}

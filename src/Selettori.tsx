import Checkbox from "./Checkbox";
import { Calcola, Memoria } from "./interfaces";

export interface SelettoriProps {
	memoria: Memoria;
	calcola: Calcola;
	setCalcola: (calcola: any) => any;
}

function creaRiga(key: string | number, riga: any) {
	return (
		<div key={key} className="row">
			{riga}
		</div>
	);
}

function creaCol(key: number | string, checkbox: any) {
	return (
		<div key={key} className="col-3">
			{checkbox}
		</div>
	);
}

const Selettori: React.FunctionComponent<SelettoriProps> = ({ memoria, calcola, setCalcola }) => {
	function premuto(e: any) {
		const checkbox = e.target;
		const id = Number(checkbox.id.substring(8));
		setCalcola((calcola: Calcola) => calcola.map(([indice, nome, calcola]) => [indice, nome, indice === id ? !calcola : calcola]));
	}
  let chiavi=0;
	const righe: any[] = [<h3 key={chiavi++}>Domande</h3>];
	let cont = -1;
	let riga: any = [];
	cont++;
	for (const [indice, nome, fatto] of calcola) {
		if (cont % 4 === 0) {
			riga = [];
		} else if (cont === memoria.domande.length) {
			righe.push(creaRiga(chiavi++, riga));
			righe.push(<h3 key={chiavi++}>Offerte</h3>);
			riga = [];
			cont = 0;
		}
		const checkbox = <Checkbox label={nome} checked={fatto} id={`checkbox${indice}`} premuto={premuto}></Checkbox>;
		riga.push(creaCol(chiavi++, checkbox));
		if (cont % 4 === 3) righe.push(creaRiga(righe.length, riga));
		cont++;
	}
	if (riga.length !== 0) righe.push(creaRiga(righe.length, riga));
	return <div>{righe}</div>;
};

export default Selettori;

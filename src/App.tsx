import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Grafici from "./Grafici";
import { getMemoria } from "./memoria";
import { useState } from "react";
import Selettori from "./Selettori";
const App = () => {
	const memoria = getMemoria();
  const calcolaDomandeDefault:Array<[number,string,boolean]> =memoria.domande.map(domanda=>[domanda.indice,domanda.nome,true]);
  const calcolaOffertaDefault:Array<[number,string,boolean]> =memoria.offerte.map(offerte=>[offerte.indice,offerte.nome,true]);
  const calcolaDefault:Array<[number,string,boolean]> =[...calcolaDomandeDefault,...calcolaOffertaDefault];
  const [calcola,setCalcola]=useState<Array<[number,string,boolean]>>(calcolaDefault);
	return (
		<div className="container-fluid">
      <Selettori memoria={memoria} calcola={calcola} setCalcola={setCalcola}></Selettori>
			<Grafici memoria={memoria} calcola={calcola}></Grafici>
		</div>
	);
};

export default App;

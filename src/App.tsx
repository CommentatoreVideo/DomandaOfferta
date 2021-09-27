import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Grafici from "./Grafici";
import { createIndexMemoria } from "./memoria";
import { useEffect, useState } from "react";
import Selettori from "./Selettori";
import firebase from "firebase/app";
import "firebase/firestore";
import { Memoria } from "./interfaces";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const App = () => {
	const [loading,setLoading]=useState(true);
	const [memoria, setMemoria] = useState<Memoria>({ domande: [], offerte: [] });
	useEffect(function () {
		const fetchData = async () => {
			// database
			const db = firebase.firestore();
			// data
			let dataDomande = await db.collection("domande").get();
			const domande = dataDomande.docs.map(doc => {
				return {
					coppie: doc.data().coppie.map((coppia: string) => [Number(coppia.split(",")[0]), Number(coppia.split(",")[1])]) as Array<[number, number]>,
					nome: doc.data().nome as string,
					prova: true,
				};
			});
			let dataOfferte = await db.collection("offerte").get();
			const offerte = dataOfferte.docs.map(doc => {
				return {
					coppie: doc.data().coppie.map((coppia: string) => [Number(coppia.split(",")[0]), Number(coppia.split(",")[1])]) as Array<[number, number]>,
					nome: doc.data().nome as string,
				};
			});
			setMemoria(createIndexMemoria({ offerte, domande }));
			setLoading(false);
		};
		// start loading data
		fetchData();
	}, []);

	const [calcola, setCalcola] = useState<Array<[number, string, boolean]>>([]);
	useEffect(function () {
		const calcolaDomandeDefault: Array<[number, string, boolean]> = memoria.domande.map(domanda => [domanda.indice, domanda.nome, true]);
		const calcolaOffertaDefault: Array<[number, string, boolean]> = memoria.offerte.map(offerte => [offerte.indice, offerte.nome, true]);
		const calcolaDefault: Array<[number, string, boolean]> = [...calcolaDomandeDefault, ...calcolaOffertaDefault];
		setCalcola(calcolaDefault);
	}, [memoria]);
	if(loading) return <h1>Caricamento...</h1>
	return (
		<div className="container-fluid">
			<Selettori memoria={memoria} calcola={calcola} setCalcola={setCalcola}></Selettori>
			<Grafici memoria={memoria} calcola={calcola}></Grafici>
		</div>
	);
};

export default App;

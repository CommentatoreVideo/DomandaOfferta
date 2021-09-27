import React from "react";
import { Scatter } from "react-chartjs-2";
import { ScatterChartMultiProps } from "../interfaces";

const ScatterChartMulti: React.FunctionComponent<ScatterChartMultiProps> = ({ datasets }) => {
	return (
		<div>
			<Scatter
				data={{
					datasets,
				}}
				height={400}
				width={600}
				options={{
					maintainAspectRatio: false,
					scales: {
						y: {
							title: {
								text: "Prezzo",
								display: true,
							},
							ticks: {
								callback: prezzo => `${Number(prezzo).toFixed(2)}€`,
							},
						},
						x: {
							title: {
								text: "Quantità",
								display: true,
							},
						},
					},
				}}></Scatter>
		</div>
	);
};

export default ScatterChartMulti;

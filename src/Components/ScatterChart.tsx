import React from "react";
import { Scatter } from "react-chartjs-2";
import { creaDataset } from "../Grafici";

export interface ScatterChartProps {
	data: Array<{ x: number; y: number }>;
	children: string;
}

const ScatterChart: React.FunctionComponent<ScatterChartProps> = ({ children, data }) => {
	return (
		<div>
			<Scatter
				data={{
					datasets: [
						creaDataset(
							children,
							data.map(({ x, y }) => [y, x])
						),
					],
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
								callback: prezzo=>`${Number(prezzo).toFixed(2)}€`
							},
						},
						x:{
							title:{
								text:"Quantità",
								display:true
							}
						}
					},
				}}></Scatter>
		</div>
	);
};

export default ScatterChart;

import { 
    useRef,
} from "react"
import { fetchPredictionRates, type Api } from "../../api"
import type { AxiosError } from "axios";
import GraphError from "../GraphError";
import GraphShimmer from "../GraphShimmer";
import { Chart } from "chart.js/auto";
import { useChartEffect } from "../../hooks/useChartEffect";

function makeChart(canvas: HTMLCanvasElement, data: Api.PredictionRates) {
    return new Chart(canvas.getContext('2d')!, {
        type: 'line',
        options: {
            aspectRatio: 1.6
        },
        data: {
            labels: [...data.rates.map(rate=>new Date(rate.date).toLocaleDateString()), ...data.predictionRates.map(rate=>new Date(rate.date).toLocaleDateString())],
            datasets: [{
                label: "Currency rates",
                data: data.rates.map(rate=>rate.rate)
            }, {
                label: "Predicted rates",
                data: [...Array.from({length: data.rates.length}).fill(null), ...data.predictionRates.map(rate=>rate.rate)] as number[]
            }]
        }
    });
}

function CurrencyPredictionRatesChart(props: {
    code: string, 
}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const {data, state} = useChartEffect<Api.PredictionRates>({
        canvasRef:  canvasRef,
        fetcher: ()=>fetchPredictionRates(props.code),
        drawer:  (canvas, data)=>makeChart(canvas, data),
        fetchDeps: [props.code]
    });

    switch(state) {
        case 'loading':
            return <GraphShimmer />;
        case 'error':
            return <GraphError axiosError={data as AxiosError} />;
        case 'ready':
            return <canvas ref={canvasRef}/>
    }
}

interface CurrencyPredictionRatesProps {
    code: string;
}

export default function CurrencyPredictionRates(props: CurrencyPredictionRatesProps) {
    return (
        <div>
            <div className="text-lg font-bold m-2">Prediction rates for {props.code}</div>
            <div className="m-2" style={{aspectRatio: "1.6 / 1"}}>
                <CurrencyPredictionRatesChart code={props.code}/>
            </div>
        </div>
    )
}
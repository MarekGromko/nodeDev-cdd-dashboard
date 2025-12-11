import {
    useRef,
} from "react"
import { fetchUnstableRates, type Api } from "../../api"
import GraphError from "../GraphError";
import GraphShimmer from "../GraphShimmer";
import { Chart } from "chart.js/auto";
import { useChartEffect } from "../../hooks/useChartEffect";

function makeChart(canvas: HTMLCanvasElement, data: Api.UnstableRates) {
    const rates = data.rates.sort((a, b) => a.variance-b.variance).slice(0,10);
    return new Chart(canvas.getContext('2d')!, {
        type: 'pie',
        options: {
            aspectRatio: 1,
        },
        data: {
            labels: rates.map(x=>x.code),
            datasets: [{
                label: "Variance",
                data: rates.map(rate=>(rate.variance))
            }]
        }
    });
}

function UnstableRatesChart(props: any) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { state, data } = useChartEffect({
        canvasRef:  canvasRef,
        fetcher: ()=>fetchUnstableRates(new Date(props.date)),
        drawer:  (canvas, data)=>makeChart(canvas, data),
    });
    switch(state) {
        case 'loading':
            return <GraphShimmer />;
        case 'error':
            return <GraphError axiosError={data} />;
        case 'ready':
            return <canvas ref={canvasRef}/>
    }
}

export default function UnstableRates() {
    return (
        <div>
            <div className="text-lg font-bold m-2">Unstables Rates</div>
            <div className="m-2" style={{aspectRatio: "1.6 / 1"}}>
                <UnstableRatesChart date={new Date().toISOString()}/>
            </div>
        </div>
    )
}
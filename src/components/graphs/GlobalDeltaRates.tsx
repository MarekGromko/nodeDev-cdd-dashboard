import { 
    useRef,
    useState 
} from "react"
import { fetchGlobalDeltas, type Api } from "../../api"
import { unwrapTimeframe } from "../../helpers/helpers";
import type { AxiosError } from "axios";
import GraphError from "../GraphError";
import GraphShimmer from "../GraphShimmer";
import { Chart } from "chart.js/auto";
import { useChartEffect } from "../../hooks/useChartEffect";

function makeChart(canvas: HTMLCanvasElement, data: Api.GlobalDeltas) {
    console.log(data);
    return new Chart(canvas.getContext('2d')!, {
        type: 'line',
        options: {
            aspectRatio: 1.6
        },
        data: {
            labels: data.deltas.map(delta=>new Date(delta.date).toLocaleDateString()),
            datasets: [{
                label: "Global currency change of rates",
                data: data.deltas.map(delta=>delta.delta)
            }]
        }
    });
}

function GlobalDeltaRatesChart(props: {timeframe: string}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const {data, state} = useChartEffect<Api.GlobalDeltas>({
        canvasRef:  canvasRef,
        fetcher: ()=>fetchGlobalDeltas(...unwrapTimeframe(props.timeframe)),
        drawer:  (canvas, data)=>makeChart(canvas, data),
        fetchDeps: [props.timeframe]
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

export default function GlobalDeltaRates() {
    const [timeframe, setTimeframe] = useState("month");
    return (
        <div>
            <div className="text-lg font-bold m-2">Global Delta Rates</div>
            <select defaultValue="month" className="select p-0 px-4 w-28 h-12" onChange={x=> setTimeframe(x.target.value)}>
                <option value="month">Month</option>
                <option value="halfyear">Half year</option>
                <option value="year">Year</option>
            </select>
            <div className="m-2" style={{aspectRatio: "1.6 / 1"}}>
                <GlobalDeltaRatesChart timeframe={timeframe}/>
            </div>
        </div>
    )
}
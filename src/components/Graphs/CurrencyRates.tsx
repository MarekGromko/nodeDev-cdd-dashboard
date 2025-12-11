import { 
    useRef,
    useState 
} from "react"
import { fetchRates, type Api } from "../../api"
import { unwrapTimeframe } from "../../helpers/helpers";
import type { AxiosError } from "axios";
import GraphError from "../GraphError";
import GraphShimmer from "../GraphShimmer";
import { Chart } from "chart.js/auto";
import { useChartEffect } from "../../hooks/useChartEffect";

function makeChart(canvas: HTMLCanvasElement, data: Api.Rates) {
    console.log(data);
    return new Chart(canvas.getContext('2d')!, {
        type: 'line',
        options: {
            aspectRatio: 1.6
        },
        data: {
            labels: data.rates.map(rate=>new Date(rate.date).toLocaleDateString()),
            datasets: [{
                label: "Curerncy rate",
                data: data.rates.map(rate=>rate.rate)
            }]
        }
    });
}

function CurrencyRatesChart(props: {code: string, timeframe: string}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const {data, state} = useChartEffect<Api.Rates>({
        canvasRef:  canvasRef,
        fetcher: ()=>fetchRates(props.code, ...unwrapTimeframe(props.timeframe)),
        drawer:  (canvas, data)=>makeChart(canvas, data),
        fetchDeps: [props.timeframe, props.code]
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

interface CurrencyRatesProps {
    code: string;
}

export default function CurrencyRates(props: CurrencyRatesProps) {
    const [timeframe, setTimeframe] = useState("month");
    return (
        <div>
            <div className="text-lg font-bold m-2">Global Delta Rates</div>
            <select defaultValue="month" className="select p-0 px-4 w-28 h-12" onChange={x=> setTimeframe(x.target.value)}>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="halfyear">Half year</option>
                <option value="year">Year</option>
            </select>
            <div className="m-2" style={{aspectRatio: "1.6 / 1"}}>
                <CurrencyRatesChart timeframe={timeframe} code={props.code}/>
            </div>
        </div>
    )
}
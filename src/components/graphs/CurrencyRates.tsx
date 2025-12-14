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
import { currencyList } from "../../data/currencies";
import { getCurrencyFlag } from "../../data/flags";

function makeChart(canvas: HTMLCanvasElement, data: [Api.Rates, Api.Rates?]) {
    const [mainData, compareData] = data;
    return new Chart(canvas.getContext('2d')!, {
        type: 'line',
        options: {
            aspectRatio: 1.6
        },
        data: {
            labels: mainData.rates.map(rate=>new Date(rate.date).toLocaleDateString()),
            datasets: [{
                label: "Curerncy rate",
                data: mainData.rates.map(rate=>rate.rate)
            }, ...(compareData ? [{
                label: "Comparison rate",
                data: compareData.rates.map(rate=>rate.rate)
            }] : [])]
        }
    });
}

function CurrencyRatesChart(props: {
    code: string, 
    timeframe: string,
    compareTo?: string
}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const {data, state} = useChartEffect<[Api.Rates, Api.Rates?]>({
        canvasRef:  canvasRef,
        fetcher: ()=>Promise.all([
            fetchRates(props.code, ...unwrapTimeframe(props.timeframe)),
            props.compareTo ? fetchRates(props.compareTo!, ...unwrapTimeframe(props.timeframe)) : Promise.resolve(undefined)
        ]),
        drawer:  (canvas, data)=>makeChart(canvas, data),
        fetchDeps: [props.timeframe, props.code, props.compareTo]
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
    const [compareTo, setCompareTo] = useState<string>("");
    return (
        <div>
            <div className="text-lg font-bold m-2">Currency rates for {props.code}</div>
            <select defaultValue="month" className="select p-0 px-4 w-28 h-12" onChange={x=> setTimeframe(x.target.value)}>
                <option value="month">Month</option>
                <option value="halfyear">Half year</option>
                <option value="year">Year</option>
            </select>
            <select defaultValue="" className="select p-0 px-4 w-48 h-12 ml-4" onChange={x=> setCompareTo(x.target.value)}>
                <option value="">No compraison</option>
                {currencyList
                    .map(c=>{
                        if(c.code === props.code) return null;
                        return (
                            <option key={c.code} value={c.code}>
                                {getCurrencyFlag(c.code)} - {c.code}
                            </option>
                        );
                    })
                }
            </select>
            <div className="m-2" style={{aspectRatio: "1.6 / 1"}}>
                <CurrencyRatesChart timeframe={timeframe} code={props.code} compareTo={compareTo}/>
            </div>
        </div>
    )
}
import { 
    useEffect,
    useLayoutEffect,
    useRef,
    useState 
} from "react"
import { fetchGlobalDeltaRates, type Api } from "../../api"
import { unwrapTimeframe } from "../../helpers/helpers";
import type { AxiosError } from "axios";
import GraphError from "../GraphError";
import GraphShimmer from "../GraphShimmer";
import { Chart } from "chart.js/auto";

function makeChart(canvas: HTMLCanvasElement, data: Api.TimeframeDeltaRates) {
    return new Chart(canvas.getContext('2d')!, {
        type: 'line',
        options: {
            aspectRatio: 1.6
        },
        data: {
            labels: data.deltaRate.map(x=>new Date(x.date).toLocaleDateString()),
            datasets: [
            {
                label: "Global currency change of rates",
                data: data.deltaRate.map(x=>x.delta)
            }
            ]
        }
    });
}

function GlobalDeltaRatesChart(props: {timeframe: string}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [rates, setRates] = useState<Api.TimeframeDeltaRates | AxiosError | null>(null);

    const isError   = rates !== null && (rates as AxiosError).isAxiosError;
    const isLoading = rates === null;

    useEffect(()=>{
        setRates(null);
        fetchGlobalDeltaRates(...unwrapTimeframe(props.timeframe))
        .then(res=>{
            setRates(res);
        })
        .catch(e=>{
            setRates(e as AxiosError);
        });
    }, [props.timeframe]);

    useLayoutEffect(()=>{
        if(!canvasRef.current) return;
        if(isError || isLoading) return;
        const chart = makeChart(canvasRef.current, rates as Api.TimeframeDeltaRates);
        return ()=>chart.destroy();
    }, [rates]);

    if(isLoading)
        return <GraphShimmer />;
    if(isError)
        return <GraphError axiosError={rates as AxiosError} />;

    return <canvas ref={canvasRef}/>
}

export default function GlobalDeltaRates() {
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
                <GlobalDeltaRatesChart timeframe={timeframe}/>
            </div>
        </div>
    )
}
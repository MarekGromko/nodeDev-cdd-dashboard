import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState 
} from "react"
import { fetchGlobalRates, type Api } from "../../api"
import type { AxiosError } from "axios";
import GraphError from "../GraphError";
import GraphShimmer from "../GraphShimmer";
import { Chart } from "chart.js/auto";
import Pikaday from "pikaday";

function makeChart(canvas: HTMLCanvasElement, data: Api.GlobalTimestampedRate) {
    const rates = data.rates.sort((a, b) => a.rate-b.rate);
    return new Chart(canvas.getContext('2d')!, {
        type: 'bar',
        options: {
            aspectRatio: 1.6
        },
        data: {
            labels: rates.map(x=>x.code),
            datasets: [
            {
                label: "Global currencies rates",
                data: rates.map(x=>x.rate)
            }
            ]
        }
    });
}

function GlobalDeltaRatesChart(props: {date: string}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [rates, setRates] = useState<Api.GlobalTimestampedRate | AxiosError | null>(null);
    const isError = rates !== null && (rates as AxiosError).isAxiosError;
    const isLoading = rates === null;

    useEffect(()=>{
        setRates(null);
        fetchGlobalRates(new Date(props.date))
        .then(res=>{
            setRates(res);
        })
        .catch(e=>{
            setRates(e as AxiosError);
        });
    }, [props.date]);

    useLayoutEffect(()=>{
        if(!canvasRef.current) return;
        if(isError || isLoading) return;
        const chart = makeChart(canvasRef.current, rates as Api.GlobalTimestampedRate);
        return ()=>chart.destroy();
    }, [rates]);
    if(isLoading)
        return <GraphShimmer />;
    if(isError)
        return <GraphError axiosError={rates as AxiosError} />;
    return <canvas 
        ref={canvasRef}
    />
}

export default function GlobalRates() {
    const [date, setDate] = useState<string>(new Date().toISOString());
    const dateRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        const picker = new Pikaday({
            field: dateRef.current,
            onSelect: function(date) {
                setDate(date.toISOString());
            }
        });
        return () => picker.destroy();
    }, []);

    return (
        <div>
            <div className="text-lg font-bold m-2">Global Rates</div>
            <input 
                type="text" 
                className="input pika-single" 
                defaultValue={new Date(date).toISOString()} 
                ref={dateRef}
            />
            <div className="m-2" style={{aspectRatio: "1.6 / 1"}}>
                <GlobalDeltaRatesChart date={date} />
            </div>
        </div>
    )
}
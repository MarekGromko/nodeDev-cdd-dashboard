import {
    useEffect,
    useRef,
    useState 
} from "react"
import { fetchGlobalRates, type Api } from "../../api"
import GraphError from "../GraphError";
import GraphShimmer from "../GraphShimmer";
import { Chart } from "chart.js/auto";
import Pikaday from "pikaday";
import { useChartEffect } from "../../hooks/useChartEffect";

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
    const {state, data} = useChartEffect<Api.GlobalTimestampedRate>({
        canvasRef:  canvasRef,
        fetcher: ()=>fetchGlobalRates(new Date(props.date)),
        drawer:  (canvas, data)=>makeChart(canvas, data),
        fetchDeps: [props.date]
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
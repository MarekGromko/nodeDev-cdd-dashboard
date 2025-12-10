import { Suspense, use, useState } from "react"
import { fetchGlobalDeltaRates } from "../../api"
import { unwrapTimeframe } from "../../helpers/helpers";
import type { AxiosError } from "axios";
import GraphError from "../GraphError";
import GraphShimmer from "../GraphShimmer";


function GlobalDeltaRatesGraph(props: {
    timeframe: string
}) {
    const rates = use(
        fetchGlobalDeltaRates(...unwrapTimeframe(props.timeframe))
        .catch(e=>e as AxiosError)
    );
    if((rates as AxiosError).isAxiosError) 
        return <GraphError axiosError={rates as AxiosError} />
    return <canvas/>
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
            <Suspense fallback={<GraphShimmer/>}>
                <GlobalDeltaRatesGraph timeframe={timeframe}/>
            </Suspense>
        </div>
    )
}
import { fetchRate, fetchStability } from "../../api";
import type { Api } from "../../api.dto";
import { getCurrencyFlag } from "../../data/flags";
import { currenciesName } from "../../data/namesEn";
import { useFetcher } from "../../hooks/useFetcher";

interface CurrencyInfoProps {
    code: string;
}

const StatefulBadge = (props: { state: 'loading' | 'error' | 'ready', value: any })=>{
    if(props.state === 'loading') {
        return <div className="badge badge-soft badge-info w-full text-lg">...</div>
    }
    if(props.state === 'error') {
        return <div className="badge badge-soft badge-error w-full text-lg">ERR</div>
    }
    return <div className="badge badge-soft badge-info w-full text-lg">{props.value}</div>
}

export default function CurrencyInfo(props: CurrencyInfoProps) {
    const rateData      = useFetcher<Api.Rate>(()=>fetchRate(props.code, new Date()), [props.code]);
    const stabilityData = useFetcher<Api.Stability>(()=>fetchStability(props.code, new Date()), [props.code]);
    return (
        <div className="flex flex-row bg-base-300 max-w-lg p-4 rounded-md gap-8 items-center justify-between">
            <div className="flex flex-col items-center">
                <div className="flex flex-row items-center gap-2">
                    <div className="text-6xl">{getCurrencyFlag(props.code)}</div>
                    <div className="text-4xl font-bold ">{props.code}</div>
                </div>
                <div className="capitalize">
                    {(currenciesName as any)[props.code] ?? "Unknown currency"}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                    <div className="w-14">Rate: </div>
                    <StatefulBadge state={rateData.state} value={
                        rateData.state === 'ready' ? 
                            rateData.data.rate.toString(): 
                            null} />
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <div className="w-14">Stability: </div>
                    <StatefulBadge state={stabilityData.state} value={
                        stabilityData.state === 'ready' ? 
                            stabilityData.data.stability.toString() : 
                            null} />
                </div>
            </div>
        </div>
    );
}
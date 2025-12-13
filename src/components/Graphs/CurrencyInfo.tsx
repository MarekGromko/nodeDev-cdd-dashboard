import { getCurrencyFlag } from "../../data/flags";
import { currenciesName } from "../../data/namesEn";

interface CurrencyInfoProps {
    code: string;
}

export default function CurrencyInfo(props: CurrencyInfoProps) {
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
                    <div className="badge badge-soft badge-info w-16 text-lg">1.32</div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <div className="w-14">Stability: </div>
                    <div className="badge badge-soft badge-info w-16 text-lg">1.32</div>
                </div>
            </div>
        </div>
    );
}
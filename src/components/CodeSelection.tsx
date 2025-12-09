import { useState } from "react";
import { currencyList, currencyMap } from "../data/currencies";
import { getCurrencyFlag } from "../data/flags";

export interface CodeSelectionProps {
    name: string,
    value: string,
    OnSelect?: (newValue: string) => void;
}

export default function CodeSelection(props: CodeSelectionProps) {
    const [searchParam, setSearchParam] = useState<string>('');
    return (<>
        <button className="btn btn-primary" popoverTarget="popover-1" style={{ anchorName: props.name } /* as React.CSSProperties */}>
            {getCurrencyFlag(props.value)} {props.value}
        </button>

        <ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm max-h-96 overflow-y-auto"
            popover="auto" 
            id="popover-1" 
            style={{ positionAnchor: props.name } /* as React.CSSProperties */ }>
            <div>
                <input type="text" placeholder="Search…" className="input input-bordered w-full max-w-xs mb-2"
                    value={searchParam}
                    onChange={(e) => setSearchParam(e.target.value)}
                />
                {currencyList
                    .filter(currency => searchParam === '' || currency.code.toLowerCase().includes(searchParam.toLowerCase()))
                    .map(currency => (
                        <li key={currency.code}>
                            <a href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.OnSelect?.(currency.code);
                                }}
                            >
                                <span style={{ marginRight: '8px' }}>{getCurrencyFlag(currency.code)}</span>
                                {currency.code}
                            </a>
                        </li>
                    ))
                } 
            </div>
        </ul>
    </>)
}
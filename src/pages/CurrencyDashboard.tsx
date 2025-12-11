import { useState } from "react";
import { currencyList } from "../data/currencies";
import { getCurrencyFlag } from "../data/flags";
import CurrencyInfo from "../components/CurrencyInfo";
import { useSearchParams } from "react-router";


export default function GlobalDashboard() {
    const [searchParams] = useSearchParams({code: 'USD'});
    const [hint, setHint] = useState<string>('');
    
    return (<div className="flex flex-col gap-4">
        <div className="drawer">
            <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-1" className="btn drawer-button">Change currency</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="input mb-4" 
                        onChange={e=>setHint(e.target.value)} 
                    />
                    {
                        currencyList
                        .filter(c=>c.code.toLowerCase().includes(hint.toLowerCase()))
                        .map(currency => {
                            return (
                                <li key={currency.code}>
                                    <a href={`?code=${currency.code}`}>{getCurrencyFlag(currency.code)} - {currency.code}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
        <CurrencyInfo code={searchParams.get('code')!} />
        <div className="h-32"/>
    </div>);
}
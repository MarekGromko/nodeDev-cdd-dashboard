import GlobalDeltaRates from "../components/Graphs/GlobalDeltaRates";
import GlobalRates from "../components/Graphs/GlobalRates";

export default function GlobalDashboard() {
    return (<>
        <GlobalDeltaRates/>
        <GlobalRates/>
        <div className="h-32"/>
    </>);
}
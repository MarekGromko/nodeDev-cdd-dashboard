import GlobalDeltaRates from "../components/graphs/GlobalDeltaRates";
import GlobalRates from "../components/graphs/GlobalRates";
import GlobalStability from "../components/graphs/GlobalStability";

export default function GlobalDashboard() {
    return (<>
        <GlobalDeltaRates/>
        <GlobalRates/>
        <GlobalStability/>
        <div className="h-32"/>
    </>);
}
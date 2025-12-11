import GlobalDeltaRates from "../components/graphs/GlobalDeltaRates";
import GlobalRates from "../components/graphs/GlobalRates";
import UnstableRates from "../components/graphs/UnstableRates";

export default function GlobalDashboard() {
    return (<>
        <GlobalDeltaRates/>
        <GlobalRates/>
        <UnstableRates/>
        <div className="h-32"/>
    </>);
}
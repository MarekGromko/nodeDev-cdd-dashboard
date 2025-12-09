import { useSearchParams } from "react-router";
import VariationGraph from "../components/VariationGraph";
import CodeSelection from "../components/CodeSelection";

export default function DataDashboard() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const code = searchParams.get("code");
    return (<>
        <CodeSelection value={code ?? "USD"} name="code" OnSelect={(newValue) => setSearchParams({ code: newValue })} />
        <VariationGraph/>
    </>);
}
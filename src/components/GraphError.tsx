import type { AxiosError } from "axios";

interface GraphErrorProps {
    axiosError?: AxiosError
}

export default function GraphError(props: GraphErrorProps) {

    return (
        <div role="alert"className="alert alert-error alert-soft w-full h-full items-baseline">
            <div>
                <div>An error occured!</div>
                {props.axiosError && (
                    <pre className="whitespace-pre-wrap wrap-break-word">
                        {props.axiosError.message}
                    </pre>
                )}
            </div>
        </div>
    );
}
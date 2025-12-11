import type { AxiosError } from "axios";
import type { Chart } from "chart.js";
import { useEffect, useLayoutEffect, useState, type RefObject } from "react";

type ChartEffectOpts<T> = {
    canvasRef:  RefObject<HTMLCanvasElement | null>,
    fetcher:    ()=>Promise<T>
    drawer:     (canvas: HTMLCanvasElement, data: T)=>Chart
    fetchDeps?: any[]
}
type ChartEffectState<T> = {
    state: 'loading'
    data:  null
} | {
    state: 'error'
    data: AxiosError
} | {
    state: 'ready'
    data: T
}

export function useChartEffect<T>(opts: ChartEffectOpts<T>) {
    const [data, setData] = useState<ChartEffectState<T>>({
        state: 'loading',
        data: null
    });
    
    useEffect(()=>{
        // reset state
        setData({
            state: 'loading',
            data: null
        });

        // fetch
        opts.fetcher().then((data: T)=>{
            setData({
                state: 'ready',
                data
            });
        }).catch((data: AxiosError)=>{
            setData({
                state: 'error',
                data
            })
        })
    }, opts.fetchDeps ?? [])

    useLayoutEffect(()=>{
        if(opts.canvasRef.current == null)
            return;
        if(data.state != 'ready')
            return;
        const chart = opts.drawer(opts.canvasRef.current!, data.data);
        return ()=>chart.destroy();
    });

    return data;
}
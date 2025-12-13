import type { AxiosError } from "axios"
import { useEffect, useState } from "react"

type FetcherState<T> = {
    state: 'loading'
    data:  null
} | {
    state: 'error'
    data: AxiosError
} | {
    state: 'ready'
    data: T
}

export function useFetcher<T>(fetcher: ()=>Promise<T>, fetchDeps?: any[]) {
    const [data, setData] =  useState<FetcherState<T>>({
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
        fetcher().then((data: T)=>{
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
    }, fetchDeps ?? [])

    return data;
}
import axios from "axios";
import { mockApi } from "./api.mock";

const api = axios.create({baseURL: 'http://localhost:3000/api'});

mockApi(api);

export namespace Api {
    interface Timeframe {
        start: string;
        end: string;
    }
    export interface GlobalRates {
        timestamp: string;
        rates: {
            code: string;
            rate: number;
        }[];
    }
    export interface GlobalDeltas {
        timeframe: Timeframe
        deltas: { 
            date: string
            delta: number
        }[];
    }
    export interface GlobalStability{
        timeframe: Timeframe,
        stabilities: {
            code: string;
            stability: number;
        }[]
    }
    export interface Rate{
        code: string;
        timestamp: string;
        rate: number;
    }
    export interface Rates{
        code: string;
        timeframe: Timeframe;
        rates: {
            date: string;
            rate: number
        }[];
    }
    export interface Deltas{
        code: string;
        timeframe: Timeframe;
        deltas: {
            date: string;
            delta: number
        }[]
    }
    export interface Stability{
        code: string;
        timeframe: Timeframe;
        stability: number;
    }
}

// global api //
export async function fetchGlobalRates(date: Date) {
    const response = await api.get<Api.GlobalRates>('global/rates', {
        params: {
            date: date.toISOString()
        }
    });
    return response.data;
}

export async function fetchGlobalDeltas(start: Date, end: Date) {
    const response = await api.get<Api.GlobalDeltas>('global/deltas', {
        params: {
            start: start.toISOString(),
            end: end.toISOString()
        }
    });
    return response.data;
}

export async function fetchGlobalStability(date: Date) {
    const response = await api.get<Api.GlobalStability>('global/stability', {
        params: {
            date: date.toISOString()
        }
    });
    return response.data;
}

// single api //

export async function fetchRate(code: string, date: Date) {
    const response = await api.get<Api.Rate>('/rate', {
        params: {
            code,
            date: date.toISOString()
        }
    });
    return response.data;
}

export async function fetchRates(code: string, start: Date, end: Date) {
    const response = await api.get<Api.Rates>('/rates', {
        params: {
            code,
            start: start.toISOString(),
            end: end.toISOString()
        }
    });
    return response.data;
}

export async function fetchDeltas(code: string, start: Date, end: Date) {
    const response = await api.get<Api.Deltas>('/deltas', {
        params: {
            code,
            start: start.toISOString(),
            end: end.toISOString()
        }
    });
    return response.data;
}

export async function fetchStability(code: string, date: Date) {
    const response = await api.get<Api.Stability>('/stability', {
        params: {
            code,
            date: date.toISOString()
        }
    });
    return response.data;
}

export async function fetchPredictRates(code: string) {
    const response = await api.get<Api.Rates>("/predict-rates", {
        params: {
            code
        }
    });
    return response.data;
}
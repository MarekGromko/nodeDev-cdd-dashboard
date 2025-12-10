import axios from "axios";
import { mockApi } from "./api.mock";

const api = axios.create({baseURL: 'http://localhost:3000/api'});

mockApi(api);


export namespace Api {
    export interface TimeframeRates {
        code: string;
        rates: { date: string; rate: number }[];
    }
    export interface TimeframeDeltaRates {
        code: string;
        deltaRate: { date: string; delta: number }[];
    }
    export interface GlobalTimestampedRate {
        code: string;
        date: string;
        rates: { code: string; rate: number }[];
    }
    export interface UnstableRates {
        rates: {code: string; rate: number; variance: number}[];
    }
}

export async function fetchGlobalDeltaRates(start: Date, end: Date) {
    const response = await api.get<Api.TimeframeDeltaRates>('/global-delta-rates', {
        params: {
            start: start.toISOString(),
            end: end.toISOString()
        }
    });
    return response.data;
}

export async function fetchGlobalRates(date: Date): Promise<Api.GlobalTimestampedRate>{
    const response = await api.get<Api.GlobalTimestampedRate>('/global-rates', {
        params: {
            date: date.toISOString()
        }
    });
    return response.data;
}

export async function fetchUnstableRates(date: Date) {
    const response = await api.get<Api.TimeframeRates>('/unstable-rates', {
        params: {
            date: date.toISOString()
        }
    });
    return response.data;
}

export async function fetchRate(code: string, date: Date) {
    const response = await api.get<Api.TimeframeRates>('/rate', {
        params: {
            code,
            date: date.toISOString()
        }
    });
    return response.data;
}

export async function fetchTimeframeRates(code: string, start: Date, end: Date) {
    const response = await api.get<Api.TimeframeRates>('/rates', {
        params: {
            code,
            start: start.toISOString(),
            end: end.toISOString()
        }
    });
    return response.data;
}

export async function fetchTimeframeDeltaRates(code: string, start: Date, end: Date) {
    const response = await api.get<Api.TimeframeDeltaRates>("/delta-rates", {
        params: {
            code,
            start: start.toISOString(),
            end: end.toISOString()
        }
    });
    return response.data;
}

export async function fetchPredictRates(code: string) {
    const response = await api.get<Api.TimeframeRates>("/predict-rates", {
        params: {
            code
        }});
    return response.data;
}
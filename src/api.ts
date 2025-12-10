import axios from "axios";

const api = axios.create({baseURL: 'http://localhost:3000/api'});

export namespace ApiResponses {
    export interface TimeframeRates {
        code: string;
        rates: { date: string; rate: number }[];
    }
    export interface TimeframeDeltaRates {
        code: string;
        deltaRate: { date: string; delta: number }[];
    }
    export interface UnstableRates {
        rates: {code: string; rate: number; variance: number}[];
    }
}

export async function fetchGlobalDeltaRates(start: Date, end: Date) {
    // const response = await api.get<ApiResponses.TimeframeDeltaRates>('/global-delta-rates', {
    //     params: {
    //         start: start.toISOString(),
    //         end: end.toISOString()
    //     }
    // });
    // return response.data;
    return {code: "GLOBAL", deltaRate: [
        { date: start.toISOString(), delta: 0.5 },
        { date: end.toISOString(), delta: 1.5 },
    ]};
}

export async function fetchGlobalRates(date: Date) {
    const response = await api.get<ApiResponses.TimeframeRates>('/global-rates', {
        params: {
            date: date.toISOString()
        }
    });
    return response.data;
}

export async function fetchUnstableRates(date: Date) {
    const response = await api.get<ApiResponses.TimeframeRates>('/unstable-rates', {
        params: {
            date: date.toISOString()
        }
    });
    return response.data;
}

export async function fetchRate(code: string, date: Date) {
    const response = await api.get<ApiResponses.TimeframeRates>('/rate', {
        params: {
            code,
            date: date.toISOString()
        }
    });
    return response.data;
}

export async function fetchTimeframeRates(code: string, start: Date, end: Date) {
    const response = await api.get<ApiResponses.TimeframeRates>('/rates', {
        params: {
            code,
            start: start.toISOString(),
            end: end.toISOString()
        }
    });
    return response.data;
}

export async function fetchTimeframeDeltaRates(code: string, start: Date, end: Date) {
    const response = await api.get<ApiResponses.TimeframeDeltaRates>("/delta-rates", {
        params: {
            code,
            start: start.toISOString(),
            end: end.toISOString()
        }
    });
    return response.data;
}

export async function fetchPredictRates(code: string) {
    const response = await api.get<ApiResponses.TimeframeRates>("/predict-rates", {
        params: {
            code
        }});
    return response.data;
}
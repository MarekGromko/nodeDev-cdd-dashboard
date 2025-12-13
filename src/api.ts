import axios from "axios";
//import { mockApi } from "./api.mock";
import type { Api } from "./api.dto";

export type { Api };

export const routes = {
    ANALYSIS_GLOBAL_RATES:      'analysis/global/rates',
    ANALYSIS_GLOBAL_DELTAS:     'analysis/global/deltas',
    ANALYSIS_GLOBAL_STABILITY:  'analysis/global/stability',
    ANALYSIS_RATE:              'analysis/code/rate',
    ANALYSIS_RATES:             'analysis/code/rates',
    ANALYSIS_STABILITY:         'analysis/code/stability',
    ANALYSIS_PREDICTION_RATES:  'analysis/code/prediction/rates'
}

const api = axios.create({baseURL: import.meta.env.VITE_API_BASE_URL || '/api'});

//mockApi(api);

// global api //
export async function fetchGlobalRates(date: Date) {
    const response = await api.get<Api.GlobalRates>(routes.ANALYSIS_GLOBAL_RATES, {
        params: {
            date: date.toISOString()
        }
    });
    return response.data;
}

export async function fetchGlobalDeltas(start: Date, end: Date) {
    const response = await api.get<Api.GlobalDeltas>(routes.ANALYSIS_GLOBAL_DELTAS, {
        params: {
            start: start.toISOString(),
            end: end.toISOString()
        }
    });
    return response.data;
}

export async function fetchGlobalStability(date: Date) {
    const response = await api.get<Api.GlobalStability>(routes.ANALYSIS_GLOBAL_STABILITY, {
        params: {
            date: date.toISOString()
        }
    });
    return response.data;
}

// currencu api //
export async function fetchRate(code: string, date: Date) {
    const response = await api.get<Api.Rate>(routes.ANALYSIS_RATE.replace('code', code), {
        params: {
            code,
            date: date.toISOString()
        }
    });
    return response.data;
}

export async function fetchStability(code: string, date: Date) {
    const response = await api.get<Api.Stability>(routes.ANALYSIS_STABILITY.replace('code', code), {
        params: {
            code,
            date: date.toISOString()
        }
    });
    return response.data;
}

export async function fetchRates(code: string, start: Date, end: Date) {
    const response = await api.get<Api.Rates>(routes.ANALYSIS_RATES.replace('code', code), {
        params: {
            code,
            start: start.toISOString(),
            end: end.toISOString()
        }
    });
    return response.data;
}

export async function fetchPredictionRates(code: string) {
    const response = await api.get<Api.PredictionRates>(routes.ANALYSIS_PREDICTION_RATES.replace('code', code), {
        params: {
            code
        }
    });
    return response.data;
}
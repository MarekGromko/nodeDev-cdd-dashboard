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
    export interface PredictionRates {
        code: string;
        rates: {
            date: string;
            rate: number;
        }[];
        forecast: {
            day: number,
            min: number,
            med: number,
            max: number
        }[];
    }
    export interface Stability {
        code: string;
        timeframe: Timeframe;
        stability: number;
    }
}
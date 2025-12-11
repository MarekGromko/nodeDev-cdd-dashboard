import { type Api } from "./api";
import { faker } from "@faker-js/faker";
import { currencyMap } from "./data/currencies";
import { AxiosError } from "axios";

const DELAY_MS = 500;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));;

function mockGlobalDeltaRates(opts: any): Api.TimeframeDeltaRates {
    return {
        code: "GLOBAL",
        deltaRate: Array.from({length: 30}, (_, i) => {
            const date = new Date(Date.now() - i * 24*60*60*1000);
            return {
                date: date.toISOString(),
                delta: faker.number.float({min: -0.05, max: 0.05, fractionDigits: 3})
            }
        })
    };
}

function mockGlobalRates(opts: any): Api.GlobalTimestampedRate {
    const codes = faker.helpers.arrayElements(Object.keys(currencyMap), 20);
    return {
        code: "GLOBAL",
        date: new Date().toISOString(),
        rates: codes.map(code => {
            return {
                code,
                rate: faker.number.float({min: 0.5, max: 2.0, fractionDigits: 4})
            }
        })
    }
}

function mockUnstableRates(opts: any): Api.UnstableRates {
    const codes = Object.keys(currencyMap);
    return {
        rates: codes.map(code=>{
            return {
                code,
                rate: faker.number.float({min: 0.5, max: 2.0, fractionDigits: 4}),
                variance: faker.number.float()*faker.number.float()
            }
        })
    }
}

export const mockApi = (axios: any): any => {
    axios.get = async (url: string, ..._: any[]) => {
        await sleep(DELAY_MS);
        var data: any;
        switch(url) {
            case '/global-rates': data = mockGlobalRates({}); break;
            case '/global-delta-rates': data = mockGlobalDeltaRates({}); break;
            case '/unstable-rates': data = mockUnstableRates({}); break;
            default: data = new AxiosError("Not Found", "404");
        }
        return {
            data
        }
    }
}
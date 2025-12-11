import { type Api } from "./api";
import { faker } from "@faker-js/faker";
import { currencyMap } from "./data/currencies";
import { AxiosError } from "axios";

const DELAY_MS = 500;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));;

function mockGlobalRates(_: any): Api.GlobalRates {
    const codes = faker.helpers.arrayElements(Object.keys(currencyMap), 20);
    return {
        timestamp: new Date().toISOString(),
        rates: codes.map(code => {
            return {
                code,
                rate: faker.number.float({min: 0.5, max: 2.0, fractionDigits: 4})
            }
        })
    }
}
function mockGlobalDeltas(_: any): Api.GlobalDeltas {
    const deltas = Array.from({length: 30}, (_, i)=>{
        const date = new Date(Date.now() - i * 24*60*60*1000);
        return {
            date: date.toISOString(),
            delta: faker.number.float({min: -0.05, max: 0.05, fractionDigits: 3})
        }
    });
    return {
        timeframe: {
            start: deltas[deltas.length - 1].date,
            end: deltas[0].date
        },
        deltas
    };
}
function mockGlobalStability(_: any): Api.GlobalStability {
    const stabilities = faker.helpers.arrayElements(Object.keys(currencyMap), 10).map(code=>{
        return {
            code,
            stability: faker.number.float({min: 0.7, max: 1.0, fractionDigits: 3})
        }
    });
    return {
        timeframe: {
            start: new Date(Date.now() - 30*24*60*60*1000).toISOString(),
            end: new Date().toISOString()
        },
        stabilities: stabilities
    }
}

export const mockApi = (axios: any): any => {
    axios.get = async (url: string, ..._: any[]) => {
        await sleep(DELAY_MS);
        var data: any;
        switch(url) {
            case 'global/rates': 
                data = mockGlobalRates({}); break;
            case 'global/deltas':
                data = mockGlobalDeltas({}); break;
            case 'global/stability': 
                data = mockGlobalStability({}); break;
            default: throw new AxiosError("Not Found", "404");
        }
        return {
            data
        }
    }
}
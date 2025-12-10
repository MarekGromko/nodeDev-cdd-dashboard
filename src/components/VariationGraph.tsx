import axios from 'axios';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getCurrencyFlag } from '../data/flags';
import { Chart } from 'chart.js/auto';

export interface VariationGraphProps {
    code: string   //
}

export default function VariationGraph(props: VariationGraphProps) {
    const canvasRef     = useRef<HTMLCanvasElement|null>(null);
    const chartRef      = useRef<Chart|null>(null);
    useLayoutEffect(()=>{
        const data = [
            { year: 2010, count: 10 },
            { year: 2011, count: 20 },
            { year: 2012, count: 15 },
            { year: 2013, count: 25 },
            { year: 2014, count: 22 },
            { year: 2015, count: 30 },
            { year: 2016, count: 28 },
        ];
        const chart = new Chart(canvasRef.current!.getContext('2d')!,{
            type: 'line',
            data: {
                labels: data.map(row => row.year),
                datasets: [
                {
                    label: 'Acquisitions by year',
                    data: data.map(row => row.count)
                }
                ]
            }
        });
        return ()=>chart.destroy();
    });
    const [timeframe, setTimeframe] = useState("week");
    switch (timeframe) {
        case "week":
            // TODO fetch data for last week
            break;
        case "months":
            // TODO fetch data for last months
            break;
        case "year":
            // TODO fetch data for last year
            break;
    }
    return (
        <div className='flex flex-col gap-2 items-center'>
            <div>Variation graph for {getCurrencyFlag(props.code)} {props.code}</div>
            <select defaultValue="Pick a color" className="select" onChange={x=> setTimeframe(x.target.value)}>
                <option disabled={true}>Pick a timeframe</option>
                <option selected={true} value="week">Last week</option>
                <option value="months">Last months</option>
                <option value="year">Last year</option>
            </select>
            <canvas ref={canvasRef}/>
        </div>
    )
}
"use client"

import React, { useEffect } from 'react'
import { useBenchmarkContext } from '@/context/BenchmarkContext';

async function getScore(
    cpu: string,
    gpu: string,
    ssd: string,
    hdd: string,
    ram: string,
    category: string,
) {

    const res = await fetch('http://localhost:5269/api/computerScore/benchmark', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            CPU: cpu,
            GPU: gpu,
            RAM: ram,
            Storage: ssd,
            StorageType: "SSD",
            Category: category
        }),
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    let data = await res.json()
    console.log(data)
}

/**
 * Displays the value of the user's laptop.
 *
 * The value is retrieved from the server and displayed in the center of the page.
 *
 * @returns {JSX.Element} A JSX element representing the page.
 */
export default function Results() {

    const { cpuBenchmark, gpuBenchmark, ssdBenchmark, hddBenchmark, ramBenchmark, category } = useBenchmarkContext();

    useEffect(() => {
        getScore(cpuBenchmark, gpuBenchmark, ssdBenchmark, hddBenchmark, ramBenchmark, category)
    },[])

    const value = 1000;

    return (
        <div className="grid justify-items-center mx-auto w-1/3 mt-60 space-y-10">
            <h1 className="text-3xl font-bold">Results</h1>
            <p className="text-center">
                The value of your laptop is ${value}
            </p>
        </div>
    );
}
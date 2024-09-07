"use client"

import React, { useEffect, useState } from 'react'
import { useBenchmarkContext } from '@/context/BenchmarkContext';

async function getScore(
    cpu: string,
    gpu: string,
    ssd: string,
    hdd: string,
    ram: string,
    ssdStorage: boolean,
    category: string,
) {

    var storage;
    var storageType;

    if (ssdStorage) {
        storageType = "SSD";
        storage = ssd;
    } else {
        storageType = "HDD";
        storage = hdd;
    }

    const res = await fetch('http://localhost:5269/api/computerScore/benchmark', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            CPU: cpu,
            GPU: gpu,
            RAM: ram,
            Storage: storage,
            StorageType: storageType,
            Category: category
        }),
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    let data = await res.json()
    console.log(data)
    return data
}

/**
 * Displays the value of the user's laptop.
 *
 * The value is retrieved from the server and displayed in the center of the page.
 *
 * @returns {JSX.Element} A JSX element representing the page.
 */
export default function Results() {

    const { 
        cpuBenchmark, 
        gpuBenchmark, 
        ssdBenchmark, 
        hddBenchmark, 
        ramBenchmark, 
        ssdStorage, 
        category 
    } = useBenchmarkContext();

    const [gpuResult, setGpuResult] = useState(0);
    const [cpuResult, setCpuResult] = useState(0);
    const [ramResult, setRamResult] = useState(0);
    const [storageResult, setStorageResult] = useState(0);
    const [totalResult, setTotalResult] = useState(0);

    useEffect(() => {
        const fetchResult = async () => {
            const data = await getScore(cpuBenchmark, gpuBenchmark, ssdBenchmark, hddBenchmark, ramBenchmark, ssdStorage, category)
            setCpuResult(data.cpu)
            setGpuResult(data.gpu)
            setRamResult(data.ram)
            setStorageResult(data.storage)
            setTotalResult(data.totalBenchmark)
        }

        fetchResult()
    },[])

    const value = 1000;

    return (
        <div className="grid justify-items-center mx-auto w-1/3 mt-60 space-y-10">
            <h1 className="text-3xl font-bold">Results</h1>
            <p className="text-center">
                The value of your laptop is ${value}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                Cpu Benchmark: {cpuResult}
                GPU Benchmark: {gpuResult}
                Ram Benchmark: {ramResult}
                Storage Benchmark: {storageResult}
                Total Benchmark: {totalResult}
            </div>
        </div>
    );
}
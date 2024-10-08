"use client"

import React, { useEffect, useState } from 'react'
import { useBenchmarkContext } from '@/context/BenchmarkContext';
import { useRouter } from "next/navigation";


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

    const router = useRouter();

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
    },[category, cpuBenchmark, gpuBenchmark, hddBenchmark, ramBenchmark, ssdBenchmark, ssdStorage])

    function goBack() {
        router.back();
    }

    const benchmarkDisplay = (label: string, value: number, color: string) => {
        return(
            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                    <span className="text-sm font-medium text-gray-700">{value.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-5">
                    <div
                        className={`${color} h-5 rounded-full`}
                        style={{ width: `${value}%` }}
                    ></div>
                </div>
            </div>
        )
    }
    return (
        <div className="grid justify-items-center mx-auto w-1/2 mt-60 space-y-10">
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg ">
                <h1 className="text-4xl font-bold mb-8">Benchmark Results</h1>
                <div className="space-y-4">
                    {benchmarkDisplay("CPU", cpuResult, "bg-red-500")}
                    {benchmarkDisplay("GPU", gpuResult, "bg-blue-500")}
                    {benchmarkDisplay("RAM", ramResult, "bg-green-500")}
                    {benchmarkDisplay("Storage", storageResult, "bg-yellow-500")}
                    {benchmarkDisplay("Total Benchmark", totalResult, "bg-indigo-500")}
                </div>
            </div>
            <button 
                className="max-w-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                onClick={goBack}
            >
                Go Back
            </button>
        </div>
    );
}
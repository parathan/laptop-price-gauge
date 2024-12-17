"use client"

import React, { useEffect, useState } from 'react'
import { useBenchmarkContext } from '@/context/BenchmarkContext';
import { useRouter } from "next/navigation";
import { ApiContext } from '@reduxjs/toolkit/query';
import { APIContext } from '@/interfaces/context';


async function getScore(
    request: APIContext
) {

    let body = JSON.stringify({
        CPU_1: request.cpu1,
        GPU_1: request.gpu1,
        RAM_1: request.ram1,
        Storage_1: request.storage1,
        CPU_2: request.cpu2,
        GPU_2: request.gpu2,
        RAM_2: request.ram2,
        Storage_2: request.storage2,
        Category: request.category
    })

    const res = await fetch('http://localhost:5269/api/computerScore/benchmark/two', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    let data = await res.json()
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

    const { apiRequest } = useBenchmarkContext();

    const [gpuResult, setGpuResult] = useState(0);
    const [cpuResult, setCpuResult] = useState(0);
    const [ramResult, setRamResult] = useState(0);
    const [storageResult, setStorageResult] = useState(0);
    const [totalResult, setTotalResult] = useState(0);

    const [gpuResult2, setGpuResult2] = useState(0);
    const [cpuResult2, setCpuResult2] = useState(0);
    const [ramResult2, setRamResult2] = useState(0);
    const [storageResult2, setStorageResult2] = useState(0);
    const [totalResult2, setTotalResult2] = useState(0);

    useEffect(() => {
        const fetchResult = async () => {
            const data = await getScore(apiRequest)
            setCpuResult(data.cpU_1)
            setGpuResult(data.gpU_1)
            setRamResult(data.raM_1)
            setStorageResult(data.storage_1)
            setTotalResult(data.totalBenchmark_1)

            setCpuResult2(data.cpU_2)
            setGpuResult2(data.gpU_2)
            setRamResult2(data.raM_2)
            setStorageResult2(data.storage_2)
            setTotalResult2(data.totalBenchmark_2)
        }

        fetchResult()
    },[apiRequest])

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
        <div className="flex flex-col items-center mx-auto w-full mt-20 space-y-10">
            <h1 className="text-4xl font-bold mb-8">Benchmark Results Comparison</h1>

            {/* Comparison Table */}
            <div className="w-2/3 bg-white shadow-lg rounded-lg p-6">
                <table className="w-full table-auto text-center">
                    <thead>
                        <tr>
                            <th className="text-xl font-semibold py-2">Component</th>
                            <th className="text-xl font-semibold py-2">PC 1</th>
                            <th className="text-xl font-semibold py-2">Difference</th>
                            <th className="text-xl font-semibold py-2">PC 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { name: "Total Benchmark", value1: totalResult, value2: totalResult2 },
                            { name: "CPU", value1: cpuResult, value2: cpuResult2 },
                            { name: "GPU", value1: gpuResult, value2: gpuResult2 },
                            { name: "RAM", value1: ramResult, value2: ramResult2 },
                            { name: "Storage", value1: storageResult, value2: storageResult2 },
                        ].map((item) => {
                            const roundedValue1 = Math.round(item.value1);
                            const roundedValue2 = Math.round(item.value2);
                            const difference = roundedValue1 - roundedValue2;
                            const isPositive = difference >= 0;

                            return (
                                <tr key={item.name} className="border-t">
                                    <td className="py-4 text-lg font-medium">{item.name}</td>
                                    <td className="py-4 text-lg">{roundedValue1}</td>
                                    <td
                                        className={`py-4 text-lg font-semibold ${
                                            isPositive ? "text-green-500" : "text-red-500"
                                        }`}
                                    >
                                        {difference > 0 ? `+${difference}` : difference}%
                                    </td>
                                    <td className="py-4 text-lg">{roundedValue2}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Go Back Button */}
            <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                onClick={goBack}
            >
                Go Back
            </button>
        </div>


    );
}
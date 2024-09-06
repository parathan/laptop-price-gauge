"use client"

import { useRouter } from "next/navigation";
import { useBenchmarkContext } from "@/context/BenchmarkContext";
import { Component } from "@/interfaces/components";

export default function FormComponent({ data }: any) {

    const router = useRouter();

    const { cpuBenchmark, setCpuBenchmark, gpuBenchmark, setGpuBenchmark, ssdBenchmark, setSsdBenchmark, hddBenchmark, setHddBenchmark, ramBenchmark, setRamBenchmark } = useBenchmarkContext();

    function submit() {
        console.log(cpuBenchmark, gpuBenchmark, ssdBenchmark, hddBenchmark, ramBenchmark)

        router.push('/results')
    }

    const renderSelect = (label: string, options: Component[], set: any) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
            onChange={(e) => set(e.target.value)}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
            <option>Please select a {label}</option>
            {options.map((option) => (
                <option key={option.id} value={option.benchmark}>
                {option.brand} {option.model}
                </option>
            ))}
            </select>
        </div>
    );

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">PC Parts Selection</h2>
            
            {renderSelect("CPU", data.CPU, setCpuBenchmark)}
            {renderSelect("GPU", data.GPU, setGpuBenchmark)}
            {renderSelect("SSD", data.SSD, setSsdBenchmark)}
            {renderSelect("HDD", data.HDD, setHddBenchmark)}
            {renderSelect("RAM", data.RAM, setRamBenchmark)}

            <button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                onClick={submit}
            >
                Check Value
            </button>
        </div>
    );
}
"use client"

import { useRouter } from "next/navigation";
import { useBenchmarkContext } from "@/context/BenchmarkContext";
import { Component } from "@/interfaces/components";
import ComponentInput from "./componentInput";
import { useState } from "react";
import React from 'react';

export default function FormComponent({ data }: any) {

    const router = useRouter();

    const {
        cpuBenchmark, setCpuBenchmark, 
        gpuBenchmark, setGpuBenchmark,
        storageBenchmark, setStorageBenchmark,
        storageCount, setStorageCount, 
        ramBenchmark, setRamBenchmark,
        category, setCategory,
        cpuBenchmark2, setCpuBenchmark2,
        gpuBenchmark2, setGpuBenchmark2,
        storageBenchmark2, setStorageBenchmark2,
        storageCount2, setStorageCount2,
        ramBenchmark2, setRamBenchmark2,
    } = useBenchmarkContext();

    const [errors, setErrors] = useState<any>({});

    const validate = () => {
        let tempErrors: any = {};
        // First PC validation
        if (!cpuBenchmark || cpuBenchmark === `Please select a CPU`) tempErrors.cpu = "CPU is required";
        if (!gpuBenchmark || gpuBenchmark === `Please select a GPU`) tempErrors.gpu = "GPU is required";
        if (!ramBenchmark || ramBenchmark === `Please select a RAM`) tempErrors.ram = "RAM is required";
        if (!category || category === `Please select a Category`) tempErrors.category = "Category is required";
        
        // Second PC validation
        if (!cpuBenchmark2 || cpuBenchmark2 === `Please select a CPU`) tempErrors.cpu2 = "CPU for PC 2 is required";
        if (!gpuBenchmark2 || gpuBenchmark2 === `Please select a GPU`) tempErrors.gpu2 = "GPU for PC 2 is required";
        if (!ramBenchmark2 || ramBenchmark2 === `Please select a RAM`) tempErrors.ram2 = "RAM for PC 2 is required";
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    function submit() {
        if (validate()) {
            console.log("PC 1:", cpuBenchmark, gpuBenchmark, ramBenchmark);
            console.log("PC 2:", cpuBenchmark2, gpuBenchmark2, ramBenchmark2);
            console.log("Category:", category);
            router.push("/results");
        }
        else {
            console.log("not valid");
        }
    }

    function setOption(setBenchmark: any, e: any) {
        setBenchmark(e.target.value); // Set the selected benchmark value
    }

    function addStorageInput(num: number) {
        if (num == 1) {
            setStorageBenchmark([...storageBenchmark, ""]);
        } else if (num == 2) {
            setStorageBenchmark2([...storageBenchmark2, ""]);
        }
    }

    function updateStorage(index: number, value: string) {
        
    }

    const renderCategory = (
        label: string, 
        options: string[], 
        category: string, 
        setCategory: any
    ) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
                onChange={(e) => setOption(setCategory, e)}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={category}
            >
            <option>Please select a {label}</option>
            {options.map((option) => (
                <option key={option} value={option}>
                {option}
                </option>
            ))}
            </select>
            {errors[label.toLowerCase()] && <p className="text-red-500 text-xs mt-1">{errors[label.toLowerCase()]}</p>}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6">
            {/* Flex container for PC sections */}
            <div className="flex justify-between">
                {/* PC 1 Section */}
                <div className="w-1/2 bg-gray-100 shadow-md rounded-lg overflow-hidden p-6 mr-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">PC 1 Parts Selection</h2>
                    
                    <ComponentInput label="CPU" options={data.CPU} benchmark={cpuBenchmark} setBenchmark={setCpuBenchmark} />
                    <ComponentInput label="GPU" options={data.GPU} benchmark={gpuBenchmark} setBenchmark={setGpuBenchmark} />
                    <ComponentInput label="RAM" options={data.RAM} benchmark={ramBenchmark} setBenchmark={setRamBenchmark} />
                    {storageBenchmark.map((storage, index) => (
                        <div key={storage}>
                            <ComponentInput label={`Storage ${index + 1}`} options={data.Storage} benchmark={storage} setBenchmark={setStorageBenchmark} />
                        </div>
                    ))}
                    <button
                        className="mt-2 text-indigo-600 hover:text-indigo-800 focus:outline-none flex items-center space-x-1 mb-4"
                        onClick={() => addStorageInput(1)}
                    >
                        Add Additional Storage
                    </button>
                </div>

                {/* PC 2 Section */}
                <div className="w-1/2 bg-gray-100 shadow-md rounded-lg overflow-hidden p-6 ml-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">PC 2 Parts Selection</h2>
                    
                    <ComponentInput label="CPU" options={data.CPU} benchmark={cpuBenchmark2} setBenchmark={setCpuBenchmark2} />
                    <ComponentInput label="GPU" options={data.GPU} benchmark={gpuBenchmark2} setBenchmark={setGpuBenchmark2} />
                    <ComponentInput label="RAM" options={data.RAM} benchmark={ramBenchmark2} setBenchmark={setRamBenchmark2} />
                    {storageBenchmark2.map((storage, index) => (
                        <div key={storage}>
                            <ComponentInput label={`Storage ${index + 1}`} options={data.Storage} benchmark={storage} setBenchmark={setStorageBenchmark2} />
                        </div>
                    ))}
                    
                    <button
                        className="mt-2 text-indigo-600 hover:text-indigo-800 focus:outline-none flex items-center space-x-1 mb-4"
                        onClick={() => addStorageInput(2)}
                    >
                        Add Additional Storage
                    </button>
                </div>
            </div>

            {/* Category selection and submit button at the bottom */}
            <div className="mt-8">
                {renderCategory("Category", data.Categories, category, setCategory)}

                <button 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    onClick={submit}
                >
                    Check Value
                </button>
            </div>
        </div>
    );
}
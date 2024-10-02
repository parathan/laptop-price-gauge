"use client"

import { useRouter } from "next/navigation";
import { useBenchmarkContext } from "@/context/BenchmarkContext";
import { Component } from "@/interfaces/components";
import { useState } from "react";
import React from 'react';

export default function FormComponent({ data }: any) {

    const router = useRouter();

    const {
        cpuBenchmark, setCpuBenchmark, 
        gpuBenchmark, setGpuBenchmark, 
        ssdBenchmark, setSsdBenchmark, 
        hddBenchmark, setHddBenchmark, 
        ramBenchmark, setRamBenchmark,
        ssdStorage, setSsdStorage, 
        category, setCategory,
        cpuBenchmark2, setCpuBenchmark2,
        gpuBenchmark2, setGpuBenchmark2,
        ssdBenchmark2, setSsdBenchmark2,
        hddBenchmark2, setHddBenchmark2,
        ramBenchmark2, setRamBenchmark2,
        ssdStorage2, setSsdStorage2,
    } = useBenchmarkContext();

    const [errors, setErrors] = useState<any>({});

    const validate = () => {
        let tempErrors: any = {};
        // First PC validation
        if (!cpuBenchmark || cpuBenchmark === `Please select a CPU`) tempErrors.cpu = "CPU is required";
        if (!gpuBenchmark || gpuBenchmark === `Please select a GPU`) tempErrors.gpu = "GPU is required";
        if (ssdStorage && (!ssdBenchmark || ssdBenchmark === `Please select a SSD`)) tempErrors.ssd = "SSD is required";
        if (!ssdStorage && (!hddBenchmark || hddBenchmark === `Please select a HDD`)) tempErrors.hdd = "HDD is required";
        if (!ramBenchmark || ramBenchmark === `Please select a RAM`) tempErrors.ram = "RAM is required";
        if (!category || category === `Please select a Category`) tempErrors.category = "Category is required";
        
        // Second PC validation
        if (!cpuBenchmark2 || cpuBenchmark2 === `Please select a CPU`) tempErrors.cpu2 = "CPU for PC 2 is required";
        if (!gpuBenchmark2 || gpuBenchmark2 === `Please select a GPU`) tempErrors.gpu2 = "GPU for PC 2 is required";
        if (ssdStorage2 && (!ssdBenchmark2 || ssdBenchmark2 === `Please select a SSD`)) tempErrors.ssd2 = "SSD for PC 2 is required";
        if (!ssdStorage2 && (!hddBenchmark2 || hddBenchmark2 === `Please select a HDD`)) tempErrors.hdd2 = "HDD for PC 2 is required";
        if (!ramBenchmark2 || ramBenchmark2 === `Please select a RAM`) tempErrors.ram2 = "RAM for PC 2 is required";
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    function submit() {
        if (validate()) {
            console.log("PC 1:", cpuBenchmark, gpuBenchmark, ssdBenchmark, hddBenchmark, ramBenchmark, ssdStorage, category);
            console.log("PC 2:", cpuBenchmark2, gpuBenchmark2, ssdBenchmark2, hddBenchmark2, ramBenchmark2, ssdStorage2);
            router.push("/results");
        }
        else {
            console.log("not valid");
        }
    }

    function setOption(setBenchmark: any, e: any) {
        setBenchmark(e.target.value); // Set the selected benchmark value
    }

    const renderSelect = (
        label: string, 
        options: Component[], 
        benchmark: string, 
        setBenchmark: any, 
        disabled: boolean = false
      ) => (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <select
            onChange={(e) => setOption(setBenchmark, e)}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            disabled={disabled}
            value={benchmark}
          >
            <option>Please select a {label}</option>
            {options.map((option) => (
              <option key={option.id} value={option.benchmark}>
                {option.brand} {option.model}
              </option>
            ))}
          </select>
          {errors[label.toLowerCase()] && <p className="text-red-500 text-xs mt-1">{errors[label.toLowerCase()]}</p>}
        </div>
      );

    const renderCategory = (label: string, options: string[], category: string, setCategory: any) => (
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

    const handleStorageTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSsdStorage(event.target.checked);
        if (event.target.checked) {
            setHddBenchmark('');
        } else {
            setSsdBenchmark('');
        }
    };

    const handleStorageTypeChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSsdStorage2(event.target.checked);
        if (event.target.checked) {
            setHddBenchmark2('');
        } else {
            setSsdBenchmark2('');
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6">
            {/* Flex container for PC sections */}
            <div className="flex justify-between">
                {/* PC 1 Section */}
                <div className="w-1/2 bg-gray-100 shadow-md rounded-lg overflow-hidden p-6 mr-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">PC 1 Parts Selection</h2>
                    
                    {renderSelect("CPU", data.CPU, cpuBenchmark, setCpuBenchmark)}
                    {renderSelect("GPU", data.GPU, gpuBenchmark, setGpuBenchmark)}

                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={ssdStorage}
                                onChange={handleStorageTypeChange}
                                className="form-checkbox h-5 w-5 text-indigo-600"
                            />
                            <span className="ml-2 text-sm text-gray-700">Use SSD (uncheck for HDD)</span>
                        </label>
                    </div>

                    {renderSelect("SSD", data.SSD, ssdBenchmark, setSsdBenchmark, !ssdStorage)}
                    {renderSelect("HDD", data.HDD, hddBenchmark, setHddBenchmark, ssdStorage)}
                    {renderSelect("RAM", data.RAM, ramBenchmark, setRamBenchmark)}
                </div>

                {/* PC 2 Section */}
                <div className="w-1/2 bg-gray-100 shadow-md rounded-lg overflow-hidden p-6 ml-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">PC 2 Parts Selection</h2>
                    
                    {renderSelect("CPU", data.CPU, cpuBenchmark2, setCpuBenchmark2)}
                    {renderSelect("GPU", data.GPU, gpuBenchmark2, setGpuBenchmark2)}

                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={ssdStorage2}
                                onChange={(e) => handleStorageTypeChange2(e)}
                                className="form-checkbox h-5 w-5 text-indigo-600"
                            />
                            <span className="ml-2 text-sm text-gray-700">Use SSD (uncheck for HDD)</span>
                        </label>
                    </div>

                    {renderSelect("SSD", data.SSD, ssdBenchmark2, setSsdBenchmark2, !ssdStorage2)}
                    {renderSelect("HDD", data.HDD, hddBenchmark2, setHddBenchmark2, ssdStorage2)}
                    {renderSelect("RAM", data.RAM, ramBenchmark2, setRamBenchmark2)}
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
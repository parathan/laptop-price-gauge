"use client"

import { useRouter } from "next/navigation";
import { useBenchmarkContext } from "@/context/BenchmarkContext";
import { Component } from "@/interfaces/components";
import { useState } from "react";

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
        cpuKey, setCpuKey,
        gpuKey, setGpuKey,
        ssdKey, setSsdKey,
        hddKey, setHddKey,
        ramKey, setRamKey,
        categoryKey, setCategoryKey 
    } = useBenchmarkContext();

    const [errors, setErrors] = useState<any>({});

    const validate = () => {
        let tempErrors: any = {};
        if (!cpuBenchmark || cpuBenchmark === `Please select a CPU`) tempErrors.cpu = "CPU is required";
        if (!gpuBenchmark || gpuBenchmark === `Please select a GPU`) tempErrors.gpu = "GPU is required";
        if (ssdStorage && (!ssdBenchmark || ssdBenchmark === `Please select a SSD`)) tempErrors.ssd = "SSD is required";
        if (!ssdStorage && (!hddBenchmark || hddBenchmark === `Please select a HDD`)) tempErrors.hdd = "HDD is required";
        if (!ramBenchmark || ramBenchmark === `Please select a RAM`) tempErrors.ram = "RAM is required";
        if (!category || category === `Please select a Category`) tempErrors.category = "Category is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    function submit() {
        if (validate()) {
            console.log(cpuBenchmark, gpuBenchmark, ssdBenchmark, hddBenchmark, ramBenchmark, ssdStorage, category);
            router.push("/results");
        }
    }

    function setOption(setBenchmark: any, setKey: any, e: any) {
        setBenchmark(e.target.value); // Set the selected benchmark value
        setKey(e.target.options[e.target.selectedIndex].key); // Set the key separately
    }

    const renderSelect = (
        label: string, 
        options: Component[], 
        benchmark: string, 
        setBenchmark: any, 
        setKey: any, 
        key: string, 
        disabled: boolean = false
      ) => (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <select
            onChange={(e) => setOption(setBenchmark, setKey, e)}
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

    const renderCategory = (label: string, options: string[], category: string, setCategory: any, setKey: any, key: string) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
                onChange={(e) => setOption(setCategory, setKey, e)}
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

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">PC Parts Selection</h2>
            
            {renderSelect("CPU", data.CPU, cpuBenchmark,setCpuBenchmark, setCpuKey, cpuKey)}
            {renderSelect("GPU", data.GPU, gpuBenchmark, setGpuBenchmark, setGpuKey, gpuKey)}

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

            {renderSelect("SSD", data.SSD, ssdBenchmark, setSsdBenchmark, setSsdKey, ssdKey, !ssdStorage)}
            {renderSelect("HDD", data.HDD, hddBenchmark, setHddBenchmark, setHddKey, hddKey, ssdStorage)}
            {renderSelect("RAM", data.RAM, ramBenchmark, setRamBenchmark, setRamKey, ramKey)}
            {renderCategory("Category", data.Categories, category, setCategory, setCategoryKey, categoryKey)}

            <button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                onClick={submit}
            >
                Check Value
            </button>
        </div>
    );
}
"use client";

import { useRouter } from "next/navigation";
import { useBenchmarkContext } from "@/context/BenchmarkContext";
import ComponentInput from "./componentInput";
import { Errors } from "@/interfaces/errors";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getAfterHyphen, getBeforeHyphen, getStorageValue } from "@/util/util";
import { APIStorageContext } from "@/interfaces/context";

export default function FormComponent({ data }: any) {
    const router = useRouter();

    const {
        cpuBenchmark, setCpuBenchmark,
        gpuBenchmark, setGpuBenchmark,
        storageBenchmark, setStorageBenchmark,
        ramBenchmark, setRamBenchmark,
        category, setCategory,
        cpuBenchmark2, setCpuBenchmark2,
        gpuBenchmark2, setGpuBenchmark2,
        storageBenchmark2, setStorageBenchmark2,
        ramBenchmark2, setRamBenchmark2,
        setApiRequest
    } = useBenchmarkContext();

    const [errors, setErrors] = useState<Errors>({
        status: false,
        cpu: "",
        gpu: "",
        ram: "",
        storage: [],
        category: "",
        cpu2: "",
        gpu2: "",
        ram2: "",
        storage2: [],
    });

    const validateFields = (benchmark: string, label: string) =>
        benchmark && benchmark !== `Please select a ${label}` ? "" : `${label} is required`;

    const validateStorage = (storageList: any[]) =>
        storageList.map(storage =>
            storage.value && storage.value !== "Please select a Storage"
                ? ""
                : "Storage is required"
        );

    const validate = () => {
        const newErrors: Errors = {
            status: false,
            cpu: validateFields(cpuBenchmark, "CPU"),
            gpu: validateFields(gpuBenchmark, "GPU"),
            ram: validateFields(ramBenchmark, "RAM"),
            category: validateFields(category, "Category"),
            cpu2: validateFields(cpuBenchmark2, "CPU"),
            gpu2: validateFields(gpuBenchmark2, "GPU"),
            ram2: validateFields(ramBenchmark2, "RAM"),
            storage: validateStorage(storageBenchmark),
            storage2: validateStorage(storageBenchmark2),
        };

        newErrors.status = Object.values(newErrors).some(
            error =>
                (typeof error === "string" && error) ||
                (Array.isArray(error) && error.some(e => e))
        );

        setErrors(newErrors);
        return !newErrors.status;
    };

    const handleSubmit = () => {
        if (validate()) {
            populateApiRequest();
            router.push("/results");
        } else {
            console.error("Validation failed", errors);
        }
    };

    const populateApiRequest = () => {
        const mapStorage = (storageList: any[]) =>
            storageList.map(storage => {
                const id = parseInt(getBeforeHyphen(storage.value));
                const storageObj = data.Storage.find((s: any) => s.id === id);
                return {
                    benchmark: getAfterHyphen(storage.value),
                    size: String(getStorageValue(storageObj?.model)),
                };
            });

        setApiRequest({
            cpu1: getAfterHyphen(cpuBenchmark),
            gpu1: getAfterHyphen(gpuBenchmark),
            ram1: getAfterHyphen(ramBenchmark),
            storage1: mapStorage(storageBenchmark),
            cpu2: getAfterHyphen(cpuBenchmark2),
            gpu2: getAfterHyphen(gpuBenchmark2),
            ram2: getAfterHyphen(ramBenchmark2),
            storage2: mapStorage(storageBenchmark2),
            category,
        });
    };

    const addStorageInput = (setStorage: any) => {
        setStorage((prev: any) => [...prev, { id: uuidv4(), value: "" }]);
    };

    const updateStorageItem = (setStorage: any, index: number, newValue: string) => {
        setStorage((prev: any) => {
            const updated = [...prev];
            updated[index].value = newValue;
            return updated;
        });
    };

    const removeStorageItem = (setStorage: any, index: number) => {
        setStorage((prev: any) => prev.filter((_: any, i: any) => i !== index));
    };

    const renderStorageInputs = (
        storageList: any[],
        setStorage: any,
        errorList: string[]
    ) =>
        storageList.map((storage, index) => (
            <ComponentInput
                key={storage.id}
                label={`Storage ${index + 1}`}
                options={data.Storage}
                benchmark={storage.value}
                setBenchmark={(value: string) => updateStorageItem(setStorage, index, value)}
                error={errorList[index] || ""}
                removable={index > 0}
                removeFunction={() => removeStorageItem(setStorage, index)}
            />
        ));

    const renderCategory = () => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
                onChange={e => setCategory(e.target.value)}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={category}
            >
                <option>Please select a Category</option>
                {data.Categories.map((option: string) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6">
            <div className="flex justify-between">
                {[1, 2].map(num => (
                    <div
                        key={num}
                        className="w-1/2 bg-gray-100 shadow-md rounded-lg overflow-hidden p-6 mx-4"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            PC {num} Parts Selection
                        </h2>
                        <ComponentInput
                            label="CPU"
                            options={data.CPU}
                            benchmark={num === 1 ? cpuBenchmark : cpuBenchmark2}
                            setBenchmark={num === 1 ? setCpuBenchmark : setCpuBenchmark2}
                            error={num === 1 ? errors.cpu : errors.cpu2}
                            removable={false}
                            removeFunction={() => {}}
                        />
                        <ComponentInput
                            label="GPU"
                            options={data.GPU}
                            benchmark={num === 1 ? gpuBenchmark : gpuBenchmark2}
                            setBenchmark={num === 1 ? setGpuBenchmark : setGpuBenchmark2}
                            error={num === 1 ? errors.gpu : errors.gpu2}
                            removable={false}
                            removeFunction={() => {}}
                        />
                        <ComponentInput
                            label="RAM"
                            options={data.RAM}
                            benchmark={num === 1 ? ramBenchmark : ramBenchmark2}
                            setBenchmark={num === 1 ? setRamBenchmark : setRamBenchmark2}
                            error={num === 1 ? errors.ram : errors.ram2}
                            removable={false}
                            removeFunction={() => {}}
                        />
                        {renderStorageInputs(
                            num === 1 ? storageBenchmark : storageBenchmark2,
                            num === 1 ? setStorageBenchmark : setStorageBenchmark2,
                            num === 1 ? errors.storage : errors.storage2
                        )}
                        <button
                            className="mt-2 text-indigo-600 hover:text-indigo-800 focus:outline-none flex items-center space-x-1 mb-4"
                            onClick={() => addStorageInput(num === 1 ? setStorageBenchmark : setStorageBenchmark2)}
                        >
                            Add Additional Storage
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                {renderCategory()}
                <button
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

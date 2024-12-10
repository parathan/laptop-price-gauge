"use client";

import { createContext, useContext, useState } from "react";
import { BenchmarkContextProps } from "@/interfaces/context";

import { v4 as uuidv4 } from 'uuid';

const BenchmarkContext = createContext<BenchmarkContextProps | null>(null);

/**
 * Provides the state and functions to update the state for the benchmark results.
 * The state includes the benchmark for the CPU, GPU, SSD, HDD, RAM, and category for the first and second PC.
 * The storage benchmark is an array of strings, and the storage count is the number of items in the array.
 * The ssdStorage is a boolean that indicates whether the storage benchmark is for an SSD or HDD.
 * The functions to update the state include setCpuBenchmark, setGpuBenchmark, setSsdBenchmark, setHddBenchmark, setRamBenchmark, setSsdStorage, setStorageBenchmark, setStorageCount, and setCategory.
 * The children of this component are the components that will use the state and functions provided by this context.
 */
export const BenchmarkContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    // First PC state
    const [cpuBenchmark, setCpuBenchmark] = useState("");
    const [gpuBenchmark, setGpuBenchmark] = useState("");
    const [storageBenchmark, setStorageBenchmark] = useState([
        {
            id: uuidv4(),
            value: "",
        }
    ]);
    const [ramBenchmark, setRamBenchmark] = useState("");

    // Category state
    const [category, setCategory] = useState("");

    // Second PC state
    const [cpuBenchmark2, setCpuBenchmark2] = useState("");
    const [gpuBenchmark2, setGpuBenchmark2] = useState("");
    const [storageBenchmark2, setStorageBenchmark2] = useState([
        {
            id: uuidv4(),
            value: "",
        }
    ]);
    const [ramBenchmark2, setRamBenchmark2] = useState("");

    return (
        <BenchmarkContext.Provider
            value={{
                cpuBenchmark,
                setCpuBenchmark,
                gpuBenchmark,
                setGpuBenchmark,
                ramBenchmark,
                setRamBenchmark,
                storageBenchmark,
                setStorageBenchmark,
                category,
                setCategory,
                cpuBenchmark2,
                setCpuBenchmark2,
                gpuBenchmark2,
                setGpuBenchmark2,
                ramBenchmark2,
                setRamBenchmark2,
                storageBenchmark2,
                setStorageBenchmark2
            }}
        >
            {children}
        </BenchmarkContext.Provider>
    );
};

export const useBenchmarkContext = () => {
    const context = useContext(BenchmarkContext);
    if (!context) {
        throw new Error("useBenchmarkContext must be used within a BenchmarkContextProvider");
    }
    return context;
};
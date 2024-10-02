"use client";

import { createContext, useContext, useState } from "react";
import { BenchmarkContextProps } from "@/interfaces/context";

const BenchmarkContext = createContext<BenchmarkContextProps | null>(null);

export const BenchmarkContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    // First PC state
    const [cpuBenchmark, setCpuBenchmark] = useState("");
    const [gpuBenchmark, setGpuBenchmark] = useState("");
    const [ssdBenchmark, setSsdBenchmark] = useState("");
    const [hddBenchmark, setHddBenchmark] = useState("");
    const [ramBenchmark, setRamBenchmark] = useState("");
    const [ssdStorage, setSsdStorage] = useState(false);
    const [category, setCategory] = useState("");

    // Second PC state
    const [cpuBenchmark2, setCpuBenchmark2] = useState("");
    const [gpuBenchmark2, setGpuBenchmark2] = useState("");
    const [ssdBenchmark2, setSsdBenchmark2] = useState("");
    const [hddBenchmark2, setHddBenchmark2] = useState("");
    const [ramBenchmark2, setRamBenchmark2] = useState("");
    const [ssdStorage2, setSsdStorage2] = useState(false);

    return (
        <BenchmarkContext.Provider
            value={{
                cpuBenchmark,
                setCpuBenchmark,
                gpuBenchmark,
                setGpuBenchmark,
                ssdBenchmark,
                setSsdBenchmark,
                hddBenchmark,
                setHddBenchmark,
                ramBenchmark,
                setRamBenchmark,
                ssdStorage,
                setSsdStorage,
                category,
                setCategory,
                cpuBenchmark2,
                setCpuBenchmark2,
                gpuBenchmark2,
                setGpuBenchmark2,
                ssdBenchmark2,
                setSsdBenchmark2,
                hddBenchmark2,
                setHddBenchmark2,
                ramBenchmark2,
                setRamBenchmark2,
                ssdStorage2,
                setSsdStorage2,
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
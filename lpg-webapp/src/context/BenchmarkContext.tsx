"use client"

import { createContext, useContext, useState } from "react";
import { BenchmarkContextProps } from "@/interfaces/context";

const BenchmarkContext = createContext<BenchmarkContextProps | null>(null);

export const BenchmarkContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [cpuBenchmark, setCpuBenchmark] = useState("");
    const [gpuBenchmark, setGpuBenchmark] = useState("");
    const [ssdBenchmark, setSsdBenchmark] = useState("");
    const [hddBenchmark, setHddBenchmark] = useState("");
    const [ramBenchmark, setRamBenchmark] = useState("");

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
}
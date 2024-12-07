export interface BenchmarkContextProps {
    cpuBenchmark: string;
    setCpuBenchmark: (value: string) => void;
    gpuBenchmark: string;
    setGpuBenchmark: (value: string) => void;
    ramBenchmark: string;
    setRamBenchmark: (value: string) => void;
    storageBenchmark: string[];
    setStorageBenchmark: (value: string[]) => void;
    storageCount: number;
    setStorageCount: (value: number) => void;
    category: string;
    setCategory: (value: string) => void;
    cpuBenchmark2: string;
    setCpuBenchmark2: (value: string) => void;
    gpuBenchmark2: string;
    setGpuBenchmark2: (value: string) => void;
    ramBenchmark2: string;
    setRamBenchmark2: (value: string) => void;
    storageBenchmark2: string[];
    setStorageBenchmark2: (value: string[]) => void;
    storageCount2: number;
    setStorageCount2: (value: number) => void;
} 
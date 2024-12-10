export interface BenchmarkContextProps {
    cpuBenchmark: string;
    setCpuBenchmark: (value: string) => void;
    gpuBenchmark: string;
    setGpuBenchmark: (value: string) => void;
    ramBenchmark: string;
    setRamBenchmark: (value: string) => void;
    storageBenchmark: StorageContext[];
    setStorageBenchmark: (value: StorageContext[]) => void;
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
    storageBenchmark2: StorageContext[];
    setStorageBenchmark2: (value: StorageContext[]) => void;
    storageCount2: number;
    setStorageCount2: (value: number) => void;
} 

export interface StorageContext {
    id: string;
    value: string;
}
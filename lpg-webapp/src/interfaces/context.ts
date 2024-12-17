export interface BenchmarkContextProps {
    cpuBenchmark: string;
    setCpuBenchmark: (value: string) => void;
    gpuBenchmark: string;
    setGpuBenchmark: (value: string) => void;
    ramBenchmark: string;
    setRamBenchmark: (value: string) => void;
    storageBenchmark: StorageContext[];
    setStorageBenchmark: (value: StorageContext[]) => void;
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
    apiRequest: APIContext;
    setApiRequest: (value: APIContext) => void;
} 

export interface StorageContext {
    id: string;
    value: string;
}

export interface APIContext {
    cpu1: string;
    gpu1: string;
    ram1: string;
    storage1: APIStorageContext[];
    
    cpu2: string;
    gpu2: string;
    ram2: string;
    storage2: APIStorageContext[];

    category: string;
}

export interface APIStorageContext {
    benchmark: string;
    size: string;
}

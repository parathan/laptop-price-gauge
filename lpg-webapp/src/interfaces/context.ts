export interface BenchmarkContextProps {
    cpuBenchmark: string,
    setCpuBenchmark: (cpu: string) => void,
    gpuBenchmark: string,
    setGpuBenchmark: (gpu: string) => void,
    ssdBenchmark: string,
    setSsdBenchmark: (ssd: string) => void,
    hddBenchmark: string,
    setHddBenchmark: (hdd: string) => void,
    ramBenchmark: string,
    setRamBenchmark: (ram: string) => void,
    ssdStorage: boolean,
    setSsdStorage: (ssd: boolean) => void,
    category: string,
    setCategory: (category: string) => void,
    cpuKey: string,
    setCpuKey: (cpuKey: string) => void
    gpuKey: string,
    setGpuKey: (gpuKey: string) => void
    ssdKey: string,
    setSsdKey: (ssdKey: string) => void
    hddKey: string,
    setHddKey: (hddKey: string) => void
    ramKey: string,
    setRamKey: (ramKey: string) => void
    categoryKey: string,
    setCategoryKey: (categoryKey: string) => void
} 
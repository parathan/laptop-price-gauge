"use client"

import { useRouter } from "next/navigation";
import { useBenchmarkContext } from "@/context/BenchmarkContext";

export default function FormComponent({ data }: any) {

    const router = useRouter();

    const { cpuBenchmark, setCpuBenchmark, gpuBenchmark, setGpuBenchmark, ssdBenchmark, setSsdBenchmark, hddBenchmark, setHddBenchmark, ramBenchmark, setRamBenchmark } = useBenchmarkContext();

    function submit() {
        console.log(cpuBenchmark, gpuBenchmark, ssdBenchmark, hddBenchmark, ramBenchmark)

        router.push('/results')
    }

    return (
        <div>
            <label className="text-2xl">CPUs</label>
            <select onChange={(e) => setCpuBenchmark(e.target.value)}>
                <option>Please select a CPU</option>
                {data.CPU.map((cpu: any) => (
                    <option key={cpu.id} value={cpu.benchmark}>{cpu.brand} {cpu.model}</option>
                ))}
            </select>
            <br/>

            <label className="text-2xl">GPUs</label>
            <select onChange={(e) => setGpuBenchmark(e.target.value)}>
                <option>Please select a GPU</option>
                {data.GPU.map((gpu: any) => (
                    <option key={gpu.id} value={gpu.benchmark}>{gpu.brand} {gpu.model}</option>
                ))}
            </select>
            <br/>

            <label className="text-2xl">SSDs</label>
            <select onChange={(e) => setSsdBenchmark(e.target.value)}>
                <option>Please select a SSD</option>
                {data.SSD.map((ssd: any) => (
                    <option key={ssd.id} value={ssd.benchmark}>{ssd.brand} {ssd.model}</option>
                ))}
            </select>
            <br/>

            <label className="text-2xl">HDDs</label>
            <select onChange={(e) => setHddBenchmark(e.target.value)}>
                <option>Please select a HDD</option>
                {data.HDD.map((hdd: any) => (
                    <option key={hdd.id} value={hdd.benchmark}>{hdd.brand} {hdd.model}</option>
                ))}
            </select>
            <br/>

            <label className="text-2xl">Rams</label>
            <select onChange={(e) => setRamBenchmark(e.target.value)}>
                <option>Please select a RAM</option>
                {data.RAM.map((ram: any) => (
                    <option key={ram.id} value={ram.benchmark}>{ram.brand} {ram.model}</option>
                ))}
            </select>
            <br/> 

            <button 
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={submit}
            >
                Check Value
            </button>
        </div>
    )
}
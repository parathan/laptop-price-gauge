"use client"

import { useState } from "react"

export default function FormComponent({ data }: any) {

    console.log(data)

    const [cpus, setCpus] = useState(data.CPU)
    const [gpus, setGpus] = useState(data.GPU)
    const [ssds, setSsds] = useState(data.SSD)
    const [hdds, setHdds] = useState(data.HDD)
    const [rams, setRams] = useState(data.RAM)

    const [selectedCpu, setSelectedCpu] = useState("")
    const [selectedGpu, setSelectedGpu] = useState("")
    const [selectedSsd, setSelectedSsd] = useState("")
    const [selectedHdd, setSelectedHdd] = useState("")
    const [selectedRam, setSelectedRam] = useState("")

    function submit() {
        console.log(selectedCpu, selectedGpu, selectedSsd, selectedHdd, selectedRam)
    }

    return (
        <div>
            <label className="text-2xl">CPUs</label>
            <select onChange={(e) => setSelectedCpu(e.target.value)}>
                <option>Please select a CPU</option>
                {cpus.map((cpu: any) => (
                    <option key={cpu.id} value={cpu.brand + " " + cpu.model}>{cpu.brand} {cpu.model}</option>
                ))}
            </select>
            <br/>

            <label className="text-2xl">GPUs</label>
            <select onChange={(e) => setSelectedGpu(e.target.value)}>
                <option>Please select a GPU</option>
                {gpus.map((gpu: any) => (
                    <option key={gpu.id} value={gpu.brand + " " + gpu.model}>{gpu.brand} {gpu.model}</option>
                ))}
            </select>
            <br/>

            <label className="text-2xl">SSDs</label>
            <select onChange={(e) => setSelectedSsd(e.target.value)}>
                <option>Please select a SSD</option>
                {ssds.map((ssd: any) => (
                    <option key={ssd.id} value={ssd.brand + " " + ssd.model}>{ssd.brand} {ssd.model}</option>
                ))}
            </select>
            <br/>

            <label className="text-2xl">HDDs</label>
            <select onChange={(e) => setSelectedHdd(e.target.value)}>
                <option>Please select a HDD</option>
                {hdds.map((hdd: any) => (
                    <option key={hdd.id} value={hdd.brand + " " + hdd.model}>{hdd.brand} {hdd.model}</option>
                ))}
            </select>
            <br/>

            <label className="text-2xl">Rams</label>
            <select onChange={(e) => setSelectedRam(e.target.value)}>
                <option>Please select a RAM</option>
                {rams.map((ram: any) => (
                    <option key={ram.id} value={ram.brand + " " + ram.model}>{ram.brand} {ram.model}</option>
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
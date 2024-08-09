"use client"

import { useState } from "react"

export default function FormComponent({ data }: any) {

    console.log(data)

    const [cpus, setCpus] = useState(data.CPU)
    const [gpus, setGpus] = useState(data.GPU)
    const [ssds, setSsds] = useState(data.SSD)
    const [hdds, setHdds] = useState(data.HDD)
    const [rams, setRams] = useState(data.RAM)

    function submit() {
        console.log("submit")
    }

    return (
        <div>
            <label className="text-2xl">CPUs</label>
            <select>
                <option>Please select a CPU</option>
                {cpus.map((cpu: any) => (
                    <option key={cpu.id} value={cpu.model}>{cpu.model}</option>
                ))}
            </select>
            <br/>

            <label className="text-2xl">GPUs</label>
            <select>
                <option>Please select a GPU</option>
                {gpus.map((gpu: any) => (
                    <option key={gpu.id} value={gpu.model}>{gpu.model}</option>
                ))}
            </select>
            <br/>

            <label className="text-2xl">SSDs</label>
            <select>
                <option>Please select a SSD</option>
                {ssds.map((ssd: any) => (
                    <option key={ssd.id} value={ssd.model}>{ssd.model}</option>
                ))}
            </select>
            <br/>

            <label className="text-2xl">HDDs</label>
            <select>
                <option>Please select a HDD</option>
                {hdds.map((hdd: any) => (
                    <option key={hdd.id} value={hdd.model}>{hdd.model}</option>
                ))}
            </select>
            <br/>

            <label className="text-2xl">Rams</label>
            <select>
                <option>Please select a RAM</option>
                {rams.map((ram: any) => (
                    <option key={ram.id} value={ram.model}>{ram.model}</option>
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
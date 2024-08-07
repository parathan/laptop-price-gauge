import FormComponent from "./formComponent"
import { ComponentList } from "@/interfaces/components"

async function getData() {
    // Request data
    const res = await fetch('http://localhost:5269/api', {cache: 'force-cache'})
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    let data = await res.json()
    
    // Seperate data by type
    var componentlist: ComponentList = {
        CPU: [],
        GPU: [],
        SSD: [],
        HDD: [],
        RAM: [],
    }
    for (let component of data) {
        switch (component.type) {
            case "CPU":
                componentlist.CPU.push(component)
                break
            case "GPU":
                componentlist.GPU.push(component)
                break
            case "SSD":
                componentlist.SSD.push(component)
                break
            case "HDD":
                componentlist.HDD.push(component)
                break
            case "RAM":
                componentlist.RAM.push(component)
                break
        }
    }
    return componentlist
}

export default async function Form() {
    const data = await getData()

    return (
        <div className="grid justify-items-center mx-auto w-1/3 mt-60 space-y-10">
            <FormComponent />
        </div>
    );
}
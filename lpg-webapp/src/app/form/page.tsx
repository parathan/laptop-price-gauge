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

/**
 * A Next.js page that displays a form to select laptop components.
 * 
 * The form is populated with data from the API, and the user's selection is
 * passed to the FormComponent as a prop.
 * 
 * @returns {JSX.Element} A JSX element representing the page.
 */
export default async function Form() {
    const data: ComponentList = await getData()

    return (
        <div className="grid justify-items-center mx-auto w-1/2 mt-60 space-y-10">
            <FormComponent data={data}/>
        </div>
    );
}
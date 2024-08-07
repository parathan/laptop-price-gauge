import FormComponent from "./formComponent"

async function getData() {
    const res = await fetch('http://localhost:5269/api', {cache: 'force-cache'})
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function Form() {
    const data = await getData()
    console.log(data)

    return (
        <div className="grid justify-items-center mx-auto w-1/3 mt-60 space-y-10">
            <FormComponent />
        </div>
    );
}
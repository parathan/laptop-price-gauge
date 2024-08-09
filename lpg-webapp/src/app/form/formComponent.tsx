"use client"

export default function FormComponent({ data }: any) {

    console.log(data)

    return (
        <div>
            <select>
                <option>Test Value 1</option>
                <option>Test Value 2</option>
            </select>
        </div>
    )
}
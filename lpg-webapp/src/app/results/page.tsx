"use client"
import React, { useState } from 'react'

export default function Results() {

    const [value, setValue] = useState(1000);

    return (
        <div className="grid justify-items-center mx-auto w-1/3 mt-60 space-y-10">
            <h1 className="text-3xl font-bold">Results</h1>
            <p className="text-center">
                The value of your laptop is ${value}
            </p>
        </div>
    );
}
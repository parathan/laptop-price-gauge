"use client"

import React, { useState } from "react";
import { Component } from "@/interfaces/components";

interface ComponentInputProps {
  label: string;
  options: Component[];
  benchmark: string;
  setBenchmark: any;
}

const ComponentInput: React.FC<ComponentInputProps> = ({
  label,
  options,
  benchmark,
  setBenchmark,
}) => {

    const [errors, setErrors] = useState<any>({});

    function setOption(e: React.ChangeEvent<HTMLSelectElement>) {
      setBenchmark(e.target.value); // Set the selected benchmark value
    }

    return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <select
            onChange={setOption}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={benchmark}
          >
            <option>Please select a {label}</option>
            {options.map((option) => (
              <option key={option.id} value={option.benchmark}>
                {option.brand} {option.model}
              </option>
            ))}
          </select>
          {errors[label.toLowerCase()] && <p className="text-red-500 text-xs mt-1">{errors[label.toLowerCase()]}</p>}
        </div>
    )
}

export default ComponentInput;
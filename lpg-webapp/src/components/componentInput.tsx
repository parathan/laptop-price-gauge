"use client"

import React, { useState } from "react";
import { Component } from "@/interfaces/components";
import { FaMinusCircle } from 'react-icons/fa';

interface ComponentInputProps {
  label: string;
  options: Component[];
  benchmark: string;
  setBenchmark: any;
  error: string;
  removable: boolean;
  removeFunction: () => void;
}

const ComponentInput: React.FC<ComponentInputProps> = ({
  label,
  options,
  benchmark,
  setBenchmark,
  error,
  removable,
  removeFunction
}) => {

    const [errors, setErrors] = useState<any>({});

    function setOption(e: React.ChangeEvent<HTMLSelectElement>) {
      setBenchmark(e.target.value); // Set the selected benchmark value
    }

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="flex items-center">
          <select
            onChange={setOption}
            className="flex-grow block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={benchmark}
          >
            <option>Please select a {label}</option>
            {options.map((option) => (
              <option key={option.id} value={`${option.id}-${option.benchmark}`}>
                {option.brand} {option.model}
              </option>
            ))}
          </select>
          {removable && 
            <button
              onClick={removeFunction}
              className="ml-2 p-2 text-red-500 bg-transparent rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              <FaMinusCircle size={20} />
            </button>
          }
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    )
}

export default ComponentInput;
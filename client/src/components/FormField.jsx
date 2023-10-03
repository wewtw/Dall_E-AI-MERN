import React from 'react'
import { preview } from '../assets'

const FormField = ({labelName, type, name, placeholder, value, 
  handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>

      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name}
        className='block text-sm font-medium text-gray-1000'>
          {labelName}
        </label>
       
      </div>
      <input
      type={type}
      id={name}
      name={name}
      className="bg-gray-50 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
     {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="font-semibold text-xs bg-[#000000] py-2 px-2 m-3 rounded-[5px] text-white"
        >
          Surprise me
        </button>
      )}
    
    </div>
  )
}

export default FormField
import React from 'react'

const Input = ({ type = "text", placeholder, ...props }) => {
    return (
        <>
            <input type={type} placeholder={placeholder} className="h-full outline-none p-2 rounded-none border border-gray-300 w-full" {...props} />
        </>
    )
}

export default Input
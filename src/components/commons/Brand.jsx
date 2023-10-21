import Image from 'next/image'
import React from 'react'

const Brand = ({width = 209, height = 60}) => {
    return (
        <Image src="https://www.fitstation.com.tr/Documents/adb3ce80-bcbc-4e2e-8f2d-29c9b4ed4601.png" width={width} height={height} />
    )
}

export default Brand
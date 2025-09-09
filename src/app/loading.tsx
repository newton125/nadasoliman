'use client'
import React from 'react';
import { Oval } from 'react-loader-spinner';

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-[90%]">
            <Oval
                height={60}
                width={60}
                color="#4fa94d"
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={4}
                strokeWidthSecondary={2}
            />
        </div>
    )
}

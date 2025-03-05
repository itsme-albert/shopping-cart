'use client';
import React, { useEffect, useState } from 'react'
import { FaOpencart } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function Login() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className='m-24'>
            {isClient && (
                <div className='m-24'>
                    <form className="max-w-sm mx-auto border p-5" onSubmit={(e) => { e.preventDefault(); router.push('/'); }}>
                        <div className="flex justify-center items-center text-center">
                            <FaOpencart className="text-9xl text-orange-600" />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" id="email" title="Email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" required />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" id="password" title="Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your password" required />
                        </div>
                        <button type="submit" className="text-white focus:ring-4 focus:outline-none font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-orange-600">Submit</button>
                    </form>
                </div>
            )}
        </div>
    )
}

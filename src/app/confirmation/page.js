"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Confirmation() {
    const router = useRouter();

    const handleReturnHome = () => {
        router.push('/'); // Redirect to the homepage
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
                <h1 className="text-2xl font-bold text-gray-800">Thank You for Your Order!</h1>
                <p className="mt-4 text-gray-600">
                    Your order has been successfully placed. We appreciate your business and hope you enjoy your snacks!
                </p>
                <div className="mt-6">
                    <button
                        onClick={handleReturnHome}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
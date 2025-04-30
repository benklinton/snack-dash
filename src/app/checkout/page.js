'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function CheckoutPage() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const router = useRouter();
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const getCartFromServer = async () => {
        const response = await fetch(`/api/cart?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch cart data');
        }
        return response.json();
    }

    useEffect(() => {
        if (!session) return;
        const fetchCart = async () => {
            try {
                const cartData = await getCartFromServer();
                setCart(cartData.items || []); // Assuming items is the array of cart items
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };
        fetchCart();
    }, [session]);

    useEffect(() => {
        const calculatedTotal = cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('$', ''))
            return sum + (price * item.quantity);
        }, 0);
        setTotal(calculatedTotal.toFixed(2)); // Format total to 2 decimal places
    }, [cart]);

    const handleConfirmCheckout = () => {
        // Clear the cart and redirect to a confirmation page
        setCart([]);
        router.push('/confirmation'); // Redirect to a confirmation page
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>

            {cart.length === 0 ? (
                <p className="mt-4 text-gray-500">Your cart is empty.</p>
            ) : (
                <>
                    <ul className="divide-y divide-gray-200 mt-6">
                        {cart.map((item, index) => (
                            <li key={index} className="flex items-center justify-between py-4">
                                <div className="flex items-center">
                                    <img
                                        src={item.imageSrc}
                                        alt={item.imageAlt}
                                        className="h-16 w-16 rounded-md object-cover"
                                    />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{item.price}</p>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 border-t border-gray-200 pt-4">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Total</p>
                            <p>${total}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleConfirmCheckout}
                            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Confirm Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
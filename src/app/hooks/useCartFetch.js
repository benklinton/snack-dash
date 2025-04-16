import { useState, useEffect } from "react";

export function useCartFetch(userId, session, loadingSession) {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(loadingSession || !session || !userId) return;
        const getCartFromServer = async () => {
            try {
                const response = await fetch(`/api/cart?userId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch cart data');
                }

                const data = await response.json();
                setCart(data.items || []); // Assuming items is the array of cart items
            } catch (error) {
                console.error('Error fetching cart:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        getCartFromServer();
    }, [userId, session, loadingSession]);

    return { cart, error, loading };
}
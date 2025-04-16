import { use, useEffect } from "react";

export function useCartSave(userId, cart) {
    useEffect(() => {
        const saveCartToServer = async () => {
            try {
                const response = await fetch('/api/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, items: cart }),
                });
                if (!response.ok) {
                    throw new Error('Failed to save cart');
                }
            } catch (error) {
                console.error('Error saving cart:', error);
            }
        };

        if (cart.length && userId !== null) {
            saveCartToServer();
        }
    }, [cart, userId]);
}
    
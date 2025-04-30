import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'bson';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { userId, items } = await req.json();

        if (!userId) {
            return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
        }

        // Validate and convert item IDs to ObjectId
        const validItems = items.map((item) => {
            return {
                itemId:  ObjectId.createFromTime(item.id),
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                description: item.description,
                imageSrc: item.imageSrc,
            };
        });

        // Upsert the cart for the user
        const cart = await prisma.cart.upsert({
            where: { userId },
            create: {
                userId,
                items: {
                    create: validItems,
                },
            },
            update: {
                items: {
                    deleteMany: {}, // Clear existing items
                    create: validItems,
                },
            },
        });
        return new Response(JSON.stringify(cart), { status: 200 });
    } catch (error) {
        console.error('Error saving cart:', error.message);
        return new Response(JSON.stringify({ error: error.message || 'Failed to save cart' }), { status: 500 });
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
        }

        // Retrieve the cart for the user
        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    select: {
                        itemId: true,
                        cartId: true,
                        name: true,
                        quantity: true,
                        price: true,
                        description: true,
                        imageSrc: true,
                    },
                },
            },
        });

        if (!cart) {
            return new Response(JSON.stringify({ message: 'Cart not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(cart), { status: 200 });
    } catch (error) {
        console.error('Error retrieving cart:', error);
        return new Response(JSON.stringify({ error: 'Failed to retrieve cart' }), { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { itemId } = await req.json();

        if (!itemId) {
            return new Response(JSON.stringify({ error: 'Item ID is required' }), { status: 400 });
        }

        // Find the cart item by itemId
        const cartItem = await prisma.cartItems.findFirst({
            where: { itemId },
        });

        if (!cartItem) {
            return new Response(JSON.stringify({ error: 'Item not found' }), { status: 404 });
        }

        // Delete the cart item using its unique id
        await prisma.cartItems.delete({
            where: { id: cartItem.id },
        });

        return new Response(JSON.stringify({ message: 'Item deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error deleting item from cart:', error);
        return new Response(JSON.stringify({ error: 'Failed to delete item from cart' }), { status: 500 });
    }
}
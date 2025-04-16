'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useSession } from 'next-auth/react'
import { useCartSave } from '../hooks/useCartSave'
import { useCartFetch } from '../hooks/useCartFetch'
const products = [
    {
        id: 1,
        name: 'Coca-Cola',
        quantity: 1,
        price: '$2.50',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/kGPhMxWx/coca-cola.jpg',
        imageAlt: 'cans of coca-cola',
    },
    {
        id: 2,
        name: 'Pepsico',
        quantity: 1,
        price: '$2.50',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/fRV7FV9Z/pepsi.jpg',
        imageAlt: 'cans of pepspi',
    },
    {
        id: 3,
        name: 'Mountain Dew',
        quantity: 1,
        price: '$2.50',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/3Nw0vqj7/mtn-dew.jpg',
        imageAlt: 'cans of mountain dew',
    },
    {
        id: 4,
        name: 'Dr. Pepper',
        quantity: 1,
        price: '$2.50',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/BnJbLkJz/dr-pepper.jpg',
        imageAlt: 'cans of dr pepper',
    },
    {
        id: 5,
        name: 'Sprite',
        quantity: 1,
        price: '$2.50',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/T1qGT253/sprite.jpg',
        imageAlt: 'cans of sprite',
    },
    {
        id: 6,
        name: 'Inca-Kola',
        quantity: 1,
        price: '$2.50',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/TPL6pJ5S/inca-kola.jpg',
        imageAlt: 'cans of inca-kola',
    },

]

export default function Drinks() {
    const [cart, setCart] = useState([])
    const { data: session } = useSession()
    const userId = session?.user?.id || null

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    }

    useCartSave(userId, cart)
    useCartFetch(userId, session)


    return (
        <>
            <Navbar cart={cart} setCart={setCart} />
            <div className="bg-gray-50">
                <div>
                    <main>
                        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            <div className="py-24 text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Drinks</h1>
                                <p className="mx-auto mt-4 max-w-3xl text-base text-gray-500">
                                    We have a wide selection of drinks to suit every taste.
                                </p>
                            </div>
                            {/* Product grid */}
                            <section aria-labelledby="products-heading" className="mt-8">
                                <h2 id="products-heading" className="sr-only">
                                    Products
                                </h2>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                    {products.map((product) => (
                                        <a key={product.id} onClick={() => addToCart(product)} className="group">
                                            <img
                                                alt={product.imageAlt}
                                                src={product.imageSrc}
                                                className="aspect-square w-full rounded-lg object-cover group-hover:opacity-75 sm:aspect-2/3"
                                            />
                                            <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                                                <h3>{product.name}</h3>
                                                <p>{product.price}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500 italic">{product.description}</p>
                                        </a>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </>
    )
}

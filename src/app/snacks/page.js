'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useCartSave } from '../hooks/useCartSave'
import { useCartFetch } from '../hooks/useCartFetch'
const products = [
    {
        id: 1,
        name: 'Assorted Frito-Lay Chips',
        quantity: 1,
        price: '$13',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/VvLryh5p/assorted-chips.jpg',
        imageAlt: 'Assorted Frito-Lay Chips in a bag on a white background.',
    },
    {
        id: 2,
        name: 'Assorted Mars Chocolate',
        quantity: 1,
        price: '$14',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/T1wwNW4X/assorted-mars-chocolate.jpg',
        imageAlt: 'Assorted Mars Chocolate in a bag on a white background.',
    },
    {
        id: 3,
        name: 'Assorted Hershey Chocolate',
        quantity: 1,
        price: '$12',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/BnG3XKBQ/assorted-hershey-chocolate.jpg',
        imageAlt: 'Assorted Hershey Chocolate in a bag on a white background.',
    },
    {
        id: 4,
        name: 'Assorted Hostess Snacks',
        quantity: 1,
        price: '$21',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/CKB97MN6/assorted-hostess.jpg',
        imageAlt: 'Assorted Hostess Snacks in a bag on a white background.',
    },
    {
        id: 5,
        name: 'Assorted Little Debbie Snacks',
        quantity: 1,
        price: '$15',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/52ZsxBBn/assorted-little-debbie.jpg',
        imageAlt: 'Assorted Little Debbie Snacks in a bag on a white background.',
    },
    {
        id: 6,
        name: 'Assorted Nabisco Snacks',
        quantity: 1,
        price: '$16',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/Cxf46R3D/assorted-nabisco.jpg',
        imageAlt: 'Assorted Nabisco Snacks in a bag on a white background.',
    },

]

export default function Snacks() {
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
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Snacks</h1>
                                <p className="mx-auto mt-4 max-w-3xl text-base text-gray-500">
                                    We have a wide selection of snacks to suit every taste.
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
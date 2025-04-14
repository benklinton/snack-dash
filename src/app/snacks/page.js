'use client'

import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import {
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
const sortOptions = [
    { name: 'Most Popular', href: '#' },
    { name: 'Best Rating', href: '#' },
    { name: 'Newest', href: '#' },
    { name: 'Price: Low to High', href: '#' },
    { name: 'Price: High to Low', href: '#' },
]
const filters = [
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'tees', label: 'Tees' },
            { value: 'crewnecks', label: 'Crewnecks' },
            { value: 'hats', label: 'Hats' },
            { value: 'bundles', label: 'Bundles' },
            { value: 'carry', label: 'Carry' },
            { value: 'objects', label: 'Objects' },
        ],
    },
    {
        id: 'brand',
        name: 'Brand',
        options: [
            { value: 'clothing-company', label: 'Clothing Company' },
            { value: 'fashion-inc', label: 'Fashion Inc.' },
            { value: 'shoes-n-more', label: "Shoes 'n More" },
            { value: 'supplies-n-stuff', label: "Supplies 'n Stuff" },
        ],
    },
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White' },
            { value: 'black', label: 'Black' },
            { value: 'grey', label: 'Grey' },
            { value: 'blue', label: 'Blue' },
            { value: 'olive', label: 'Olive' },
            { value: 'tan', label: 'Tan' },
        ],
    },
    {
        id: 'sizes',
        name: 'Sizes',
        options: [
            { value: 'xs', label: 'XS' },
            { value: 's', label: 'S' },
            { value: 'm', label: 'M' },
            { value: 'l', label: 'L' },
            { value: 'xl', label: 'XL' },
            { value: '2xl', label: '2XL' },
        ],
    },
]
const products = [
    {
        id: 1,
        name: 'Assorted Frito-Lay Chips',
        href: '#',
        price: '$13',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/VvLryh5p/assorted-chips.jpg',
        imageAlt: 'Assorted Frito-Lay Chips in a bag on a white background.',
    },
    {
        id: 2,
        name: 'Assorted Mars Chocolate',
        href: '#',
        price: '$14',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/T1wwNW4X/assorted-mars-chocolate.jpg',
        imageAlt: 'Assorted Mars Chocolate in a bag on a white background.',
    },
    {
        id: 3,
        name: 'Assorted Hershey Chocolate',
        href: '#',
        price: '$12',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/BnG3XKBQ/assorted-hershey-chocolate.jpg',
        imageAlt: 'Assorted Hershey Chocolate in a bag on a white background.',
    },
    {
        id: 4,
        name: 'Assorted Hostess Snacks',
        href: '#',
        price: '$21',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/CKB97MN6/assorted-hostess.jpg',
        imageAlt: 'Assorted Hostess Snacks in a bag on a white background.',
    },
    {
        id: 5,
        name: 'Assorted Little Debbie Snacks',
        href: '#',
        price: '$15',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/52ZsxBBn/assorted-little-debbie.jpg',
        imageAlt: 'Assorted Little Debbie Snacks in a bag on a white background.',
    },
    {
        id: 6,
        name: 'Assorted Nabisco Snacks',
        href: '#',
        price: '$16',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/Cxf46R3D/assorted-nabisco.jpg',
        imageAlt: 'Assorted Nabisco Snacks in a bag on a white background.',
    },

]

export default function Snacks() {
    const [cart, setCart] = useState([])

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
      }
    const saveCartToServer = async () => {
        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: cart }),
            });
            if (!response.ok) {
                throw new Error('Failed to save cart');
            }
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    useEffect(() => {
        saveCartToServer();
    }, [cart])

    return (
        <>
            <Navbar cart={cart} />
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
                                        <a key={product.id} href={product.href} onClick={() => addToCart(product)} className="group">
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
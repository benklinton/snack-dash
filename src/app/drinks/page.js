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
        name: 'Coca-Cola',
        href: '#',
        price: '$2.50',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/kGPhMxWx/coca-cola.jpg',
        imageAlt: 'cans of coca-cola',
    },
    {
        id: 2,
        name: 'Pepsico',
        href: '#',
        price: '$2.50',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/fRV7FV9Z/pepsi.jpg',
        imageAlt: 'cans of pepspi',
    },
    {
        id: 3,
        name: 'Mountain Dew',
        href: '#',
        price: '$2.50',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/3Nw0vqj7/mtn-dew.jpg',
        imageAlt: 'cans of mountain dew',
    },
    {
        id: 4,
        name: 'Dr. Pepper',
        href: '#',
        price: '$2.50',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/BnJbLkJz/dr-pepper.jpg',
        imageAlt: 'cans of dr pepper',
    },
    {
        id: 5,
        name: 'Sprite',
        href: '#',
        price: '$2.50',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/T1qGT253/sprite.jpg',
        imageAlt: 'cans of sprite',
    },
    {
        id: 6,
        name: 'Inca-Kola',
        href: '#',
        price: '$2.50',
        description: 'Add to Cart',
        imageSrc: 'https://i.postimg.cc/TPL6pJ5S/inca-kola.jpg',
        imageAlt: 'cans of inca-kola',
    },

]

export default function Drinks() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [cart, setCart] = useState([])

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    }

    const fetchCartFromServer = async () => {
        try {
            const response = await fetch(`/api/cart?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch cart');
            }
            const data = await response.json();
            setCart(data.items || []);
        }
        catch (error) {
            console.error('Error fetching cart:', error);
        }
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
        }
        catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    useEffect(() => {
        fetchCartFromServer();
    }, [])
    useEffect(() => {
        saveCartToServer();
    }, [cart])



    return (
        <>
            <Navbar cart={cart} />
            <div className="bg-gray-50">
                <div>
                    {/* Mobile filter dialog */}
                    <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 sm:hidden">
                        <DialogBackdrop
                            transition
                            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                        />

                        <div className="fixed inset-0 z-40 flex">
                            <DialogPanel
                                transition
                                className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
                            >
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button
                                        type="button"
                                        onClick={() => setMobileFiltersOpen(false)}
                                        className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon aria-hidden="true" className="size-6" />
                                    </button>
                                </div>

                                {/* Filters */}
                                <form className="mt-4">
                                    {filters.map((section) => (
                                        <Disclosure key={section.name} as="div" className="border-t border-gray-200 px-4 py-6">
                                            <h3 className="-mx-2 -my-3 flow-root">
                                                <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                                                    <span className="font-medium text-gray-900">{section.name}</span>
                                                    <span className="ml-6 flex items-center">
                                                        <ChevronDownIcon
                                                            aria-hidden="true"
                                                            className="size-5 rotate-0 transform group-data-open:-rotate-180"
                                                        />
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-6">
                                                    {section.options.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex gap-3">
                                                            <div className="flex h-5 shrink-0 items-center">
                                                                <div className="group grid size-4 grid-cols-1">
                                                                    <input
                                                                        defaultValue={option.value}
                                                                        defaultChecked={option.checked}
                                                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        type="checkbox"
                                                                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                                    />
                                                                    <svg
                                                                        fill="none"
                                                                        viewBox="0 0 14 14"
                                                                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                                    >
                                                                        <path
                                                                            d="M3 8L6 11L11 3.5"
                                                                            strokeWidth={2}
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            className="opacity-0 group-has-checked:opacity-100"
                                                                        />
                                                                        <path
                                                                            d="M3 7H11"
                                                                            strokeWidth={2}
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            className="opacity-0 group-has-indeterminate:opacity-100"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <label
                                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                className="ml-3 text-sm text-gray-500"
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    ))}
                                </form>
                            </DialogPanel>
                        </div>
                    </Dialog>
                    <main>
                        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            <div className="py-24 text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Drinks</h1>
                                <p className="mx-auto mt-4 max-w-3xl text-base text-gray-500">
                                    We have a wide selection of drinks to suit every taste.
                                </p>
                            </div>

                            {/* Filters */}
                            <section aria-labelledby="filter-heading" className="border-t border-gray-200 pt-6">
                                <h2 id="filter-heading" className="sr-only">
                                    Product filters
                                </h2>

                                <div className="flex items-center justify-between">
                                    <Menu as="div" className="relative inline-block text-left">
                                        <div>
                                            <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                                Sort
                                                <ChevronDownIcon
                                                    aria-hidden="true"
                                                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                                                />
                                            </MenuButton>
                                        </div>

                                        <MenuItems
                                            transition
                                            className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                        >
                                            <div className="py-1">
                                                {sortOptions.map((option) => (
                                                    <MenuItem key={option}>
                                                        <a
                                                            href={option.href}
                                                            className="block px-4 py-2 text-sm font-medium text-gray-900 data-focus:bg-gray-100 data-focus:outline-hidden"
                                                        >
                                                            {option.name}
                                                        </a>
                                                    </MenuItem>
                                                ))}
                                            </div>
                                        </MenuItems>
                                    </Menu>

                                    <button
                                        type="button"
                                        onClick={() => setMobileFiltersOpen(true)}
                                        className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                                    >
                                        Filters
                                    </button>

                                    <PopoverGroup className="hidden sm:flex sm:items-baseline sm:space-x-8">
                                        {filters.map((section, sectionIdx) => (
                                            <Popover key={section.name} id="menu" className="relative inline-block text-left">
                                                <div>
                                                    <PopoverButton className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                                        <span>{section.name}</span>
                                                        {sectionIdx === 0 ? (
                                                            <span className="ml-1.5 rounded-sm bg-gray-200 px-1.5 py-0.5 text-xs font-semibold text-gray-700 tabular-nums">
                                                                1
                                                            </span>
                                                        ) : null}
                                                        <ChevronDownIcon
                                                            aria-hidden="true"
                                                            className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                                                        />
                                                    </PopoverButton>
                                                </div>

                                                <PopoverPanel
                                                    transition
                                                    className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                                >
                                                    <form className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex gap-3">
                                                                <div className="flex h-5 shrink-0 items-center">
                                                                    <div className="group grid size-4 grid-cols-1">
                                                                        <input
                                                                            defaultValue={option.value}
                                                                            defaultChecked={option.checked}
                                                                            id={`filter-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            type="checkbox"
                                                                            className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                                        />
                                                                        <svg
                                                                            fill="none"
                                                                            viewBox="0 0 14 14"
                                                                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                                        >
                                                                            <path
                                                                                d="M3 8L6 11L11 3.5"
                                                                                strokeWidth={2}
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                className="opacity-0 group-has-checked:opacity-100"
                                                                            />
                                                                            <path
                                                                                d="M3 7H11"
                                                                                strokeWidth={2}
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                className="opacity-0 group-has-indeterminate:opacity-100"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="pr-6 text-sm font-medium whitespace-nowrap text-gray-900"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </form>
                                                </PopoverPanel>
                                            </Popover>
                                        ))}
                                    </PopoverGroup>
                                </div>
                            </section>

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

'use client'
import { Fragment, useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { getSession, useSession, signOut } from 'next-auth/react';

const navigation = {
  categories: [
    {
      id: 'drinks',
      name: 'Drinks',
      featured: [
        {
          name: 'New Arrivals',
          href: '/arrivals',
          imageSrc: "https://images.unsplash.com/photo-1544418749-94b09b11e93f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTY5MDR8MHwxfGFsbHx8fHx8fHx8fDE3NDEwMzA5OTd8&ixlib=rb-4.0.3&q=80&w=1080",
          imageAlt: "clear drinking glass with ice cubes and flowing liquid during daytime",
        },
        {
          name: 'All Drinks',
          href: '/drinks',
          imageSrc: "https://images.unsplash.com/photo-1566846128021-b940b0eec910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTY5MDR8MHwxfGFsbHx8fHx8fHx8fDE3NDEwMzEwNzZ8&ixlib=rb-4.0.3&q=80&w=1080",
          imageAlt: "filled glass bottle",
        },
      ],
      sections: [
        {
          id: 'coke',
          name: 'Coke Products',
          items: [
            { name: 'Coca-Cola', href: '/drinks' },
            { name: 'Sprite', href: '/drinks' },
            { name: 'Inca Kola', href: '/drinks' },
          ],
        },
        {
          id: 'pepsi',
          name: 'Pepsi Products',
          items: [
            { name: 'Pepsi', href: '/drinks' },
            { name: 'Mtn Dew', href: '/drinks' },
            { name: 'Dr Pepper', href: '/drinks' },
          ],
        },
        {
          id: 'other',
          name: 'Other Brands',
          items: [
            { name: 'Coming Soon!', href: '/drinks' },
          ],
        },
      ],
    },
    {
      id: 'snacks',
      name: 'Snacks',
      featured: [
        {
          name: 'New Arrivals',
          href: '/arrivals',
          imageSrc: "https://images.unsplash.com/photo-1519087318609-bfb5c04c27f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTY5MDR8MHwxfGFsbHx8fHx8fHx8fDE3NDEwMzExMzF8&ixlib=rb-4.0.3&q=80&w=1080",
          imageAlt: "person holding a candy pack on white plastic box",
        },
        {
          name: 'All Snacks',
          href: '/snacks',
          imageSrc: "https://images.unsplash.com/photo-1576712967455-c8d22580e9be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTY5MDR8MHwxfGFsbHx8fHx8fHx8fDE3NDEwMzExODJ8&ixlib=rb-4.0.3&q=80&w=1080",
          imageAlt: "assorted-color fruits on display",
        },
      ],
      sections: [
        {
          id: 'sweet',
          name: 'Sweet',
          items: [
            { name: 'Hostess', href: '/snacks' },
            { name: 'Oreos', href: '/snacks' },
            { name: 'Little Debbie', href: '/snacks' },
            { name: 'M&M', href: '/snacks' },
            { name: 'Hershey', href: '/snacks' },
          ],
        },
        {
          id: 'salty',
          name: 'Salty',
          items: [
            { name: 'Doritos', href: '/snacks' },
            { name: 'Pringles', href: '/snacks' },
            { name: 'Cheez-Its', href: '/snacks' },
            { name: 'Lays', href: '/snacks' },
            { name: 'Pretzels', href: '/snacks' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Mars', href: '/snacks' },
            { name: 'Nestle', href: '/snacks' },
            { name: 'Haribo', href: '/snacks' },
            { name: 'Ferrero', href: '/snacks' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '/about' }
  ],
}

export default function Navbar({ cart, setCart }) {
  const [open, setOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuth = async () => {
      const session = await getSession();
      setIsAuthenticated(!!session); // Set to true if session exists
    };
    checkAuth();
  }, []);

  const removeFromCart = async (index) => {
    const itemToRemove = cart[index]; // Get the item to remove
    try {
      // Make an API call to delete the item from the database
      const response = await fetch(`/api/cart`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemToRemove.itemId }), // Send the item ID to the backend
      });

      if (!response.ok) {
        throw new Error('Failed to delete item from cart');
      }

      // Update the cart state locally after successful deletion
      setCart((prevCart) => prevCart.filter((_, i) => i !== index));
      console.log('Item removed successfully:', itemToRemove);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = () => {
    // Redirect to the checkout page with the cart items
    window.location.href = '/checkout';
  };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-10 px-4 pt-10 pb-8">
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                    {page.name}
                  </a>
                </div>
              ))}
            </div>
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <a href="/login" className="-m-2 block p-2 font-medium text-gray-900">
                  Log in
                </a>
              </div>
              <div className="flow-root">
                <a href="/signup" className="-m-2 block p-2 font-medium text-gray-900">
                  Create account
                </a>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      {/* Top navigation */}
      <nav aria-label="Top" className="relative z-20 bg-white/90 backdrop-blur-xl backdrop-filter">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <a href="/">
                <span className="sr-only">Snack Dash</span>
                <img
                  alt=""
                  src="https://placehold.co/600x400"
                  className="h-8 w-auto"
                />
              </a>
            </div>

            {/* Flyout menus */}
            <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                {navigation.categories.map((category) => (
                  <Popover key={category.name} className="flex">
                    <div className="relative flex">
                      <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:border-indigo-600 data-open:text-indigo-600">
                        {category.name}
                      </PopoverButton>
                    </div>

                    <PopoverPanel
                      transition
                      className="group absolute inset-x-0 top-full bg-white text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                    >
                      {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                      <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow-sm" />
                      {/* Fake border when menu is open */}
                      <div aria-hidden="true" className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8">
                        <div className="h-px w-full bg-transparent transition-colors duration-200 ease-out group-data-open:bg-gray-200" />
                      </div>

                      <div className="relative">
                        <div className="mx-auto max-w-7xl px-8">
                          <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                            <div className="col-start-2 grid grid-cols-2 gap-x-8">
                              {category.featured.map((item) => (
                                <div key={item.name} className="group relative text-base sm:text-sm">
                                  <img
                                    alt={item.imageAlt}
                                    src={item.imageSrc}
                                    className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                  />
                                  <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                    <span aria-hidden="true" className="absolute inset-0 z-10" />
                                    {item.name}
                                  </a>
                                  <p aria-hidden="true" className="mt-1">
                                    Shop now
                                  </p>
                                </div>
                              ))}
                            </div>
                            <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                              {category.sections.map((section) => (
                                <div key={section.name}>
                                  <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                    {section.name}
                                  </p>
                                  <ul
                                    role="list"
                                    aria-labelledby={`${section.name}-heading`}
                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                  >
                                    {section.items.map((item) => (
                                      <li key={item.name} className="flex">
                                        <a href={item.href} className="hover:text-gray-800">
                                          {item.name}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverPanel>
                  </Popover>
                ))}

                {navigation.pages.map((page) => (
                  <a
                    key={page.name}
                    href={page.href}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {page.name}
                  </a>
                ))}
              </div>
            </PopoverGroup>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => signOut()}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <a href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Log in
                    </a>
                    <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                    <a href="/signup" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Create account
                    </a>
                  </>
                )}
              </div>
              <div className="ml-4 flow-root lg:ml-6">
                <Popover className="relative">
                  <PopoverButton className="group -m-2 flex items-center p-2">
                    <ShoppingCartIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cart.length}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </PopoverButton>

                  <PopoverPanel className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="p-4">
                      {cart.length === 0 ? (
                        <p className="text-sm text-gray-500">Your cart is empty.</p>
                      ) : (
                        <>
                          <ul className="divide-y divide-gray-200">
                            {cart.map((item, index) => (
                              <li key={index} className="flex items-center justify-between py-2">
                                <div className="flex items-center">
                                  <img
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    className="h-10 w-10 rounded-md object-cover"
                                  />
                                  <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => removeFromCart(index)}
                                  className="text-sm font-medium text-red-600 hover:text-red-500"
                                >
                                  Remove
                                </button>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4">
                            <button
                              onClick={handleCheckout}
                              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Checkout
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </PopoverPanel>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

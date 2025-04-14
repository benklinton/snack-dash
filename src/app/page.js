'use client'
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const deals = [
  {
    id: 1,
    name: 'Cosmic Brownies',
    price: '$3.50',
    href: '#',
    description: 'Add to Cart',
    imageSrc: 'https://i.postimg.cc/x8fhyf7h/cosmic-brownies.jpg',
    imageAlt: "Box of Cosmic Brownies",
  },
  {
    id: 2,
    name: 'Bueno Bars',
    price: '$1.99',
    href: '#',
    description: 'Add to Cart',
    imageSrc: 'https://i.postimg.cc/kGC6TZFk/bueno-bars.jpg',
    imageAlt: "a box of Bueno Bars",
  },
  {
    id: 3,
    name: 'Assorted Powerade',
    price: '$1.50',
    href: '#',
    description: 'Add to Cart',
    imageSrc: 'https://i.postimg.cc/Vv7fXH79/powerade.png',
    imageAlt:
      "Placeholder image",
  },
]
const perks = [
  {
    name: 'Wide Selection',
    imageUrl: '/candy.svg',
    description: 'From sweet treats to savory snacks, we got something for every craving!.',
  },
  {
    name: 'Same day delivery',
    imageUrl: '/calendar.svg',
    description:
      'Get your favorite snacks delivered srtaight to your door in on time',
  },
  {
    name: 'Affordable prices',
    imageUrl: '/money.svg',
    description: 'Enjoy delicious snacks without breaking the bank',
  },
  {
    name: 'Exclusive Deals and Bundles',
    imageUrl: '/bundle.svg',
    description: 'Save more with special discounts and bundles you won’t find anywhere else!',
  },
]

const savedImages = [
  {
    id: "dGRCDRUTNM0",
    url: "",
    alt: "",
  },
  {
    id: "DIymcAvhdEc",
    url: "",
    alt: "",
  },
  {
    id: "vUSfCfuq-2Y",
    url: "",
    alt: "",
  },
  {
    id: "SDV7kq7WFgI",
    url: "",
    alt: "",
  },
  {
    id: "UzDJVy0D0MU",
    url: "",
    alt: "",
  },
  {
    id: "PvAAYZx-yf8",
    url: "",
    alt: "",
  },
  {
    id: "PL5FZkW0Qkk",
    url: "",
    alt: "",
  },
  {
    id: "PH1bzadZq1w",
    url: "",
    alt: "",
  },
  {
    id: "7cRBG4nQtKs",
    url: "",
    alt: "",
  }
]

export default function Home() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const fetchImages = async () => {
      for (const image of savedImages) {
        try {
          const response = await axios.get(`https://api.unsplash.com/photos/${image.id}`, {
            params: {
              client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
            },
          });
          image.url = response.data.urls.regular;
          image.alt = response.data.alt_description;
        }
        catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    }
    fetchImages();
  }
    , []);
  return (
    <>
      <Navbar cart={cart} />
      <div className="bg-white">
        <header className="relative overflow-hidden">
          {/* Hero section */}
          <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
            <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
              <div className="sm:max-w-lg">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Snack Dash
                </h1>
                <p className="mt-4 text-xl text-gray-500">
                  Your ultimate destination for all things sweet and savory!
                </p>
              </div>
              <div>
                <div className="mt-10">
                  {/* Decorative image grid */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                  >
                    <div className="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                      <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                            {loading ? (
                              <p>Loading...</p>
                            ) : (
                              <img
                                alt={savedImages[0].alt}
                                src={savedImages[0].url}
                                className="size-full object-cover"
                              />
                            )}
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            {loading ? (
                              <p>Loading...</p>
                            ) : (
                              <img
                                alt={savedImages[1].alt}
                                src={savedImages[1].url}
                                className="size-full object-cover"
                              />
                            )}
                          </div>
                        </div>
                        <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            {loading ? (
                              <p>Loading...</p>
                            ) : (
                              <img
                                alt={savedImages[2].alt}
                                src={savedImages[2].url}
                                className="size-full object-cover" />
                            )}
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            {loading ? (
                              <p>Loading...</p>
                            ) : (
                              <img
                                alt={savedImages[3].alt}
                                src={savedImages[3].url}
                                className="size-full object-cover"
                              />
                            )}
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            {loading ? (
                              <p>Loading...</p>
                            ) : (
                              <img
                                alt={savedImages[4].alt}
                                src={savedImages[4].url}
                                className="size-full object-cover"
                              />
                            )}
                          </div>
                        </div>
                        <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            {loading ? (
                              <p>Loading...</p>
                            ) : (
                              <img
                                alt={savedImages[5].alt}
                                src={savedImages[5].url}
                                className="size-full object-cover"
                              />
                            )}
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            {loading ? (
                              <p>Loading...</p>
                            ) : (
                              <img
                                alt={savedImages[6].alt}
                                src={savedImages[6].url}
                                className="size-full object-cover"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main>
          {/* Category section */}
          <section aria-labelledby="category-heading" className="bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
              <div className="sm:flex sm:items-baseline sm:justify-between">
                <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                  Shop by Category
                </h2>
                <a href="#" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                  Browse all categories
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
                <div className="group relative aspect-2/1 overflow-hidden rounded-lg sm:row-span-2 sm:aspect-square bg-black">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <img
                      alt={savedImages[1].alt}
                      src={savedImages[1].url}
                      className="absolute size-full object-cover group-hover:opacity-75"
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-b from-transparent to-black opacity-50"
                  />
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <h3 className="font-semibold text-white">
                        <a href="/snacks">
                          <span className="absolute inset-0" />
                          Candy Bars
                        </a>
                      </h3>
                      <p aria-hidden="true" className="mt-1 text-sm text-white">
                        Shop now
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group relative aspect-2/1 overflow-hidden rounded-lg sm:aspect-auto bg-black">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <img
                      alt={savedImages[7].alt}
                      src={savedImages[7].url}
                      className="absolute size-full object-cover group-hover:opacity-75"
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-b from-transparent to-black opacity-50"
                  />
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <h3 className="font-semibold text-white">
                        <a href="/drinks">
                          <span className="absolute inset-0" />
                          Drinks
                        </a>
                      </h3>
                      <p aria-hidden="true" className="mt-1 text-sm text-white">
                        Shop now
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group relative aspect-2/1 overflow-hidden rounded-lg sm:aspect-auto bg-black">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <img
                      alt={savedImages[8].alt}
                      src={savedImages[8].url}
                      className="absolute size-full object-cover group-hover:opacity-75"
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-b from-transparent to-black opacity-50"
                  />
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <h3 className="font-semibold text-white">
                        <a href="/snacks">
                          <span className="absolute inset-0" />
                          Chips
                        </a>
                      </h3>
                      <p aria-hidden="true" className="mt-1 text-sm text-white">
                        Shop now
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:hidden">
                <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                  Browse all categories
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          </section>
          {/* About section */}
          <section aria-labelledby="cause-heading">
            <div className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  alt="a large pile of snacks"
                  src="https://i.postimg.cc/fRNXHV5V/assorted-snacks.jpg"
                  className="size-full object-cover"
                />
              </div>
              <div aria-hidden="true" className="absolute inset-0 bg-gray-900/50" />
              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <h2 id="cause-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Get to Know Us!
                </h2>
                <p className="mt-3 text-xl text-white">
                  Craving something delicious? Learn more about our passion for bringing you the best sweet and savory snacks!
                </p>
                <a
                  href="/about"
                  className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                >
                  Read our story
                </a>
              </div>
            </div>
          </section>

          {/* Deals section */}
          <section aria-labelledby="favorites-heading">
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
              <div className="sm:flex sm:items-baseline sm:justify-between">
                <h2 id="favorites-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                  Deals of the Day
                </h2>
                <a href="#" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                  Browse all deals
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8">
                {deals.map((deals) => (
                  <div key={deals.id} className="group relative">
                    <img
                      alt={deals.imageAlt}
                      src={deals.imageSrc}
                      className="h-96 w-full rounded-lg object-cover group-hover:opacity-75 sm:aspect-2/3 sm:h-auto"
                    />
                    <h3 className="mt-4 text-base font-semibold text-gray-900">
                      <a href={deals.href} onClick={() => addToCart(deals)}>
                        <span className="absolute inset-0" />
                        {deals.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{deals.price}</p>
                    <p className="mt-1 text-sm text-gray-500">{deals.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:hidden">
                <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                  Browse all favorites
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          </section>

          {/* Perks section */}
          <section aria-labelledby="perks-heading" className="border-t border-gray-200 bg-gray-300">
            <h2 id="perks-heading" className="sr-only">
              Our perks
            </h2>

            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
              <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
                {perks.map((perk) => (
                  <div
                    key={perk.name}
                    className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                  >
                    <div className="md:shrink-0">
                      <div className="flow-root">
                        <img alt="" src={perk.imageUrl} className="mx-auto -my-1 h-24 w-auto" />
                      </div>
                    </div>
                    <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                      <h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
                      <p className="mt-3 text-sm text-gray-600">{perk.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  )
}

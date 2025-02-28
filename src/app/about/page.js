import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function About() {
    const stats = [
        { label: 'Transactions every 24 hours', value: '2000+' },
        { label: 'Total revenue sales', value: '$3.5 million' },
        { label: 'Concurrent snackers (users)', value: '20,000' },
    ];
    return (
        <>
            <Navbar />
            <div className="bg-white">
                <div className="relative isolate">
                    <div className="overflow-hidden">
                        <div className="mx-auto max-w-7xl px-6 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32">
                            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                                <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                                    <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
                                        We’re changing the world of snacks.
                                    </h1>
                                    <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                                        No matter where you are or what you're craving, we've got you covered. Its about time well all snacked smarter, not harder.
                                    </p>
                                </div>
                                <div className="flex justify-center mt-12 lg:mt-0 lg:justify-end lg:w-1/2">
                                    <img className="w-full h-auto max-w-sm" src="http://localhost:8080/donut-hand.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Our mission</h2>
                        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                                <p className="text-xl/8 text-gray-600">
                                    We're on a mission to satisfy cravings everywhere by delivering the best sweet and savory snacks, fast and hassle-free.
                                    We believe that snacking should be fun, convenient, and full of flavor, which is why we offer a wide selection of treats to suit every taste.
                                    Whether you're in the mood for something classic, adventurous, or totally unique, we've got you covered. With reliable delivery, great prices,
                                    and exciting new options to discover, we make snack time more enjoyable—anytime, anywhere!
                                </p>
                            </div>
                            <div className="lg:flex lg:flex-auto lg:justify-center">
                                <dl className="w-64 space-y-8 xl:w-80">
                                    {stats.map((stat) => (
                                        <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                                            <dt className="text-base/7 text-gray-600">{stat.label}</dt>
                                            <dd className="text-5xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                                Our story
                            </h1>
                            <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base/7 text-gray-700 lg:max-w-none lg:grid-cols-2">
                                <div>
                                    <p className="italic">
                                        It all started with a craving.
                                    </p>
                                    <p className="mt-4">
                                        Late one night, a group of friends sat around, stomachs growling, wishing they had their favorite snacks within arm’s reach.
                                        The gas station was too far, the grocery store was already closed, and food delivery services didn’t have the variety they were looking for.
                                        Someone joked, “Why isn’t there a service that just delivers snacks whenever you need them?”
                                    </p>
                                </div>
                                <div>
                                    <p className="italic">
                                        That joke quickly turned into an idea.
                                    </p>
                                    <p className="mt-4">
                                        One of those friends couldn’t let go of the thought. He realized that while there were plenty of options for fast food and grocery delivery, there wasn’t a go-to service dedicated solely to snacks. The kind of place where you could get your favorite sweet, salty, crunchy, or chewy treats fast, without the hassle of shopping around different stores or waiting days for shipping.
                                        So, a small group of friends decided to do something about it. They started Snack Dash, a snack delivery service that brings the best treats right to your door. With a focus on convenience, variety, and affordability, Snack Dash is changing the way people snack.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
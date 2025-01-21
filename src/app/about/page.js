import Navbar from '@/components/navbar';
export default function About() {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <h1 className="text-4xl text-center mt-8">About Us</h1>
                <p className="text-center mt-4">We are a small team of developers who love snacks!</p>
            </div>
        </div>
    );
};
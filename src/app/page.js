import Navbar from '@/components/navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="text-4xl text-center mt-8">Welcome to Snack Dash!</h1>
        <p className="text-center mt-4">The best place to find your favorite snacks!</p>
      </div>
    </div>
  );
}

import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Our Store</h1>
        <p className="text-xl text-gray-600 mb-6">
          Start shopping and discover amazing products!
        </p>
        <div className="space-x-4">
          <Link 
            href="/" 
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Browse Products
          </Link>
          <Link 
            href="/category" 
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
          >
            View Categories
          </Link>
        </div>
      </div>
    </div>
  );
}

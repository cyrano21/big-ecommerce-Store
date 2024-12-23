import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50">
      <div className="text-center p-8 bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="flex justify-center mb-6">
          <AlertCircle className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">
          The product you are looking for might have been removed, 
          had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            href="/" 
            className="
              px-6 
              py-3 
              bg-purple-600 
              text-white 
              rounded-lg 
              hover:bg-purple-700 
              transition-colors 
              duration-300
            "
          >
            Go to Home
          </Link>
          <Link 
            href="/products" 
            className="
              px-6 
              py-3 
              border 
              border-purple-600 
              text-purple-600 
              rounded-lg 
              hover:bg-purple-50 
              transition-colors 
              duration-300
            "
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}

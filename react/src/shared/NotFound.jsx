import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        to="/"
        className="text-blue-600 hover:underline text-lg"
      >
        Go back to Home
      </Link>
    </div>
  );
}

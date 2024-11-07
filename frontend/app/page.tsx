import Link from 'next/link';
import Header from '../src/components/header';

export default function Page() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <Header />
      <h1 className="text-4xl font-bold py-4">Pagina de inicio</h1>
      <Link href="/login">
        <span className="text-blue-500">Login</span>
      </Link>
    </div>
  );
}
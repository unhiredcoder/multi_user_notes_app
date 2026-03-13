import Link from 'next/link';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';

export default async function LandingPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');


  if (token) {
    redirect('/dashboard');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <main className="text-center space-y-6 max-w-2xl px-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Your thoughts, <span className="text-blue-600">organized.</span>
        </h1>
        <p className="text-lg text-slate-600">
          A secure, multi-user notes application built for simplicity and speed. 
          Keep your ideas private and accessible from anywhere.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </main>
      
      <footer className="absolute bottom-8 text-slate-400 text-sm">
        &copy; 2026 Multi-User Notes App
      </footer>
    </div>
  );
}
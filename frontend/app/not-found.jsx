import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 space-y-4">
      <h1 className="text-6xl font-bold text-slate-800">404</h1>
      <p className="text-xl text-slate-500">Oops! This page doesn't exist.</p>
      <Button asChild>
        <Link href="/dashboard">Return to Dashboard</Link>
      </Button>
    </div>
  );
}
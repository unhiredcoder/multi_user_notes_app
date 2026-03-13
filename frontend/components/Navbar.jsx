'use client';

import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      router.push('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-sm">
      <h1 className="text-xl font-bold">Notes App</h1>
      <Button variant="outline" onClick={handleLogout}>Logout</Button>
    </nav>
  );
}
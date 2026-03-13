'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import AddNoteForm from '@/components/AddNoteForm';
import NoteCard from '@/components/NoteCard';

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchNotes = async () => {
    try {
      const res = await api.get('/notes');
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/auth/me');
        await fetchNotes();
      } catch (err) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);


  if (loading) {
    return (
      <div>
        <Navbar />
        <main className="max-w-5xl mx-auto p-6 space-y-8">
          {/* Add Note Form Skeleton */}
          <div className="h-48 bg-slate-200 animate-pulse rounded-xl w-full"></div>
          
          {/* Notes Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-32 bg-slate-200 animate-pulse rounded-xl w-full"></div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="max-w-5xl mx-auto p-6 space-y-8">
        <AddNoteForm onNoteAdded={fetchNotes} />
        
        {notes.length === 0 ? (
          <p className="text-center text-slate-500 mt-10">You don't have any notes yet. Create one above!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map(note => (
              <NoteCard key={note._id} note={note} onNoteUpdated={fetchNotes} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
'use client';

import { useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast'; // Import hot toast
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function AddNoteForm({ onNoteAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/notes', { title, content });
      setTitle('');
      setContent('');
      toast.success('Note added successfully!');
      onNoteAdded();
    } catch (err) {
      toast.error('Failed to save note.');
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Note Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea placeholder="Note Content" value={content} onChange={(e) => setContent(e.target.value)} required />
          <Button type="submit">Add Note</Button>
        </form>
      </CardContent>
    </Card>
  );
}
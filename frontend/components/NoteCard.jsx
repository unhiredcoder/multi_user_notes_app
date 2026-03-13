'use client';

import { useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast'; // Import hot toast
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function NoteCard({ note, onNoteUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${note._id}`);
      toast.success('Note deleted');
      onNoteUpdated();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/notes/${note._id}`, { title, content });
      setIsEditing(false);
      toast.success('Note updated');
      onNoteUpdated();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  if (isEditing) {
    return (
      <Card>
        <CardContent className="pt-6 space-y-4">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <div className="flex gap-2">
            <Button onClick={handleUpdate} size="sm">Save</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)} size="sm">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{note.content}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this note?</AlertDialogTitle>
              <AlertDialogDescription>This action is permanent.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
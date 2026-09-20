// src/hooks/useBooks.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE || "http://localhost:5000/api/books";

export default function useBooks() {
  const queryClient = useQueryClient();

  // 1. Fetch & Cache Books globally
  const { data: books = [], isLoading: loading, error } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const res = await axios.get(API);
      return res.data;
    }
  });

  // 2. Create Book
  const createBook = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.post(API, payload);
      return res.data;
    },
    onSuccess: () => {
      // Instantly refetch and sync all components using the 'books' key
      queryClient.invalidateQueries({ queryKey: ['books'] });
    }
  });

  // 3. Update Book
  const updateBook = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await axios.put(`${API}/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    }
  });

  // 4. Delete Book
  const deleteBook = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${API}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    }
  });

  return { 
    books, 
    loading, 
    error,
    // Exporting the async functions so your components can still use try/catch if needed
    createBook: createBook.mutateAsync, 
    updateBook: updateBook.mutateAsync, 
    deleteBook: deleteBook.mutateAsync 
  };
}
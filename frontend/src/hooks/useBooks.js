import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE || 'http://localhost:5555/books';

export default function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(API);
      const data = response.data?.data ?? response.data ?? [];
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch books:', err);
      setError(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const createBook = useCallback(async (payload) => {
    const response = await axios.post(API, payload);
    const created = response.data;
    setBooks((current) => [...current, created]);
    return created;
  }, []);

  const updateBook = useCallback(async (id, payload) => {
    const response = await axios.put(`${API}/${id}`, payload);
    const updated = response.data;
    setBooks((current) =>
      current.map((book) => (book._id === id ? { ...book, ...payload } : book))
    );
    return updated;
  }, []);

  const deleteBook = useCallback(async (id) => {
    await axios.delete(`${API}/${id}`);
    setBooks((current) => current.filter((book) => book._id !== id));
  }, []);

  return {
    books,
    loading,
    error,
    createBook,
    updateBook,
    deleteBook,
    refetch: fetchBooks,
  };
}


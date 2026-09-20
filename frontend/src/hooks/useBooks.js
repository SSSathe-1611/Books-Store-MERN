// src/hooks/useBooks.js
import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE || "http://localhost:5000/api/books";

export default function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setBooks(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const createBook = async (payload) => {
    // optimistic update
    const temp = { ...payload, _id: `temp-${Date.now()}` };
    setBooks((s) => [temp, ...s]);
    try {
      const res = await axios.post(API, payload);
      setBooks((s) => s.map((b) => (b._id === temp._id ? res.data : b)));
      return res.data;
    } catch (err) {
      // rollback
      setBooks((s) => s.filter((b) => b._id !== temp._id));
      throw err;
    }
  };

  const updateBook = async (id, payload) => {
    const prev = books;
    setBooks((s) => s.map((b) => (b._id === id ? { ...b, ...payload } : b)));
    try {
      const res = await axios.put(`${API}/${id}`, payload);
      setBooks((s) => s.map((b) => (b._id === id ? res.data : b)));
      return res.data;
    } catch (err) {
      setBooks(prev);
      throw err;
    }
  };

  const deleteBook = async (id) => {
    const prev = books;
    setBooks((s) => s.filter((b) => b._id !== id));
    try {
      await axios.delete(`${API}/${id}`);
    } catch (err) {
      setBooks(prev);
      throw err;
    }
  };

  return { books, loading, fetchBooks, createBook, updateBook, deleteBook };
}

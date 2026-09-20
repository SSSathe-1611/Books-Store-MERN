import React from "react";
import BookTable from "./components/BookTable";
import BookForm from "./components/BookForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useBooks from "./hooks/useBooks";
import "./styles/index.css";

export default function App() {
  const { books, loading, createBook, updateBook, deleteBook } = useBooks();

  const handleCreate = async (data) => {
    try {
      await createBook(data);
      toast.success("Book added");
    } catch (e) {
      toast.error("Failed to add book");
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateBook(id, data);
      toast.success("Book updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      toast.success("Book deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="app-container p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Library — Books</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <BookForm onSubmit={handleCreate} />
        </div>
        <div className="md:col-span-2">
          <BookTable
            books={books}
            loading={loading}
            onEdit={(b) => handleUpdate(b._id, b)}
            onDelete={handleDelete}
          />
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}


export default App;

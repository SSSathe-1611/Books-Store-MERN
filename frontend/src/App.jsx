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
  <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
    <div className="max-w-7xl mx-auto p-6 md:p-12">
      
      {/* Modern Header with action button */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          My Library
        </h1>
        <button 
          onClick={() => setIsFormModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-sm"
        >
          + Add Book
        </button>
      </header>

      {/* Main Content Area */}
      <main>
        {loading ? (
          <BookGridSkeleton count={6} />
        ) : books.length > 0 ? (
          <BookCardGrid books={books} onEdit={handleUpdate} onDelete={handleDelete} />
        ) : (
          <EmptyState message="Your library is looking a little bare." />
        )}
      </main>

      {/* Hidden off-canvas / modal until needed */}
      <SlideOutForm 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
        onSubmit={handleCreate} 
      />

    </div>
    <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
  </div>
);
}

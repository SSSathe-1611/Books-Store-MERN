// src/components/BookTable.jsx
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function BookTable({ books = [], loading, onEdit, onDelete }) {
  if (loading) {
    return <div className="p-4">Loading books…</div>;
  }

  if (!books.length) {
    return <div className="p-4 text-gray-600">No books found.</div>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow rounded">
      <table className="w-full min-w-[700px]">
        <thead className="bg-gray-100 text-sm text-gray-700">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Author</th>
            <th className="p-3 text-left">Year</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, i) => (
            <tr
              key={book._id}
              className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="p-3">{book.title}</td>
              <td className="p-3">{book.author}</td>
              <td className="p-3">{book.publishYear}</td>
              <td className="p-3 text-center">
                <button
                  onClick={() => onEdit(book)}
                  className="mx-2 text-blue-600 hover:text-blue-800"
                  aria-label={`Edit ${book.title}`}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(book._id)}
                  className="mx-2 text-red-600 hover:text-red-800"
                  aria-label={`Delete ${book.title}`}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

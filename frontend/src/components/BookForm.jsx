// src/components/BookForm.jsx
import React, { useState, useEffect } from "react";

export default function BookForm({ onSubmit, initial = null }) {
  const [form, setForm] = useState({ title: "", author: "", publishYear: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title required";
    if (!form.author.trim()) e.author = "Author required";
    if (!form.publishYear || Number(form.publishYear) <= 0)
      e.publishYear = "Valid year required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit(form);
    setForm({ title: "", author: "", publishYear: "" });
  };

  return (
    <form onSubmit={submit} className="space-y-3 bg-white p-4 rounded shadow">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="mt-1 block w-full border p-2 rounded"
        />
        {errors.title && <div className="text-red-600 text-sm">{errors.title}</div>}
      </div>

      <div>
        <label className="block text-sm font-medium">Author</label>
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          className="mt-1 block w-full border p-2 rounded"
        />
        {errors.author && <div className="text-red-600 text-sm">{errors.author}</div>}
      </div>

      <div>
        <label className="block text-sm font-medium">Publish Year</label>
        <input
          name="publishYear"
          value={form.publishYear}
          onChange={handleChange}
          type="number"
          className="mt-1 block w-full border p-2 rounded"
        />
        {errors.publishYear && <div className="text-red-600 text-sm">{errors.publishYear}</div>}
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Save Book
      </button>
    </form>
  );
}

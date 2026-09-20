import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import SlideOutForm from '../components/home/SlideOutForm';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    publishYear: '',
    description: '',
  });

  const fetchBooks = () => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCreateBook = (event) => {
    event.preventDefault();

    const payload = {
      title: newBook.title,
      author: newBook.author,
      publishYear: Number(newBook.publishYear),
      description: newBook.description,
    };

    axios
      .post('http://localhost:5555/books', payload)
      .then((response) => {
        setBooks((current) => [...current, response.data]);
        setNewBook({ title: '', author: '', publishYear: '', description: '' });
        setDrawerOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <div className='mb-6 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm'>
        <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-sky-700'>Curated Shelf</p>
            <h1 className='mt-2 text-3xl font-black tracking-tight text-slate-900'>ShelfNotes</h1>
            <p className='mt-1 text-sm text-slate-500'>Keep your collection updated, tracked, and beautifully organized.</p>
          </div>

          <div className='flex justify-center items-center gap-x-3 rounded-full bg-slate-100 p-1.5'>
            <button
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                showType === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setShowType('table')}
            >
              Table
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                showType === 'card' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setShowType('card')}
            >
              Card
            </button>
          </div>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <h2 className='text-2xl my-8 font-semibold text-slate-800'>Book Collection</h2>
        <button onClick={() => setDrawerOpen(true)} className='p-2 rounded-full hover:bg-sky-100'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}

      <SlideOutForm isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title='Add New Book'>
        <form onSubmit={handleCreateBook} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Title</label>
            <input
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              className='w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Author</label>
            <input
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              className='w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Publish Year</label>
            <input
              type='number'
              value={newBook.publishYear}
              onChange={(e) => setNewBook({ ...newBook, publishYear: e.target.value })}
              className='w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Description</label>
            <textarea
              rows='4'
              value={newBook.description}
              onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              className='w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300'
              placeholder='Add a summary or paste a description from the internet.'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 rounded-xl transition-colors'
          >
            Save Book
          </button>
        </form>
      </SlideOutForm>
    </div>
  );
};

export default Home;

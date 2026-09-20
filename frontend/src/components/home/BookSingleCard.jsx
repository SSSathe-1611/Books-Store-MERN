import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookModal from './BookModal';
import { useState } from 'react';

export default function BookSingleCard({ book }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2 }}
        className='group relative bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl flex flex-col m-4'
      >
        <div className='aspect-[3/4] w-full rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center mb-4 border border-slate-100 overflow-hidden relative'>
          <span className='text-5xl font-black text-indigo-200/50 uppercase tracking-widest text-center px-4 leading-tight'>
            {book.title ? book.title.substring(0, 2) : 'BK'}
          </span>

          <div className='absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]'>
            <button
              onClick={() => setShowModal(true)}
              className='p-2.5 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-md transition-colors shadow-sm'
              title='Details'
            >
              <Info size={20} />
            </button>
            <Link
              to={`/books/edit/${book._id}`}
              className='p-2.5 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-md transition-colors shadow-sm'
              title='Edit'
            >
              <Edit2 size={20} />
            </Link>
            <Link
              to={`/books/delete/${book._id}`}
              className='p-2.5 bg-red-500/80 hover:bg-red-600 rounded-full text-white backdrop-blur-md transition-colors shadow-sm'
              title='Delete'
            >
              <Trash2 size={20} />
            </Link>
          </div>
        </div>

        <div className='flex-1 flex flex-col'>
          <h3 className='text-lg font-bold text-slate-900 line-clamp-2 leading-tight mb-1'>
            {book.title}
          </h3>
          <p className='text-sm font-medium text-slate-500 mb-4'>
            {book.author}
          </p>
          <div className='mt-auto flex items-center justify-between'>
            <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600'>
              {book.publishYear}
            </span>
          </div>
        </div>
      </motion.div>

      {showModal && <BookModal book={book} onClose={() => setShowModal(false)} />}
    </>
  );
}

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function SlideOutForm({ isOpen, onClose, children, title = 'Add New Book' }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40'
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className='fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-slate-100'
          >
            <div className='flex items-center justify-between p-6 border-b border-slate-100 bg-white/50 backdrop-blur-xl sticky top-0 z-10'>
              <h2 className='text-2xl font-bold text-slate-900 tracking-tight'>
                {title}
              </h2>
              <button
                onClick={onClose}
                className='p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all'
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            <div className='p-8 flex-1 overflow-y-auto'>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

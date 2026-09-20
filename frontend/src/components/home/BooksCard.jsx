import { AnimatePresence } from 'framer-motion';
import BookSingleCard from './BookSingleCard';

const BooksCard = ({ books }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      <AnimatePresence>
        {books.map((item) => (
          <BookSingleCard key={item._id} book={item} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BooksCard;

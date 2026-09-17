import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const BookModal = ({ book, onClose }) => {
  const [description, setDescription] = useState(
    book?.description || 'No description available yet.'
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDescription = async () => {
      const title = (book?.title || '').trim();
      const author = (book?.author || '').trim();

      if (!title) {
        setDescription('No description available yet.');
        return;
      }

      if (book?.description && book.description.trim()) {
        setDescription(book.description);
        return;
      }

      setLoading(true);

      try {
        const query = encodeURIComponent(`${title} ${author}`.trim());
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
            title
          )}`
        );

        if (!response.ok) {
          throw new Error('Summary not found');
        }

        const data = await response.json();

        if (data.extract && data.extract.trim()) {
          setDescription(data.extract.trim());
        } else {
          setDescription(
            `This book, ${title}, is a notable work by ${author || 'its author'} and is best described in your own words. Add a custom summary to personalize the record.`
          );
        }
      } catch (error) {
        setDescription(
          `This book, ${title}, is a notable work by ${author || 'its author'}. If it is not widely documented online, write your own short summary here to personalize the description.`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDescription();
  }, [book]);

  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[420px] bg-white rounded-xl p-4 flex flex-col relative overflow-y-auto'
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
        <h2 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
          {book.publishYear}
        </h2>
        <h4 className='my-2 text-gray-500'>{book._id}</h4>
        <div className='flex justify-start items-center gap-x-2'>
          <PiBookOpenTextLight className='text-red-300 text-2xl' />
          <h2 className='my-1'>{book.title}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-red-300 text-2xl' />
          <h2 className='my-1'>{book.author}</h2>
        </div>
        <p className='mt-4 font-semibold text-gray-700'>Description</p>
        <p className='my-2 text-gray-700 leading-7'>
          {loading ? 'Fetching summary...' : description}
        </p>
      </div>
    </div>
  );
};

export default BookModal;

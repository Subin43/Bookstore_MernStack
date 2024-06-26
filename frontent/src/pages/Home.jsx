import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox} from 'react-icons/md';
import Spinner from '../components/Spinner';
import BooksTable from '../books/BooksTable';
import BooksCard from '../books/BooksCard';

export default function Home() {
  const [books,setBooks] = useState([]);
  const [loading,setLoading] = useState(false);
  const [showType,setShowType] = useState('table')

  useEffect(()=>{
    setLoading(true);
    axios.get('https://bookstore-mernstack-1.onrender.com/books/all')
    .then((res)=>{
      setBooks(res.data.data)
      setLoading(false)
    })
    .catch((error)=>{
      setLoading(false);
      console.log("error:",error.message)
    })
  },[])
  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

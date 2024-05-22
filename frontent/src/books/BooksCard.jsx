import React from 'react'
import BooksSingleCard from './BooksSingleCard'

export default function BooksCard({books}) {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {
            books.map((item,index)=>(
                <BooksSingleCard key={index} book={item} />
            ))
        }
    </div>
  )
}

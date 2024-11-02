import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const SearchTemplate = ({onSearchInput}) => {
  return (
    <div className='p-10 bg-gradient-to-br from-blue-600 via-purple-900  to-blue-700 flex flex-col justify-center items-center shadow-lg'>
        <h2 className='text-3xl max-sm:text-2xl font-bold text-white'>Explore Our Templates</h2>
        <p className='pt-2'>What can we help you build today?</p>
        <div className='w-full flex justify-center'>
            <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[50%]'>
                <FontAwesomeIcon icon={faSearch} className="text-blue-800" />
                <input type="text" placeholder="Search" className="bg-transparent w-full outline-none text-black" onChange={(event)=>onSearchInput(event.target.value)}/>
            </div>
        </div>
    </div>
  )
}

export default SearchTemplate
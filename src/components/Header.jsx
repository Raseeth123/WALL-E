import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className='w-full py-4'>
      <div className='container flex items-center justify-between h-14 max-lg:px-5'>
        <a className='cursor-pointer' href="/">
          <img src="/images/walle.png" width={160} height={55} alt="logo" />
        </a>
        <Link to="/credentials">
         <button className='font-poppins font-bold text-white uppercase rounded-md px-5 py-3 shadow-lg bg-gradient-to-b from-blue-600 to-teal-600'>
          Login
         </button>
         </Link>
      </div>
    </header>
  );
}

export default Header;

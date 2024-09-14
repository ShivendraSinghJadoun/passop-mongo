import React from 'react'
import { FaGithub } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className=' bg-slate-800 text-white'>
      <div className="mycontainer flex justify-between px-4  py-6 h-10 items-center">

        <div className='logo font-bold text-2xl'>
         <span className='text-green-600'> &lt;</span>

         Pass<span className='text-green-600'>OP/&gt;</span>


          </div>
       {/* <ul>
        <li className='flex gap-4'>
            < a className='hover:font-bold'href='/'>Home</a>
            < a className='hover:font-bold' href='#'>About</a>
            < a className='hover:font-bold' href='#'>Contact</a>
        </li>
      </ul>  */}
         
         <button className='text-white bg-green-500  justify-between items-center rounded-full flex '>
          
         <FaGithub className='w-6 p-18  '/>
         <span className='font-bold px-2 ring-white '>Github</span>
         </button>

      </div>
    </nav>
  )
}

export default Navbar

import React from 'react';
import {BrowserRouter,Link, Route, Routes} from 'react-router-dom';
import {logo} from './assets';
import {Home, CreatePost} from './pages/index';
//import {Login, Register} from './components/index'

const App = () => {
  return (
    // Wrap the content with BrowserRouter for routing functionality
    <BrowserRouter>
      {/* Create a header section */}
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b-[#e6ebf4]'>

        {/* Create a link to the home route */}
        <Link to="/">
          {/* Display the logo image */}
          <img className='w-28 object-contain' src={logo} alt='logo'></img>
        </Link>
        
        <Link to='create-post' className='font-inter font-medium bg-slate-900 text-white px-4 py-2 rounded-md'>
          Create Image
        </Link>
      </header>
      
      <main className='sm:p-8 px-4 py-8 w-full bg-slate-200 min-h-[calc(100hv-40)]'>
        
        <Routes>

          <Route path='/' element={<Home/>}></Route>

          <Route path='/create-post' element={<CreatePost/>}></Route>
        
        
        </Routes>


      </main>
    </BrowserRouter>
  )
}


export default App
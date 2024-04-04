import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { Header } from './Components/Components';
import Join from './Pages/Join';
import { useState } from 'react';
import { HomePage } from './Pages/Home';
import { CreatePage } from './Pages/Create';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/join',
      element: <Join />
    },
    {
      path: '/create',
      element: <CreatePage />
    },
  ])


  const [page, setPage] = useState('create');

  return (
    <div className="App">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

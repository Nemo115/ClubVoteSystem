import logo from './logo.svg';
import './App.css';
import { Header } from './Components/Components';
import Join from './Pages/Join';
import { useState } from 'react';
import { HomePage } from './Pages/Home';
import { CreatePage } from './Pages/Create';

function App() {
  const [page, setPage] = useState('create');

  return (
    <div className="App">
      <Header />
      {page === 'join'? <Join /> : null}
      {page === 'home' ? <HomePage /> : null}
      {page === 'create' ? <CreatePage /> : null}
      
    </div>
  );
}

export default App;

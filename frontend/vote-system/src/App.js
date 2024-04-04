import logo from './logo.svg';
import './App.css';
import { Header } from './Components/Components';
import Join from './Pages/Join';
import { useState } from 'react';
import { HomePage } from './Pages/Home';

function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="App">
      <Header />
      {page === 'join'? <Join /> : null}
      {page === 'home' ? <HomePage /> : null}
      
    </div>
  );
}

export default App;

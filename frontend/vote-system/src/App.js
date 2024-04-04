import logo from './logo.svg';
import './App.css';
import { Header } from './Components/Components';
import Join from './Pages/Join';
import { useState } from 'react';

function App() {
  const [page, setPage] = useState('page');

  return (
    <div className="App">
      <Header />
      {page === 'join'? <Join /> : null}
      
    </div>
  );
}

export default App;

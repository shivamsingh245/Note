import './App.css';
import Header from './components/header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AddNewNote from './pages/add-note';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/add-note' element={<AddNewNote />} />
      </Routes>
    </div>
  )
}

export default App;

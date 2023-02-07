import Item1 from './pages/Item1';
import Item2 from './pages/Item2';
import Home from './pages/Home';
import Success from './pages/Success';
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/success' element={<Success/>}/>
      <Route path='/item1' element={<Item1/>}/>
      <Route path='/item2' element={<Item2/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;

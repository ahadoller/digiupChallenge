import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './layout/header';
import HomePage from './pages/home';
import PageProduit from './components/PageProduit';


function App() {
  
  return (
    <BrowserRouter>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produit/:id" element={<PageProduit />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}


export default App;

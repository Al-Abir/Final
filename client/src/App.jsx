import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import Services from './pages/Services.jsx';
import Blog from './pages/Blog.jsx';
import Testimonials from './pages/Testimonials.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SetportfolioData, Showloading, HideLoading, ReloadData } from './redux/rootSlice.js';
import Admin from './pages/Admin/Admin.jsx';
import Loader from './components/Loader.jsx'; // Importing a custom loader component
import Login from './pages/Admin/Login.jsx';

function App() {
  const { loading, portfolioData, reloadData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const getAlldata = async () => {
    try {
      dispatch(Showloading()); 
      const response = await axios.get('/api/v1/portfolio-data');
      dispatch(SetportfolioData(response.data));
      dispatch(ReloadData(false));
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      dispatch(HideLoading()); 
    }
  };

  useEffect(() => {
    if (!portfolioData) {
      getAlldata();
    }
  }, []); // Only run once on mount

  useEffect(() => {
    if (reloadData) {
      getAlldata();
    }
  }, [reloadData]);

  return (
    <BrowserRouter>
      {loading && <Loader />}  {/* Show Loader Component Instead of Plain Text */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/services" element={<Services />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

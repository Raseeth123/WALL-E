import './App.css';
import Header from './components/Header';
import './index.css';
import Hero from './components/Hero';
import Features from './components/Features';
import Steps from './components/Steps';
import Faq from './components/Faq';
import Review from './components/Review';
import Footer from './components/Footer';
import ToolPage from './contents/[template-slug]/ToolPage';
import Credentials from './components/Credentials'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Toast from './components/Toast';
import Sass from './components/Sass';

function App() {
  return (
    <Router>
      <main className='overflow-hidden'>
        <Routes>
          <Route path="/" element={
            <>
              <Header/>
              <Hero/>
              <Features/>
              <Steps/>
              <Faq/>
              {/*<Review/>*/}
              <Footer/>
            </>
          } />
          <Route path="/credentials" element={
            <>
              <Toast />
              <Credentials />
            </>
          } />
          <Route path="/sass" element={<Sass />}/>
          <Route path="/tools/:slug" element={<ToolPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

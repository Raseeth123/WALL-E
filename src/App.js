import './App.css';
import Header from './components/Header';
import './index.css';
import Hero from './components/Hero';
import Features from './components/Features';
import Steps from './components/Steps';
import Faq from './components/Faq';
import Footer from './components/Footer';
import ToolPage from './contents/[template-slug]/ToolPage';
import Credentials from './components/Credentials'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Toast from './components/Toast';
import Sass from './components/Sass';
import ImageGenerator from './components/ImageGenerator';
import History from './components/History';
import { TotalUsageContext } from './context/TotalUsageContext';
import { useState } from 'react';
function App() {
  const [totalUsage,setTotalUsage]=useState(0);
  return (
    <Router>
      <TotalUsageContext.Provider value={{totalUsage,setTotalUsage}}>
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
          <Route path="/image_generator" element={<ImageGenerator/>}/>
          <Route path="/history" element={<History/>}/>
        </Routes>
      </main>
      </TotalUsageContext.Provider>
    </Router>
  );
}

export default App;

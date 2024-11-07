import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { arrayUnion, doc, getDoc, setDoc, updateDoc,getDocs,collection } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeAlt, faHistory, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import UsageTrack from './UsageTrack';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
const ImageGenerator = () => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); 
  const [loading, setLoading] = useState(true);
  const toggleUserMenu = () => setUserMenuOpen(!isUserMenuOpen);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const [useruid,setUserUid]=useState("");
  const [userTools, setUserTools] = useState([]);
  const count=useRef(0);
  const fetchUserData = async (user) => {
    if (user) {
      try {
        const docRef = doc(db, "Users", user?.uid);
        setUserUid(user?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.error("No such document!");
        }
        const toolsRef = collection(db, "Users", user?.uid, "Tools");
        const toolsSnapshot = await getDocs(toolsRef);
        if (!toolsSnapshot.empty) {
          const toolsData = toolsSnapshot.docs.map(doc => doc.data());
          setUserTools(toolsData);
        } else {
          console.error("No tools found for user.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoadingUser(false);
        setLoading(false); 
      }
    } else {
      setLoadingUser(false);
      setLoading(false); 
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) fetchUserData(user);
      else{
        setLoadingUser(false);
        setLoading(false); 
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/credentials", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const [imageData, setImageData] = useState([]);
  const [error, setError] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [loadingImages, setLoadingImages] = useState(false); 

  const fetchImages = async (userPrompt) => {
    const url = 'https://ai-image-generator3.p.rapidapi.com/generate';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': 'cc74a69de6mshed8eda2dd45deedp1b89d6jsn4c49ebed6a32',
        'x-rapidapi-host': 'ai-image-generator3.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: userPrompt, page: 1 })
    };

    try {
      setLoadingImages(true);
      const response = await fetch(url, options);
      const result = await response.json();
      setImageData(shuffleArray(result.results.images).slice(0, 4));
    } catch (err) {
      console.error(err);
      setError('This model currently lacks the capacity to generate images with this level of detail. Please try a simpler prompt.');
    } finally {
      setLoadingImages(false);
    }
  };

  const shuffleArray = (array) => {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('')
    if (prompt) {
      fetchImages(prompt);
      setPrompt('');
    }
  };


  useEffect(() => {
    const storeToDB = async () => {
      if (useruid && imageData.length > 0 && imageData!=='This model currently lacks the capacity to generate images with this level of detail. Please try a simpler prompt.') {
        const toolRef = doc(db, "Users", useruid, "Tools", "image_generator");
        try {
          const formattedDate = new Date().toLocaleDateString('en-GB');
          const entry = {
            Output: imageData,
            date: formattedDate,
            slug:"Image-Generator",
          };
          const docSnap = await getDoc(toolRef);
          if (docSnap.exists()) {
            await updateDoc(toolRef, {
              entries: arrayUnion(entry),
            });
          } else {
            await setDoc(toolRef, {
              entries: [entry],
            });
          }
        } catch (error) {
          console.error("Error saving data to Firestore:", error);
        }
      }
    };
    storeToDB();
  }, [useruid, imageData]);
  

  return (
     <div>
      {loading ? (
        <LoadingSpinner />
      ) : (userDetails?
      (<div className="flex h-screen overflow-hidden">
      <nav className="fixed top-0 z-50 w-full h-22 pt-2 shadow-sm text-gray-900">
        <div className="px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
          <div className="flex items-center">
            <button type="button" onClick={toggleSidebar} aria-controls="logo-sidebar" className="inline-flex items-center p-2 text-white rounded-lg sm:hidden hover:bg-blue-500 focus:ring-2 dark:text-gray-400 dark:focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"/>
              </svg>
            </button>
            <a href="/" className="flex ml-2 md:mr-24">
              <img src="/images/walle.png" alt="Logo" className="h-10 w-28 mr-3" />
            </a>
          </div>
          <div className="flex items-center">
            <button type="button" onClick={toggleUserMenu} className="flex text-sm bg-gray-900 rounded-full focus:ring-2 focus:ring-blue-300" aria-expanded={isUserMenuOpen}>
              {loadingUser ? (
                <div className="animate-spin w-6 h-6 border-4 border-t-transparent rounded-full"></div>
              ) : (
                <img className="w-10 h-10 rounded-full" src={userDetails?.photoURL?.length > 96 ? userDetails?.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"} alt="userphoto" />
              )}
            </button>
            {isUserMenuOpen && (
              <div className="absolute z-50 mt-56 right-4 w-48 bg-white rounded-lg shadow-lg">
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold">{userDetails?.name || ""}</p>
                  <p className="text-xs text-gray-500 truncate">{userDetails?.email || ""}</p>
                </div>
                <ul className="py-1">
                  <li><button className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" onClick={handleSignOut}>Sign out</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
      <aside id="logo-sidebar" className={`fixed top-20 left-0 z-50 w-64 h-full text-blue-950 transform transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`} aria-label="Sidebar" style={{backgroundColor:'white'}}>
        <div className="h-full px-3 pb-8 pt-8 font-poppins font-bold relative">
           <ul className="space-y-2 text-lg">
                <li>
                  <div onClick={()=>navigate("/")} className="flex items-center p-2 py-3 hover:bg-gradient-to-br hover:from-blue-600 hover:via-purple-900 hover:to-blue-700 hover:text-white rounded-lg transition-colors duration-200 cursor-pointer">
                    <FontAwesomeIcon icon={faHomeAlt} className="mr-3" />
                    Home
                  </div>
                </li>
                <li>
                  <div onClick={()=>navigate("/history")} className="flex items-center p-2 py-3 hover:bg-gradient-to-br hover:from-blue-600 hover:via-purple-900 hover:to-blue-700 hover:text-white rounded-lg transition-colors duration-200 cursor-pointer">
                    <FontAwesomeIcon icon={faHistory} className="mr-3" />
                    History
                  </div>
                </li>
              </ul>
          <div className='absolute bottom-100 w-full left-0'>
            <UsageTrack />
          </div>
        </div>
      </aside>
      <main className="flex-1 ml-0 mt-20 h-[calc(100vh-5rem)] w-full overflow-y-auto bg-gray-200 sm:ml-64">
        <Link to={"/sass"}>
            <button className='text-lg mt-4 ml-5 w-22 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold py-2 rounded-md'>
            <FontAwesomeIcon icon={faArrowLeft}/> Back
            </button>
        </Link>
        <div className="flex flex-col items-center p-4">
          <h1 className="text-2xl font-bold mb-4 text-blue-800">AI Image Generator</h1>
          <form onSubmit={handleSubmit} className="mb-4 w-full max-w-md">
            <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter a word, and we’ll transform it into a visual." className="w-full p-2 border border-gray-300 text-black rounded mb-2 active:ring-blue-400" required />
            <button type="submit" className="font-semibold w-full bg-gradient-to-br from-blue-600 via-purple-900 to-blue-700 text-white p-3 rounded-lg">Generate Images</button>
          </form>
          {error && <p className="text-red-700">{error}</p>}
          {loadingImages && <div className="text-center text-blue-800">AI is Making Visuals...</div>}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 h-auto">
            {imageData.map((image, index) => (
              <img key={index} src={image} alt={`Generated image ${index + 1}`} className="w-full h-96 object-cover rounded shadow-md gap-9"/>
            ))}
          </div>
          <div className='mt-64'>
          <h2 className="text-3xl font-bold mb-4 text-blue-800 text-center">Gallery</h2>
          <p className="text-center text-gray-700 mb-8">You can see the generated images here.</p>
            <div>
            { 
              userTools && userTools.length > 0 ? (
                userTools.map((tool, index) => 
                  tool.entries
                    .filter(entry => entry.slug === 'Image-Generator')
                    .map((entry) => ( 
                      <div key={count.current++} className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2">
                        {entry.Output.map((image, imgIndex) => (
                          <div key={imgIndex} className="mb-2">
                            <img src={image} alt=" GeneratedImage " className="w-full h-96 object-cover rounded shadow-md"/>
                          </div>
                        ))}
                      </div>
                    ))
                )
              ) : (
                <div> </div>
              )
            }
          </div>
          {
            count.current===0 ? (
              <div className="text-center py-4 text-blue-700"> No Images available in the Gallery </div>
            ):(<div></div>)
          }
          </div>
        </div>
      </main>
    </div>): navigate('/credentials')
     )
      }
    </div>
  );
};

export default ImageGenerator;

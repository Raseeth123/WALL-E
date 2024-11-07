import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeAlt, faHistory,faCopy,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import UsageTrack from './UsageTrack';
import LoadingSpinner from './LoadingSpinner';
const History = () => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userTools, setUserTools] = useState([]);
  const toggleUserMenu = () => setUserMenuOpen(!isUserMenuOpen);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const fetchUserData = async (user) => {
    if (user) {
      try {
        const docRef = doc(db, "Users", user?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("No such document!");
        }
        const toolsRef = collection(db, "Users", user?.uid, "Tools");
        const toolsSnapshot = await getDocs(toolsRef);
        if (!toolsSnapshot.empty) {
          const toolsData = toolsSnapshot.docs.map(doc => doc.data());
          setUserTools(toolsData);
        } else {
          console.log("No tools found for user.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user);
      } else {
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

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  };

  const handleBackClick = () => { 
    navigate("/sass", { replace: true }); 
  }

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (userDetails ? (
        <div className="flex h-screen overflow-hidden">
          <nav className="fixed top-0 z-50 w-full h-22 pt-2 shadow-sm text-gray-900">
            <div className="px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
              <div className="flex items-center">
                <button type="button" onClick={toggleSidebar} aria-controls="logo-sidebar" className="inline-flex items-center p-2 text-white rounded-lg sm:hidden hover:bg-blue-500 focus:ring-2 dark:text-gray-400 dark:focus:ring-gray-600">
                  <span className="sr-only">Open sidebar</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"/>
                  </svg>
                </button>
                <a href="/" className="flex ml-2 md:mr-24"><img src="/images/walle.png" alt="Logo" className="h-10 w-28 mr-3" /></a>
              </div>
              <div className="flex items-center">
                <button type="button" onClick={toggleUserMenu} className="flex text-sm bg-gray-900 rounded-full focus:ring-2 focus:ring-blue-300" aria-expanded={isUserMenuOpen}>
                  {loading ? (
                    <div className="animate-spin w-6 h-6 border-4 border-t-transparent rounded-full"></div>
                  ) : (
                    <img className="w-10 h-10 rounded-full" src={userDetails?.photoURL?.length > 96 ? userDetails.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"} alt="userphoto" />
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
          <aside id="logo-sidebar" className={`fixed top-20 left-0 z-50 w-64 h-full text-blue-950 transform transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`} aria-label="Sidebar" style={{ backgroundColor: 'white' }}>
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
            <button 
              onClick={handleBackClick} 
              className='text-lg mt-4 ml-5 w-22 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold py-2 rounded-md'>
              <FontAwesomeIcon icon={faArrowLeft}/> Back
            </button>
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4 text-blue-800">Your Tools History</h2>
              <div className="hidden sm:block bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg text-black">
                  <thead>
                    <tr className="bg-blue-800 text-left text-white text-base">
                      <th className="px-6 py-3 font-semibold">Logo</th>
                      <th className="px-6 py-3 font-semibold">Tool Name</th>
                      <th className="px-6 py-3 font-semibold">AI Output</th>
                      <th className="px-6 py-3 font-semibold">Used On</th>
                      <th className="px-6 py-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userTools && userTools.length > 0 ? (
                      userTools.map((tool, index) =>
                        tool.entries
                          .filter(entry => entry.slug !== 'Image-Generator')
                          .map((entry, subIndex) => (
                            <tr key={`${index}-${subIndex}`} className="border-b">
                              <td className="px-6 py-4">
                                <img src={entry.image} alt={entry.name || "Tool"} className="h-8 w-8 rounded" />
                              </td>
                              <td className="px-6 py-4">{entry.name}</td>
                              <td className="px-6 py-4">{String(entry.Output).split(" ").slice(0, 20).join(" ")}...</td>
                              <td className="px-6 py-4">{entry.date}</td>
                              <td className="px-6 py-4">
                                <button className="text-base w-22 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold py-2 rounded-md" onClick={() => handleCopyToClipboard(entry.output)}>
                                  <FontAwesomeIcon icon={faCopy} /> Copy
                                </button>
                              </td>
                            </tr>
                          ))
                      )
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-gray-600"> No tools history available. </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="sm:hidden space-y-4 text-black">
                {userTools && userTools.length > 0 ? (
                  userTools.map((tool, index) =>
                    tool.entries
                      .filter(entry => entry.slug !== 'Image-Generator')
                      .map((entry, subIndex) => (
                        <div key={`${index}-${subIndex}`} className="bg-white p-4 rounded-lg shadow-md">
                          <div className="flex items-center mb-2">
                            <img src={entry.image} alt={entry.name || "Tool"} className="h-10 w-10 rounded mr-3" />
                            <h3 className="font-bold text-lg">{entry.name}</h3>
                          </div>
                          <p className="text-gray-700"><strong>AI Output:</strong> {String(entry.Output).split(" ").slice(0, 10).join(" ")}...</p>
                          <p className="text-gray-600"><strong>Used On:</strong> {entry.date}</p>
                          <button className="mt-3 w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold py-2 rounded-md" onClick={() => handleCopyToClipboard(entry.Output)}><FontAwesomeIcon icon={faCopy} /> Copy
                          </button>
                        </div>
                      ))
                  )
                ) : (
                  <p className="text-center py-4 text-gray-600">No tools history available.</p>
                )}
              </div>
            </div>
          </main>
        </div>
      ) : (
        <p className="text-center p-4">No Details Found</p>
      ))}
    </div>
  );
};

export default History;

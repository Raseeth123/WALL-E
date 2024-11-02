import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { doc, getDoc } from "firebase/firestore";
import SearchTemplate from './SearchTemplate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHistory, faFileInvoice, faCog } from '@fortawesome/free-solid-svg-icons';
import TemplateList from './TemplateList';
const Sass = () => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); 
  const toggleUserMenu = () => setUserMenuOpen(!isUserMenuOpen);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const fetchUserData = async (user) => {
    if (user) {
      try {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log("User data:", docSnap.data());
        } else {
          console.log("No such document!");
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

  const[userSearchInput,setUserSearchInput]=useState("");

  

  return (
      <div className="flex h-screen overflow-hidden">
        <nav className="fixed top-0 z-50 w-full h-20 pt-2 shadow-lg text-gray-900">
          <div className="px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
            <div className="flex items-center">
              <button type="button" onClick={toggleSidebar} aria-controls="logo-sidebar" className="inline-flex items-center p-2 text-white rounded-lg sm:hidden hover:bg-blue-500 focus:ring-2 dark:text-gray-400 dark:focus:ring-gray-600"><span className="sr-only">Open sidebar</span><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"/></svg></button>
              <a href="/" className="flex ml-2 md:mr-24"><img src="/images/walle.png" alt="Logo" className="h-10 w-28 mr-3" /></a>
            </div>
            <div className="flex items-center">
              <button type="button" onClick={toggleUserMenu} className="flex text-sm bg-gray-900 rounded-full focus:ring-2 focus:ring-blue-300" aria-expanded={isUserMenuOpen}>
                {loading ? ( 
                  <div className="animate-spin w-6 h-6 border-4 border-t-transparent rounded-full"></div>
                ) : (
                  <img className="w-10 h-10 rounded-full" src={ userDetails?.photoURL.length>96  && userDetails?.photoURL ? userDetails?.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"} alt="userphoto" />
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
        <aside 
          id="logo-sidebar" 
          className={`fixed top-20 left-0 z-50 w-64 h-full bg-gray-900 text-gray-100 border-r-4 border-blue-600 transform transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`} 
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-8 pt-8 font-poppins font-bold">
          <ul className="space-y-2 text-lg">
            <li>
              <a href="/" className="flex items-center p-2 py-3 text-gray-100 hover:bg-violet-700 rounded-lg">
                <FontAwesomeIcon icon={faHome} className="mr-3" />
                Home
              </a>
            </li>
            <li>
              <a href="/" className="flex items-center p-2 py-3 text-gray-100 hover:bg-violet-700 rounded-lg">
                <FontAwesomeIcon icon={faHistory} className="mr-3" />
                History
              </a>
            </li>
            <li>
              <a href="/" className="flex items-center p-2 py-3 text-gray-100 hover:bg-violet-700 rounded-lg">
                <FontAwesomeIcon icon={faFileInvoice} className="mr-3" />
                Billing
              </a>
            </li>
            <li>
              <a href="/" className="flex items-center p-2 py-3 text-gray-100 hover:bg-violet-700 rounded-lg">
                <FontAwesomeIcon icon={faCog} className="mr-3" />
                Settings
              </a>
            </li>
          </ul>
        </div>
        </aside>
        <main className="flex-1 ml-0 mt-20 h-[calc(100vh-5rem)] w-full overflow-y-auto bg-gray-100 sm:ml-64">
          <SearchTemplate onSearchInput={(val)=>setUserSearchInput(val)}/>
          <TemplateList userSearchInput={userSearchInput}/>
        </main>
      </div>
  );
};

export default Sass;

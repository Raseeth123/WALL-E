import React,{useState,useEffect, useContext} from 'react'
import { auth, db } from './firebase';
import { doc, getDoc,collection,getDocs } from "firebase/firestore";
import { TotalUsageContext } from '../context/TotalUsageContext';
const UsageTrack = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [userTools, setUserTools] = useState([]);
  const {totalUsage,setTotalUsage}=useContext(TotalUsageContext);
  const fetchUserData = async (user) => {
    if(user){
      try {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.error("No such document!");
        }
        const toolsRef = collection(db, "Users", user.uid, "Tools");
        const toolsSnapshot = await getDocs(toolsRef);
        if (!toolsSnapshot.empty) {
          const toolsData = toolsSnapshot.docs.map(doc => doc.data());
          setUserTools(toolsData);
        } else {
          console.error("No tools found for user.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } 
    } 
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user);
      } 
    });
    return () => unsubscribe();
  }, []);

 const getTotalUsage=()=>{
  let total=0;
  if(userTools?.length>0){
    userTools.map((tool)=>{
      tool.entries.map((entry)=>(
        total+=Number((String(tool.Output).length)*5)
      ))
    })
    setTotalUsage(total);
  }
 }

 useEffect(()=>{
   getTotalUsage()
 },[userTools,userDetails])

  return (
    <div className='m-5'>
        <div className="bg-gradient-to-br from-blue-600 via-purple-900 to-blue-700 text-white p-3 rounded-lg">
            <h2 className='font-semibold'>Credits</h2>
            <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
                <div className='h-2 bg-white rounded-full' style={{width:(totalUsage/10000)*100}}></div>
            </div>
            <h2 className='text-sm my-2 font-thin'>{totalUsage}/10,000 Credits Used</h2>
        </div>
        <button className='bg-slate-200 text-blue-800 p-3 rounded-lg w-full my-3'>Upgrade</button>
    </div>
  )
}

export default UsageTrack
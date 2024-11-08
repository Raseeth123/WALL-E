import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from './firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Credentials = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!password || !confirmPassword) {
        throw new Error("Password fields cannot be empty");
      }
      if (password !== confirmPassword) throw new Error("Passwords do not match");
      if (password.length < 6) throw new Error("Password must be at least 6 characters");
  
      const userCredential = await createUserWithEmailAndPassword(auth, mail, password);
      const user = userCredential.user;
      await setDoc(doc(db, "Users", user.uid), { email: user.email, name: name });
      navigate("/sass", { replace: true });
    } catch (error) {
      toast.error(error.message, { position: "top-right" });
    }
  };
  

  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;
      if (user) {
        const userDocRef = doc(db, "Users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          await setDoc(userDocRef, { 
            email: user.email, 
            name: user.displayName, 
            photoURL: user.photoURL 
          });
        }
        navigate("/sass", { replace: true });
      }
    })
  }
  return (
    <section className="w-full h-screen flex flex-wrap bg-gray-50">
      <div className="max-lg:w-full w-2/5 bg-gradient-to-b from-blue-950 to-teal-700 text-white flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-opacity-20 backdrop-blur-lg">
          <div className="flex justify-center mb-6">
            <img src="/images/walle.png" alt="logo" width={160} height={55} />
          </div>
          <p className="text-center text-gray-200 mb-6 max-lg:hidden">Sign up to access exclusive features</p>
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label htmlFor="name" className="text-gray-200">Username</label>
              <input type="text" name="name" id="name" className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-teal-300 text-gray-900 placeholder-gray-400" placeholder="Enter your username" required onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-200">Email</label>
              <input type="email" name="email" id="email" className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-teal-300 text-gray-900 placeholder-gray-400" placeholder="name@gmail.com" required onChange={(e) => setMail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-200">Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••" className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-teal-300 text-gray-900 placeholder-gray-400" required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-gray-200">Confirm Password</label>
              <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-teal-300 text-gray-900 placeholder-gray-400" required onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button type="submit" className="w-full py-3 mt-4 bg-blue-700 text-white rounded-lg shadow-lg font-bold transition duration-200">Sign Up</button>
            <div className="flex items-center justify-center my-4">
              <hr className="w-1/4 border-gray-300" />
              <span className="mx-4 text-sm text-gray-300">or</span>
              <hr className="w-1/4 border-gray-300" />
            </div>
          </form>
          <button onClick={googleLogin} type="button" className="w-full py-3 mt-2 bg-black text-white rounded-lg shadow-lg font-bold transition duration-200 flex items-center justify-center">
            <FcGoogle className="w-5 h-5 mr-2" />
            Sign In with Google
          </button>
        </div>
      </div>
      <div className="max-lg:hidden w-3/5 relative">
        <img src="https://img.freepik.com/premium-photo/space-suit-with-space-suit-it_1208742-883.jpg?semt=ais_hybrid" className="h-screen w-full object-cover opacity-95" alt="Login visual" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-900 opacity-40"></div>
      </div>
    </section>
  );
};

export default Credentials;

//https://app.leonardo.ai/_next/image?url=%2Fimg%2Flogin-hero-images%2FFemaleAdventurer4.webp&w=3840&q=75
//https://img.freepik.com/premium-photo/space-suit-with-space-suit-it_1208742-883.jpg?semt=ais_hybrid
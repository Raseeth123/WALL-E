import React, { useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from '../../components/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import { template } from '../../constants';
const OutputSection = ({ aiOutput, userFormInput, toolSlug }) => {
  const weburl=useParams()
  const editorRef = useRef();
  const [usersUid, setUsersUid] = useState(null);
  const fetchUserData = (user) => {
    if(user){
     setUsersUid(user.uid);
    }
  };

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user){
        fetchUserData(user);
      } else {
        console.error("No user authenticated.");
      }
    });
    return () => unsubscribe();
  }, [aiOutput]);


  useEffect(() => {
    const storeToDB = async () => {
      const historydata=template.filter((e)=>e.slug==weburl.slug)
      if (usersUid && aiOutput && toolSlug) {
        const toolRef = doc(db, "Users", usersUid, "Tools", toolSlug);
        try {
          const formattedDate = new Date().toLocaleDateString('en-GB'); 
          const entry = {
            name:historydata[0].name,
            Output: aiOutput,
            date: formattedDate,
            slug:toolSlug,
            image:historydata[0].icon,
          };
          const docSnap = await getDoc(toolRef);
          if (docSnap.exists()) {
            await updateDoc(toolRef, {
              entries: arrayUnion(entry)
            });
          } else {
            await setDoc(toolRef, {
              entries: [entry]
            });
          }
        } catch (error) {
          console.error("Error saving data to Firestore:", error);
        }
      }
    };

    storeToDB();
  }, [aiOutput, usersUid, toolSlug]);

  return (
    <div className='bg-white shadow-lg border rounded-lg'>
      <div className='flex justify-between items-center p-5'>
        <h2 className='text-lg font-semibold text-blue-700'>Your Result</h2>
        <button 
          className='text-base w-22 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold py-2 rounded-md'
          onClick={() => navigator.clipboard.writeText(aiOutput)}>
          <FontAwesomeIcon icon={faCopy}/>Copy
        </button>
      </div>
      <Editor ref={editorRef} initialValue="Your result will appear here" initialEditType="wysiwyg" height="600px" useCommandShortcut={true}/>
    </div>
  );
};

export default OutputSection;

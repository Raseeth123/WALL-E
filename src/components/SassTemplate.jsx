import React,{useState} from 'react'
import TemplateList from './TemplateList';
import SearchTemplate from './SearchTemplate';
const SassTemplate = () => {
  const[userSearchInput,setUserSearchInput]=useState("");
  return (
    <main className="flex-1 ml-0 mt-20 h-[calc(100vh-5rem)] w-full overflow-y-auto bg-gray-200 sm:ml-64">
        <SearchTemplate onSearchInput={(val)=>setUserSearchInput(val)}/>
        <TemplateList userSearchInput={userSearchInput}/>
   </main>
  )
}

export default SassTemplate
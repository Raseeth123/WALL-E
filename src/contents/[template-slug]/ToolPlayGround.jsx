import React, { useContext, useState } from 'react'
import FormSection from './FormSection'
import OutputSection from './OutputSection'
import { template } from '../../constants'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { chatSession } from '../../utils/AiModel';
import { TotalUsageContext } from '../../context/TotalUsageContext';
import { toast } from 'react-toastify';
const ToolPlayGround = ({ slug }) => {
  const selectedTemplate = template.find((item) => item.slug === slug);
  const [aiOutput, setAiOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {totalUsage,setTotalUsage}=useContext(TotalUsageContext);
  const GenerateAIContent = async (formData) => {
    if(totalUsage>=10000){
      toast.error("Your Limit has Exceeded Please Upgrade Your Plan", { position: "top-right" });
      navigate("/sass");
    }
    setIsLoading(true);
    const selectedPrompt = selectedTemplate.aiPrompt;
    const finalAIPrompt = JSON.stringify(formData) + "," + selectedPrompt;
    try {
      const result = await chatSession.sendMessage(finalAIPrompt);
      setAiOutput(await result.response.text());
    } catch (error) {
      setAiOutput("Error generating content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleBackClick = () => { 
    navigate("/sass", { replace: true }); 
    setIsLoading(true);
  }

  return (
    <div className='relative p-2'>
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-90 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <p className="ml-4 text-blue-500 font-semibold text-lg">AI is Thinking, please wait...</p>
        </div>
      )}
      {!isLoading && (
        <>
          <button 
            onClick={handleBackClick} 
            className='text-lg mt-4 ml-5 w-22 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold py-2 rounded-md'>
            <FontAwesomeIcon icon={faArrowLeft}/> Back
          </button>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5 text-black'>
            <div className='col-span-1'>
              <FormSection selectedTemplate={selectedTemplate} userFormInput={(e) => GenerateAIContent(e)} />
            </div>
            <div className='col-span-1 md:col-span-2 lg:col-span-2'>
              <OutputSection aiOutput={aiOutput} userFormInput={(e) => GenerateAIContent(e)} toolSlug={slug}/>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ToolPlayGround;

import React, { useState } from 'react';

const FormSection = ({ selectedTemplate,userFormInput,loading }) => {

  const [formData,setFormData]=useState();
  const onSubmit=(e)=>{
    e.preventDefault();
    userFormInput(formData);
  }

  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value})
  }
  return (
    <div className='p-6 shadow-lg border rounded-lg bg-gradient-to-br from-white via-gray-50 to-gray-100'>
      <img src={selectedTemplate?.icon} alt="Icon" width={70} height={70} className="mb-4" />
      <h2 className='font-bold text-2xl mb-3 text-indigo-700'>{selectedTemplate?.name}</h2>
      <p className='text-gray-600 text-sm mb-5'>{selectedTemplate?.desc}</p>
      <form onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div key={index} className="mb-4">
            <label className='block text-gray-800 font-semibold mb-2'>{item.label}</label>
            {item?.field === 'textarea' ? (
              <textarea rows={11} placeholder={item?.placeholder} name={item?.name} required={item?.required} type="textarea" className="block p-2.5 w-full text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" onChange={handleInputChange} autoComplete='off'/>
            ) : (<input name={item?.name} required={item?.required} type="text" placeholder={item?.placeholder} className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500' onChange={handleInputChange} autoComplete='off'/>
            )}
          </div>
        ))}
        <button disabled={loading} type="submit" className="text-base mt-4 w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold py-2 rounded-md">Generate Content</button>
      </form>
    </div>
  );
};

export default FormSection;

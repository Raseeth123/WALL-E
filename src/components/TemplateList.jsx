import React, { useEffect, useState } from 'react';
import { template } from '../constants';
import { useNavigate } from 'react-router-dom';

const TemplateList = ({ userSearchInput }) => {
    const [templatelist, setTemplateList] = useState(template);
    const navigate = useNavigate();

    useEffect(() => {
        if (userSearchInput) {
            const filterData = template.filter(item => item.name.toLowerCase().includes(userSearchInput.toLowerCase()));
            setTemplateList(filterData);
        } else {
            setTemplateList(template);
        }
    }, [userSearchInput]);

    const handleTemplateClick = (slug) => {
        navigate(`/tools/${slug}`); 
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-6 p-5'>
            {templatelist.map((item, index) => (
                <div key={index} onClick={() => handleTemplateClick(item.slug)} className='flex flex-col items-center text-black p-6 bg-white shadow-md rounded-lg border cursor-pointer hover:shadow-lg transition'>
                    <div className='flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-200 p-3'>
                        <img src={item.icon} alt="icon" width={50} height={50} className='object-cover' />
                    </div>
                    <h2 className='font-poppins font-semibold text-lg md:text-xl mb-2 text-center'>{item.name}</h2>
                    <p className='text-gray-600 text-justify text-sm md:text-base font-medium'>{item.desc}</p>
                </div>
            ))}
        </div>
    );
};

export default TemplateList;

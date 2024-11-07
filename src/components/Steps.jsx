import React from 'react';
import { steps } from '../constants';

const Steps = () => {
  return (
    <div className="flex flex-col items-center mt-22">
      <div className="text-center mb-20">
        <h3 className="h3 max-md:h5 font-semibold text-p4">
          Get Started with Wall-E’s AI Tools
        </h3>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 w-full px-4 md:px-10 mb-6 gap-6">
        {steps.map((item,index)=>(
              <div className="w-full md:w-80 h-45 p-6 lg:border-t-4 max-md:border-l-4 border-s3 text-p4">
               <p className="mt-2 font-poppins text-lg caption">{item.name}</p>
               <h4 className="text-xl font-semibold mb-5">{item.desc}</h4>
               <p className="mt-2 font-poppins text-base">{item.text}</p>
             </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;

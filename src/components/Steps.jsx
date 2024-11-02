import React from 'react';

const Steps = () => {
  return (
    <div className="flex flex-col items-center mt-22">
      <div className="text-center mb-20">
        <h3 className="h3 max-md:h5 font-semibold text-p4">
          Chat Instantly with Your AI
        </h3>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 w-full px-4 md:px-10 mb-6">
        <div className="w-full md:w-80 h-45 p-6 lg:border-t-4 max-md:border-l-4 border-s3 text-p4">
          <p className="mt-2 font-poppins text-lg caption">Step-1</p>
          <h4 className="text-xl font-semibold mb-5">Sign Up for Free</h4>
          <p className="mt-2 font-poppins text-base">Create your account at no cost to access your personalized AI chatbot, ready to assist you.</p>
        </div>
        <div className="w-full md:w-80 h-45 p-6 lg:border-t-4 max-md:border-l-4 border-s3 text-p4">
          <p className="mt-2 font-poppins text-lg caption">Step-2</p>
          <h4 className="text-xl font-semibold mb-5">Personalize Experience</h4>
          <p className="mt-2 font-poppins text-base">Tailor your chatbot's personality and responses to suit your needs and preferences effortlessly.</p>
        </div>
        <div className="w-full md:w-80 h-45 p-6 lg:border-t-4 max-md:border-l-4 border-s3 text-p4">
          <p className="mt-2 font-poppins text-lg caption">Step-3</p>
          <h4 className="text-xl font-semibold mb-5">Start Conversing</h4>
          <p className="mt-2 font-poppins text-base">Engage in real-time conversations with your AI chatbot, just like chatting with a friend!</p>
        </div>
      </div>
    </div>
  );
};

export default Steps;

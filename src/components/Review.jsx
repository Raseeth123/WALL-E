import React from 'react';
import { review } from '../constants';

const Review = () => {
  return (
    <>
      <div className="text-center mb-10 mt-20">
        <h3 className="h3 max-md:h5 font-semibold text-p4">
          User Insights
        </h3>
      </div>
      <div className="text-center mb-16">
        <p className="text-lg md:text-xl text-p4 leading-relaxed">
          Discover how others are enhancing their experience with WALL-E.
        </p>
      </div>
      <div
        className="grid gap-10 md:gap-12 p-8 md:grid-cols-2 lg:grid-cols-2 mb-12 md:mb-16 rounded-xl"
      >
        {review.map((item) => (
          <figure key={item.id} className="flex flex-col items-center justify-center p-8 rounded-lg shadow-lg border border-gray-700" style={{ borderColor: '#334679', backgroundColor: '#0D1126' }}>
            <blockquote className="text-center text-gray-200">
              <h3 className="text-2xl font-semibold text-white mb-4">
                {item.subject}
              </h3>
              <p className="text-md leading-relaxed mb-6 text-gray-300">
                {item.content}
              </p>
            </blockquote>
            <figcaption className="flex items-center mt-4 space-x-4">
              <img className="rounded-full border-2 border-gray-600" src={item.image} alt="profilepicture" style={{width:'50px',height:'55px'}} />
              <div className="text-left">
                <div className="text-lg font-medium text-white">
                  {item.name}
                </div>
                <div className="text-sm text-gray-400">{item.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

    </>
  );
};

export default Review;

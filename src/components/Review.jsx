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
      <div className="text-center mb-20">
        <p className="body-1 text-p4">
          See what others are saying about their experience with WALL-E.
        </p>
      </div>
      <div className="grid gap-8 p-6 md:grid-cols-2 lg:grid-cols-2 mb-8 md:mb-12" style={{ backgroundColor: '#05091D' }}>
        {review.map((item) => (
          <figure key={item.id} className="flex flex-col items-center justify-center p-6 rounded-md shadow-lg border-2" style={{ borderColor: '#334679', backgroundColor: '#05091D' }}>
            <blockquote className="text-center text-gray-200">
              <h3 className="text-xl font-semibold text-white">{item.subject}</h3>
              <p className="mt-3 mb-5">{item.content}</p>
            </blockquote>
            <figcaption className="flex items-center space-x-3">
              <img className="rounded-full w-12 h-14" src={item.image} alt="profilepicture" />
              <div className="text-left">
                <div className="text-sm font-medium text-white">{item.name}</div>
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

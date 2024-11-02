import React from 'react';
import { useParams } from 'react-router-dom';

const ToolPage = () => {
  const { slug } = useParams();
  return (
    <div>
      <h1>Tool Details for {slug}</h1>
    </div>
  );
};

export default ToolPage;

import React from 'react';
import { useParams } from 'react-router-dom';

const InfoPage = () => {
  const { name_line } = useParams();

  return (
    <div>
      <h1>Info Page</h1>
      <p>Feature Name: {name_line}</p>
      {/* Add more details based on the feature name */}
    </div>
  );
};

export default InfoPage;

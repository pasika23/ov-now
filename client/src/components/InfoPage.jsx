import React from 'react';
import { useParams } from 'react-router-dom';

const InfoPage = () => {
  const { featureId } = useParams();

  return (
    <div>
      <h1>Info Page</h1>
      <p>Feature Name: {featureId}</p>
      {/* Add more details based on the feature name */}
    </div>
  );
};

export default InfoPage;

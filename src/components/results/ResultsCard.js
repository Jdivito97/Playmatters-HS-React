import React from 'react';
import './ResultsCard.scss';
import PaginationArea from '../pagination/Pagination';

const ResultsCard = (groups) => {
  const { key, name, locName, suburb, address, city, desc } = groups;

  return (
    <>
      <div className="resultCard" id={key}>
        <h1>{name}</h1>
        <h2>{locName}</h2>
        <h3>{suburb}</h3>
        <p>{address}</p>
        <p>{city}</p>
        <h4>{desc}</h4>
      </div>
    </>
  );
};

export default ResultsCard;

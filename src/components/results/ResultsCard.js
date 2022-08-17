import React from 'react';
import './ResultsCard.scss';
import PaginationArea from '../pagination/Pagination';

const ResultsCard = (splitGroups) => {
  const { key, name, locName, suburb, address, city, desc, state, postCode } =
    splitGroups;

  return (
    <>
      <div className="resultCard" id={key}>
        <h1>{name}</h1>
        <h2>{locName}</h2>
        <h3>{suburb}</h3>
        <p>
          {address},{city}
        </p>
        <p>
          {state}, {postCode}
        </p>
        <h4>{desc}</h4>
      </div>
    </>
  );
};

export default ResultsCard;

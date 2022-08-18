import React, { useEffect, useState } from 'react';
import './ResultsCard.scss';

const ResultsCard = (splitGroups) => {
  const {
    key,
    name,
    locName,
    suburb,
    groupSearchTerm = '',
    address,
    city,
    desc,
    state,
    postCode,
  } = splitGroups;

  // filter results based on search input
  // useEffect(() => {}, [groupSearchTerm]);

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

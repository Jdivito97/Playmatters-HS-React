import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Search.scss';
import { Input, InputAdornment, IconButton } from '@mui/material';
import { BiSearchAlt } from 'react-icons/bi';
import ResultsCard from '../results/ResultsCard';
import PaginationArea from '../pagination/Pagination';

const SearchBar = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [region, setRegion] = useState(null);
  const [groups, setGroups] = useState({});

  const playData = `https://playmatters.org.au/_hcms/api/get/all/playgroups?portalid=19986643&offset=${region}`;

  const handleInputChange = (e) => {
    console.log('handleInputChange()', { e });
    setInput(e.target.value);
    e.preventDefault();
  };
  const handleSearch = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      setRegion(input);
    }
  };

  useEffect(() => {
    setLoading(true);

    if (region)
      axios
        .get(playData)
        .then((response) => {
          setGroups(
            response.data.response.query.data.CRM.p_playgroup_collection.items,
          );
          console.log({
            res: response.data.response.query.data.CRM.p_playgroup_collection
              .items,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error({ error });
        });
  }, [region]);

  // const split = (groups, size) => {
  //   const splitGroups = [];
  //   groups = [].concat(...groups);

  //   while (groups.length) {
  //     splitGroups.push(groups.splice(0, size));
  //   }

  //   return splitGroups;
  // };

  // split(groups, 7);
  // console.log({ split });

  return (
    <>
      <div className="searchBody">
        <Input
          onChange={handleInputChange}
          onKeyDown={handleSearch}
          value={input}
          className="searchBar"
          type="text"
          placeholder="Search..."
          endAdornment={
            <InputAdornment position="end">
              <IconButton className="btn" onClick={handleSearch} edge="end">
                <BiSearchAlt />
              </IconButton>
            </InputAdornment>
          }
        />
        <div className="resultsContainer">
          {region &&
            (loading ? (
              <div className="loadContainer">
                <h1>Now Loading...</h1>
                {/* <img
                src={require('../../images/l
                oading_gif.gif')}
                alt="loading"
                className="loading"
              /> */}
              </div>
            ) : (
              groups.map((group, index) => {
                return (
                  <>
                    <ResultsCard
                      key={index}
                      name={group.name}
                      locName={group.pg_location_name}
                      suburb={group.pg_suburb}
                      address={group.pg_address}
                      city={group.pg_city}
                      desc={groups.pg_descrtiption}
                    />
                  </>
                );
              })
            ))}
        </div>
        {region && !loading && <PaginationArea />}
      </div>
    </>
  );
};

export default SearchBar;

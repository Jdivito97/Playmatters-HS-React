import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Search.scss';
import { Input, InputAdornment, IconButton } from '@mui/material';
import { BiSearchAlt } from 'react-icons/bi';
import ResultsCard from '../results/ResultsCard';
import { PaginationRow, Paginator } from '../pagination/Pagination.styles';
import { chunkArray } from '../../helpers';

const Search = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [playData, setPlayData] = useState({});
  const [searchTerm, setSearchTerm] = useState(null);
  const [groups, setGroups] = useState({});
  const [splitGroups, setSplitGroups] = useState(groups);

  // prettier-ignore
  const promise1= axios.get(`https://playmatters.org.au/_hcms/api/get/all/playgroups?portalid=19986643&offset=0`)
  // prettier-ignore
  const promise2=axios.get(`https://playmatters.org.au/_hcms/api/get/all/playgroups?portalid=19986643&offset=140`)
  // prettier-ignore
  const promise3=axios.get(`https://playmatters.org.au/_hcms/api/get/all/playgroups?portalid=19986643&offset=210`)
  // prettier-ignore
  const promise4=axios.get(`https://playmatters.org.au/_hcms/api/get/all/playgroups?portalid=19986643&offset=280`)
  // prettier-ignore
  const promise5=axios.get(`https://playmatters.org.au/_hcms/api/get/all/playgroups?portalid=19986643&offset=350`)
  // prettier-ignore
  const promise6=axios.get(`https://playmatters.org.au/_hcms/api/get/all/playgroups?portalid=19986643&offset=420`)

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.preventDefault();
  };
  const handleSearch = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      setSearchTerm(input);
    }
  };

  const changePage = (e, value) => {
    setPage(value);
    console.log({ page: value });
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([promise1, promise2, promise3, promise4, promise5, promise6])
      .then((responses) => {
        console.log({ responses });
        // prettier-ignore
        const spreadData = responses.map(
          (group) => {return(group.data.response.query.data.CRM.p_playgroup_collection.items)}
            
        );
        setPlayData([...spreadData]);
        console.log({ spreadData: spreadData });

        setLoading(false);
      })
      .catch((error) => {
        console.error({ error });
      });
  }, []);
  console.log({ playData });

  useEffect(() => {
    const _groups = playData;
    setGroups(_groups);
    setSplitGroups(chunkArray(_groups, 20));
    console.log({ splitGroups: chunkArray(_groups, 20) });
  }, [searchTerm]);

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
          {searchTerm &&
            (loading ? (
              <div className="loadContainer">
                <h1>Loading Play Groups..</h1>
              </div>
            ) : (
              splitGroups.map((group, i) => {
                return (
                  <>
                    <ResultsCard
                      key={i}
                      name={group[page - 1].name}
                      locName={group[page - 1].pg_location_name}
                      suburb={group[page - 1].pg_suburb}
                      address={group[page - 1].pg_address}
                      city={group[page - 1].pg_city}
                      state={group[page - 1].pg_state.label}
                      postCode={group[page - 1].pg_post_code}
                      desc={groups[page - 1].pg_descrtiption}
                    />
                  </>
                );
              })
            ))}
        </div>
        {searchTerm && !loading && groups && (
          <PaginationRow>
            <Paginator
              color="secondary"
              count={25}
              showFirstButton
              showLastButton
              onChange={changePage}
              page={page}
            />
          </PaginationRow>
        )}
      </div>
    </>
  );
};

export default Search;

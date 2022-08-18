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
  const [playData, setPlayData] = useState({});
  const [searchTerm, setSearchTerm] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [groups, setGroups] = useState({});
  const [splitGroups, setSplitGroups] = useState(groups);

  // retrieve all playgroups on mount
  useEffect(async () => {
    console.log('fired');
    setLoading(true);
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
    try {
      await Promise.all([
        promise1,
        promise2,
        promise3,
        promise4,
        promise5,
        promise6,
      ]).then((responses) => {
        console.log({ responses });
        // prettier-ignore
        const responseArrays = responses.map(
          // access the data we want for the groups
          (group) => {return(group.data.response.query.data.CRM.p_playgroup_collection.items)}
            
        );
        // combine all calls into a single array to be filtered through later on
        const combinedResults = [
          ...responseArrays[0],
          ...responseArrays[1],
          ...responseArrays[2],
          ...responseArrays[3],
          ...responseArrays[4],
          ...responseArrays[5],
        ];
        setPlayData(combinedResults), setLoading(false);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSearch = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      setSearchTerm(e.target.value);
      e.preventDefault();
    }
  };

  const changePage = (e, value) => {
    setPage(value);
    console.log({ page: value });
  };

  // split searched results into paginateable arrays
  useEffect(() => {
    const _groups = playData;
    setGroups(_groups);
    setSplitGroups(chunkArray(_groups, 30));
    setPageCount(splitGroups.length + 1);
    console.log({ splitGroups: chunkArray(_groups, 30) });
  }, [playData]);

  return (
    <>
      <div className="searchBody">
        <Input
          onKeyDown={handleSearch}
          className="searchBar"
          type="search"
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
                      // groupSearchTerm={searchTerm}
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
              count={pageCount}
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

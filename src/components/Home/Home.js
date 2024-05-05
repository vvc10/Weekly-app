import React, { useState, useEffect, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './Home.css';
import JobCard from './JobCard.js';
import Loader from '../Loader.js';
import NullJobs from './NullJobs.js';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    minExperience: '',
    companyName: '',
    location: '',
    remote: '',
    techStack: '',
    role: '',
    minBasePay: ''
  });
  const observer = useRef(); // Ref for IntersectionObserver

  const lastJobCardRef = useRef(); // Ref for last job card

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const body = JSON.stringify({
        limit: 8,
        offset: (page - 1) * 8
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body
      };

      try {
        const response = await fetch(
          'https://api.weekday.technology/adhoc/getSampleJdJSON',
          requestOptions
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        if (!Array.isArray(data.jdList)) {
          throw new Error('Data format is not correct');
        }

        setJobs(prevJobs => [...prevJobs, ...data.jdList]);
        setLoading(false);
        setHasMore(data.jdList.length > 0);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page]);

  // Intersection observer for infinite scrolling
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage(prevPage => prevPage + 1);
      }
    }, options);

    if (lastJobCardRef.current) {
      observer.current.observe(lastJobCardRef.current);
    }

    return () => observer.current.disconnect(); // Cleanup observer
  }, [hasMore, loading]);

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    const filteredValue = value === null ? '' : value;

    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: filteredValue
    }));
  };

  // Apply filters to jobs
  const applyFilters = (job) => {
    const { minExperience, companyName, location, remote, techStack, role, minBasePay } = filters;

    return (
      (minExperience === '' || job.minExp >= minExperience) &&
      (companyName === '' || (job.companyName && job.companyName.toLowerCase().includes(companyName.toLowerCase()))) &&
      (location === '' || (job.location && job.location.toLowerCase().includes(location.toLowerCase()))) &&
      ((remote === '' && !job.remote) || (job.remote && job.remote.toLowerCase() === remote.toLowerCase())) &&
      (techStack === '' || (job.techStack && job.techStack.toLowerCase().includes(techStack.toLowerCase()))) &&
      (role === '' || (job.jobRole && job.jobRole.toLowerCase().includes(role.toLowerCase()))) &&
      (minBasePay === '' || job.minJdSalary >= minBasePay)
    );
  };

  // Filter jobs based on applied filters
  const filteredJobs = jobs.filter(job => applyFilters(job));

  return (
    <div className='home'>
      <div className='filters search-bar'>
        {/* Autocomplete for job role */}
        <Autocomplete
          id="role"
          className='grouped-demo'
          options={["Frontend", "Backend", "ios", "Designer", "FullStack", "Flutter", "React Native", "Graphic Designer", "Design manager"]}
          value={filters.role}
          onChange={(e, value) => handleFilterChange('role', value)}
          renderInput={(params) => <TextField {...params} label="Role"
            InputProps={{
              ...params.InputProps,
              endAdornment: !filters.role ? null : params.InputProps.endAdornment,
            }} />}
        />
        {/* Autocomplete for minimum experience */}
        <Autocomplete
          id="minExperience"
          className='grouped-demo'
          options={["", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          value={filters.minExperience}
          onChange={(e, value) => handleFilterChange('minExperience', value)}
          renderInput={(params) => <TextField {...params} label="Min Experience"
            InputProps={{
              ...params.InputProps,
              endAdornment: !filters.minExperience ? null : params.InputProps.endAdornment,
            }}
          />}
        />
        {/* Autocomplete for tech stack */}
        <Autocomplete
          id="techStack"
          className='grouped-demo'
          options={["ReactJS", "Java", "NodeJS", "Redux", "Material UI"]}
          value={filters.techStack}
          onChange={(e, value) => handleFilterChange('techStack', value)}
          renderInput={(params) => <TextField {...params} label="Tech Stack"
            InputProps={{
              ...params.InputProps,
              endAdornment: !filters.techStack ? null : params.InputProps.endAdornment,
            }}
          />}
        />
        {/* Autocomplete for location */}
        <Autocomplete
          id="location"
          className='grouped-demo'
          options={["Pune", "Mumbai", "Bangalore", "Tamil Nadu", "West Bengal", "New Delhi"]}
          value={filters.location}
          onChange={(e, value) => handleFilterChange('location', value)}
          renderInput={(params) => <TextField {...params} label="Location"
            InputProps={{
              ...params.InputProps,
              endAdornment: !filters.location ? null : params.InputProps.endAdornment,
            }}
          />}
        />
        {/* Autocomplete for remote/on-site */}
        <Autocomplete
          id="remote"
          className='grouped-demo'
          options={["remote", "on-site"]}
          value={filters.remote}
          onChange={(e, value) => handleFilterChange('remote', value)}
          renderInput={(params) => <TextField {...params} label="Remote/On-site"
            InputProps={{
              ...params.InputProps,
              endAdornment: !filters.remote ? null : params.InputProps.endAdornment,
            }}
          />}
        />
        {/* Text field for company name */}
        <TextField
          id="companyName"
          className='grouped-demo'
          label="Company name"
          type="text"
          value={filters.companyName}
          onChange={(e) => handleFilterChange('companyName', e.target.value)}
        />
        {/* Autocomplete for minimum base pay */}
        <Autocomplete
          id="minBasePay"
          className='grouped-demo'
          options={[0, 100, 200, 300, 400]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Min Base Pay"
              InputProps={{
                ...params.InputProps,
                endAdornment: !filters.remote ? null : params.InputProps.endAdornment,
              }}
            />
          )}
          value={filters.minBasePay}
          onChange={(e, value) => handleFilterChange('minBasePay', value)}
        />
      </div>
      <div className='jobs_sec'>
        <h1>Jobs:</h1>
        <div className="job-list">
          {/* Display job cards */}
          {filteredJobs.map((job, index) => (
            <div key={index}>
              <JobCard
                companyName={job.companyName}
                jdLink={job.jdLink}
                jobDetailsFromCompany={job.jobDetailsFromCompany}
                jobRole={job.jobRole}
                location={job.location}
                logoUrl={job.logoUrl}
                maxExp={job.maxExp}
                maxJdSalary={job.maxJdSalary}
                minExp={job.minExp || job.maxExp}
                minJdSalary={job.minJdSalary || job.maxJdSalary}
                salaryCurrencyCode={job.salaryCurrencyCode}
                filters={filters}
              />
              {/* Add reference to the last job card */}
              {index === filteredJobs.length - 1 && <div ref={lastJobCardRef}></div>}
            </div>
          ))}
          {/* Display no jobs component if no jobs found */}
          {!loading && !hasMore && <NullJobs/>}
          {/* Display loader while loading */}
          {loading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default Home;

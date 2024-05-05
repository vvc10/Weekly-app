import React from 'react';
import './JobCard.css'
const JobCard = ({

    companyName,
    jdLink,
    jobDetailsFromCompany,
    jobRole,
    location,
    logoUrl,
    maxExp,
    maxJdSalary,
    minExp,
    minJdSalary,
    salaryCurrencyCode,
    filters

}) => {

    const renderSalary = () => {
        if (minJdSalary !== null && maxJdSalary !== null) {
          if (minJdSalary === maxJdSalary) {
            return `${minJdSalary} ${salaryCurrencyCode}`;
          } else {
            return `${minJdSalary} - ${maxJdSalary} ${salaryCurrencyCode}`;
          }
        } else if (minJdSalary !== null) {
          return `${minJdSalary}+ ${salaryCurrencyCode}`;
        } else if (maxJdSalary !== null) {
          return `${maxJdSalary} ${salaryCurrencyCode}`;
        } else {
          return 'Salary not provided';
        }
      };
      
      
  const renderLocation = () => {
    return location !== null ? location : '';
  };

  const renderJobDetails = () => {
    return jobDetailsFromCompany ? jobDetailsFromCompany : 'Job Details not provided';
  };

  const renderExperience = () => {
    if (minExp !== null) {
      return `${minExp}`;
    } else if (maxExp !== null) {
      return `${maxExp}`;
    } else {
      return '0 ';
    }
  };
  
  
    return (
        <>
            <div className="job-card">

                <div className='job-card-head'>
                    <span>⏳ Posted 19 days ago</span>
                </div>
                <div className='job-card-main-sec'>
                    <div className='job-card-main-sec-head'>
                        <img src={logoUrl} alt={companyName} />
                        <div className='jcmshinhead'>
                            <h2>{companyName}</h2>
                            <p className='head-jobrole'>{jobRole}</p>
                            <p className='head-jobloc'>{renderLocation()}</p>
                        </div>

                    </div>
                    <div className='job-card-estd'>
                        <p>Estimated Salary: {renderSalary()} ✅</p>
                    </div>
                    <div className='job-card-about-company'>
                        <label>About Company</label>
                        <p>{renderJobDetails()}</p>
                        <button className='view-job-btn'>View job</button>
                    </div>
                    <p className='job-card-exp-sal'>Minimum Experience <br />
                        <span>{renderExperience()} years</span>
                    </p>

                </div>
                <div className="job-details">

                    <a href={jdLink} target="_blank" rel="noopener noreferrer">
                        <button className='job-details-apply-btn'>
                            ⚡ Easy Apply
                        </button>
                    </a>


                    <a href={jdLink} target="_blank" rel="noopener noreferrer">
                        <button className='job-details-referral-asks'>
                            Unlock referral asks
                        </button>
                    </a>

                </div>
            </div>

        </>

    );
};

export default JobCard;

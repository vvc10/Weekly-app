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
    salaryCurrencyCode

}) => {


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
                            <p className='head-jobloc'>{location}</p>
                        </div>

                    </div>
                    <div className='job-card-estd'>
                        <p>Estimated Salary: {minJdSalary} - {maxJdSalary} {salaryCurrencyCode} ✅</p>
                    </div>
                    <div className='job-card-about-company'>
                        <label>About Company</label>
                        <p>{jobDetailsFromCompany}</p>
                        <button className='view-job-btn'>View job</button>
                    </div>
                    <p className='job-card-exp-sal'>Minimum Experience <br />
                        <span>{minExp} years</span>
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

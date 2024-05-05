import React, { useState } from 'react';
import './JobCard.css';

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
    // State for modal open/close
    const [modalOpen, setModalOpen] = useState(false);

    // Function to render salary information
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

    // Function to render location
    const renderLocation = () => {
        return location !== null ? location : '';
    };

    // Function to render job details
    const renderJobDetails = () => {
        return jobDetailsFromCompany ? jobDetailsFromCompany : 'Job Details not provided';
    };

    // Function to render experience
    const renderExperience = () => {
        if (minExp !== null) {
            return `${minExp}`;
        } else if (maxExp !== null) {
            return `${maxExp}`;
        } else {
            return '0 ';
        }
    };

    // Function to open modal
    const openModal = () => {
        setModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className='job-card'>
            {/* Job posting details */}
            <div className='job-card-head'>
                <span>⏳ Posted 19 days ago</span>
            </div>
            {/* Main job card section */}
            <div className='job-card-main-sec'>
                <div className='job-card-main-sec-head'>
                    {/* Company logo and details */}
                    <img src={logoUrl} alt={companyName} />
                    <div className='jcmshinhead'>
                        <h2>{companyName}</h2>
                        <p className='head-jobrole'>{jobRole}</p>
                        <p className='head-jobloc'>{renderLocation()}</p>
                    </div>
                </div>
                {/* Estimated salary */}
                <div className='job-card-estd'>
                    <p>Estimated Salary: {renderSalary()} ✅</p>
                </div>
                {/* About Company section */}
                <div className='job-card-about-company'>
                    <label>About Company</label>
                    <p>{renderJobDetails().split(' ').slice(0, 80).join(' ')}..</p>
                    <button className='view-job-btn' onClick={openModal}>
                        View more
                    </button>
                </div>
                {/* Minimum Experience */}
                <p className='job-card-exp-sal'>Minimum Experience <br />
                    <span>{renderExperience()} years</span>
                </p>
            </div>
            {/* Job details */}
            <div className='job-details'>
                <a href={jdLink} target='_blank' rel='noopener noreferrer'>
                    <button className='job-details-apply-btn'>
                        ⚡ Easy Apply
                    </button>
                </a>
                <a href={jdLink} target='_blank' rel='noopener noreferrer'>
                    <button className='job-details-referral-asks'>
                        Unlock referral asks
                    </button>
                </a>
            </div>
            {/* Modal for detailed job description */}
            {modalOpen && (
                <div className='modal-overlay' onClick={closeModal}>
                    <div className='modal' onClick={(e) => e.stopPropagation()}>
                        <div className='modal-head'>              
                            <label>Job Description</label>
                            <span className='close' onClick={closeModal}>&times;</span>
                        </div>
                        <div className='modal-content'>
                            <span>About Company:</span>
                            <h2>{companyName}</h2>
                            <p>Role: {jobRole}</p>
                            <span>About Job:</span>
                            <p>{renderJobDetails()}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobCard;

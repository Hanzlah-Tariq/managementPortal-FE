import React, { useEffect, useRef } from 'react';

const Poll = ({
  // eslint-disable-next-line react/prop-types,no-unused-vars
  fetchPoll, statusUpdate, poll, fetchPatients,
}) => {
  const interval = useRef(0);

  useEffect(() => {
    interval.current = setInterval(() => {
      fetchPoll();
    }, 3000);
    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    if (poll?.dbStatus === 'outdated') {
      fetchPatients();
    }
  }, [poll?.dbStatus]);

  return <></>;
};

export default Poll;

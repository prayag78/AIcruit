import React from 'react'
import JobsB from '../../components/JobsB'
import Jobs_R from '../../components/Jobs_R'
import Jobs_B from '../../components/Jobs_B'
import { useEffect } from 'react'

const JobsPage = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <JobsB/>
      <Jobs_R/>
      <Jobs_B/>
    </div>
  )
}

export default JobsPage
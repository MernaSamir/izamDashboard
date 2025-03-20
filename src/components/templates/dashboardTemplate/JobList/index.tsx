'use client'; // Needed for Next.js App Router

import { Box,  Pagination} from '@mui/material';
import JobCard from './JobCard';
import { useState } from 'react';

export default function JobList() {
  const jobs = [
    {
      title: "Gaming UI Designer",
      company: "Merge",
      location: "Egypt",
      postedTime: "2 days ago",
      experience: "0 - 3y of exp",
      workMode: "Remote",
      jobType: "Full-time",
      category: "Creative / Design - UI Software development - Gaming"
    },
    {
      title: "Senior UX UI Designer",
      company: "Cairo, Egypt",
      location: "Egypt",
      postedTime: "6 days ago",
      experience: "0 - 3y of exp",
      workMode: "Remote",
      jobType: "Full-time",
      category: "Creative / Design - UI Software development"
    },
    {
      title: "React Frontend Developer",
      company: "Magora",
      location: "Egypt",
      postedTime: "6 days ago",
      experience: "0 - 3y of exp",
      workMode: "Remote",
      jobType: "Full-time",
      category: "Creative / Design - UI Software development"
    },
    {
      title: "Gaming UI Designer",
      company: "RedRocket Games",
      location: "Egypt",
      postedTime: "13 hours ago",
      experience: "0 - 3y of exp",
      workMode: "Remote",
      jobType: "Full-time",
      category: "Creative / Design - UI Software development - Gaming"
    },
    {
      title: "Senior UX UI Designer",
      company: "Cairo, Egypt",
      location: "Egypt",
      postedTime: "6 days ago",
      experience: "0 - 3y of exp",
      workMode: "Remote",
      jobType: "Full-time",
      category: "Creative / Design - UI Software development"
    },
    {
      title: "React Frontend Developer",
      company: "Magora",
      location: "Egypt",
      postedTime: "6 days ago",
      experience: "0 - 3y of exp",
      workMode: "Remote",
      jobType: "Full-time",
      category: "Creative / Design - UI Software development"
    }
  ];

  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const paginatedJobs = jobs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
<div>
          {paginatedJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={Math.ceil(jobs.length / itemsPerPage)}
            page={page}
            onChange={handleChange}
            color="primary"
            variant="outlined"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                border:"1px solid #C4C3C3 !important",
              },
              '& .Mui-selected': {
                backgroundColor: '#48A74C !important',
                color: '#fff !important',
                border:"1px solid #C4C3C3 !important",
                '&:hover': {
                  backgroundColor: '#48A74C !important',
                  color: '#fff !important',

                },
              },
            }}
          />
        </Box>
    </div>
  );
}

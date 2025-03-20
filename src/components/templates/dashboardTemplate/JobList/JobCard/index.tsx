import styles from './JobCard.module.css';
import { Card, Box, Divider } from '@mui/material';

import Image from 'next/image';

interface JobCardProps {
  title?: string;
  company?: string;
  location?: string;
  postedTime?: string;
  experience?: string;
  jobType?: string;
  workMode?: string;
  category?: string;
  logoUrl?: string;
}

export default function JobCard({
  title,
  company,
  location,
  postedTime,
  experience,
  jobType,
  workMode,
  category,
  logoUrl,
}: JobCardProps) {
  return (
    <Card className={styles.card} variant="outlined">
      <Box gap="18px" sx={{width:"100%"}}>
        {/* Header with Image + Title + Company */}
        <Box className={styles.topRow} >
        <Box    className={styles.leftPart} gap={1.5}>
          <Image src={logoUrl || '/assets/image.png'} width={70} height={70} alt="jobImage" className= {styles.logo}/>
          <Box className={styles.titleCompany} >
            <p className={styles.title}>{title}</p>
            <p className={styles.company}>{company}</p>
          </Box>
        </Box>
          <Image src={'/assets/bookmark.svg'} width={55} height={55} alt="jobImage" className= {styles.bookmark}/>
        </Box>

        {/* Meta Info and Chips Below */}
        <Box gap='11px'  sx={{ display: 'flex',pl:4}}>
          <Box  sx={{ display: 'flex', alignItems:'center'}}>
        <Image src="/assets/pin.svg" width={17} height={17} alt="pin" />
        <span className={styles.metaText}>{location}</span>
        </Box>
        <Box  sx={{ display: 'flex', alignItems:'center'}}>
        <Image src="/assets/date.svg" width={17} height={17} alt="date" />
          <span className={styles.metaText}>{postedTime}</span>
          </Box>
        </Box>

        <Box className={styles.chips} sx={{ pl:4}}>
        <div className={styles.chip}>{experience}</div>
<div className={styles.chip}>{jobType}</div>
<div className={styles.chip}>{workMode}</div>
        </Box>
<Divider className={styles.divider}/>
        <p className={styles.category}>{category}</p>
      </Box>
    </Card>
  );
}

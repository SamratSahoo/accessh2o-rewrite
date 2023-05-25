import React, { useEffect, useState } from 'react'
import ApplicantTable from 'src/components/ApplicantTable'
import classes from './ApplicantView.module.css'
import urls from 'src/utils/urls'
import ApplicantNavLink from 'src/components/ApplicantNavLink/ApplicantNavLink'
import { getAllApplicants } from 'src/actions/Client'
import { Box, CircularProgress } from '@mui/material'
import { Applicant } from 'src/utils/types'

const ApplicantViewPage = (): JSX.Element => {
  useEffect(() => {
    const fetchApplicants = async (): Promise<void> => {
      const applicants = await getAllApplicants()
      setApplicants(applicants)
      console.log(applicants)
    }
    void fetchApplicants()
      .then(() => {
        setRefreshKey(refreshKey + 1)
      })
      .catch()
  }, [])

  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [refreshKey, setRefreshKey] = useState<number>(0)

  return (
    <>
      <ApplicantNavLink isUtilityView={false} />
      <div className={classes.root}>
        <h1 className={classes.header1}>Dashboard</h1>
        {applicants !== null ? (
          <ApplicantTable
            isUtilityView={false}
            infoSubmissionEndpoint={urls.pages.accessh2oView.infosubmit}
            applicants={applicants}
            key={refreshKey}
          />
        ) : (
          <Box sx={{ mx: 'auto', my: '32px' }}>
            <CircularProgress size={40} disableShrink />
          </Box>
        )}
        <h1 className={classes.header2}></h1>
      </div>
    </>
  )
}

export default ApplicantViewPage

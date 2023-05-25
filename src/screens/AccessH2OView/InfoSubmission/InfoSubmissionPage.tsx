import React from 'react'
import InfoSubmissionView from 'src/components/InfoSubmission/InfoSubmission'

interface PropTypes {
  applicantId: string
}

const InfoSubmissionPage = ({ applicantId }: PropTypes): JSX.Element => {
  return <InfoSubmissionView applicantId={applicantId} isUtilityView={false} />
}

export default InfoSubmissionPage

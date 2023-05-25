import InfoSubmissionPage from 'src/screens/AccessH2OView/InfoSubmission'
import { useRouter } from 'next/router'

const ApplicantInfoSubmissionPage = () => {
  const router = useRouter()
  const { applicantId } = router.query

  return InfoSubmissionPage({ applicantId: applicantId as string })
}

export default ApplicantInfoSubmissionPage

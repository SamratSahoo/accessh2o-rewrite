import InfoSubmissionPage from 'src/screens/AccessH2OView/InfoSubmission'
import { useRouter } from 'next/router'

const ApplicantInfoSubmissionPage = () => {
    const router = useRouter()
    const { applicantId } = router.query

    if (!applicantId || Array.isArray(applicantId)) {
        throw new Error(
            'Could not render info submission page, invalid applicant ID'
        )
    }
    return InfoSubmissionPage({ applicantId: applicantId })
}

export default ApplicantInfoSubmissionPage

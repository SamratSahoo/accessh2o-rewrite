function getBaseURL() {
  if (process.env.PROD_URL) {
    return `https://${process.env.PROD_URL}`
  }
  if (process.env.NEXT_PUBLIC_PROD_URL) {
    return `https://${process.env.NEXT_PUBLIC_PROD_URL}`
  }
  // if backend
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  // if client-side
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }
  return 'http://localhost:3000'
}

const urls = {
  baseUrl: getBaseURL(),
  dbUrl: process.env.MONGO_DB ?? 'mongodb://localhost:27017',
  pages: {
    index: '/',
    profile: '/profile',
    login: '/login',
    app: {
      home: '/app'
    },
    accessh2oView: {
      applicants: '/accessh2oView/accessh20applicants',
      infosubmit: '/accessh2oView/infosubmit',
      editform: '/accessh2oView/editform'
    },
    utilityView: {
      applicants: '/utilityView/utilityapplicants',
      infosubmit: '/utilityView/infosubmit'
    }
  },
  api: {
    example: '/api/example',
    user: {
      signUp: '/api/user/sign-up',
      update: '/api/user/update',
      login: '/api/user/login',
      logout: '/api/user/logout',
      getCurrent: '/api/user/get-current'
    },
    company: {
      addCompany: '/api/company/add',
      getCompany: '/api/company/get-company',
      update: '/api/company/update'
    },
    client: {
      getClient: '/api/client/get-client',
      getAll: '/api/client/get-all',
      addClient: '/api/client/add',
      changeStatus: '/api/client/change-status',
      removeClient: '/api/client/remove',
      getUtilityApplicants: '/api/client/get-utilityapplicants'
    },
    notes: {
      testfunctiontwo: '/api/notes/exampletwo',
      add: '/api/notes/add',
      getNote: '/api/notes/get-note'
    },
    info: {
      addInfo: '/api/InfoSubmission/add',
      getInfo: '/api/InfoSubmission/get-info',
      update: '/api/InfoSubmission/update'
    },
    formQuestions: {
      addEligibilityQuestion: '/api/form/addEligibilityQuestion',
      addDocumentQuestion: '/api/form/addDocumentQuestion',
      addOtherQuestion: '/api/form/addOtherQuestion',
      getEligibilityQuestions: '/api/form/getEligibilityQuestions',
      getDocumentQuestions: '/api/form/getDocumentQuestions',
      getOtherQuestions: '/api/form/getOtherQuestions',
      editEligibilityQuestion: '/api/form/editEligibilityQuestion',
      editDocumentQuestion: '/api/form/editDocumentQuestion',
      editOtherQuestion: '/api/form/editOtherQuestion',
      removeEligibilityQuestion: '/api/form/removeEligibilityQuestion',
      removeDocumentQuestion: '/api/form/removeDocumentQuestion',
      removeOtherQuestion: '/api/form/removeOtherQuestion'
    }
  }
}

export default urls

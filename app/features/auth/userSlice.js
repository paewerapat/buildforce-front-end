import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: '', email: '', username: '', avatar: '', type: '', employerInfo: {
    id: '', shortlisted: {
      candidates: [{id: ''}],
      applicants: [{id: ''}],
    }
  }, candidateInfo: {
    id: '', shortlisted: {
      employers: [{id: ''}],
      jobs: [{id: ''}],
    }
  }
}

export const userSlice = createSlice({
  name: 'user-authentication',
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.id = action.payload.id
      state.email = action.payload.email
      state.username = action.payload.username
      state.avatar = action.payload.avatar
      state.type = action.payload.type
      state.provider = action.payload.provider
      state.employerInfo = action.payload.employerInfo
      state.candidateInfo = action.payload.candidateInfo
    },      
    userSignout: (state, action) => {
      return initialState;
    },
    addCandidateToShortlistedEmployer: (state, action) => {
      state.employerInfo.shortlisted.candidates.push({id: action.payload})
    },
    addApplicantToShortlistedEmployer: (state, action) => {
      state.employerInfo.shortlisted.applicants.indexOf({id: action.payload}) === -1
      ? state.employerInfo.shortlisted.applicants.push({id: action.payload})
      : state.employerInfo.shortlisted.applicants
    },
    deleteCandidateToShortlistedEmployer: (state, action) => {
      const newShortlisted = state.employerInfo.shortlisted.candidates.filter((item) => 
        item.id !== action.payload
      )
      state.employerInfo.shortlisted.candidates = newShortlisted
    },
    deleteApplicantToShortlistedEmployer: (state, action) => {
      const newShortlisted = state.employerInfo.shortlisted.applicants.filter((item) => 
        item.id !== action.payload
      )
      state.employerInfo.shortlisted.applicants = newShortlisted
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  getUser, 
  addCandidateToShortlistedEmployer, 
  addApplicantToShortlistedEmployer,
  deleteCandidateToShortlistedEmployer,
  deleteApplicantToShortlistedEmployer,
  userSignout 
} = userSlice.actions

export default userSlice.reducer;
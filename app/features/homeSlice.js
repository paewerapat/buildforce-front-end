import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  topCategories: [],
  jobs: [],
  employers: [],
  postedJob: 0,
  loading: false,
}

export const homeSlice = createSlice({
  name: 'home-slice',
  initialState,
  reducers: {
    getJobHomeData: (state, { payload }) => {
        state.jobs = payload.jobs;
    },
    getEmployerHomeData: (state, { payload }) => {
      state.employers = payload.employers;
    },
    getAllJobHomeData: (state, { payload }) => {
      if(payload?.length > 0) {

        state.postedJob = payload.length
        // Step 1: Remove Duplicate jobPosition field
        const jsonObject = payload.map(JSON.stringify);
        const uniqueSet = new Set(jsonObject);
        const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
        
        // Step 2: Count the frequency of each 'field' value
        const frequency = payload.reduce((acc, item) => {
          acc[item.jobPosition] = (acc[item.jobPosition] || 0) + 1;
          return acc;
        }, {});
        
        // Step 3: Sort the array based on frequency and remove array after 10 length object
        const newArray = uniqueArray.sort((a, b) => frequency[b.jobPosition] - frequency[a.jobPosition]).slice(0, 10);

        // Step 4: Add Icon to object key
        const addIcon = newArray.map((item) => {
          if (item.jobPosition === "Front-End Developer") return {...item, icon: "la la-laptop-code", jobListing: frequency['Front-End Developer']}
          else if (item.jobPosition === "Back-End Developer") return {...item, icon: "la la-code", jobListing: frequency['Back-End Developer']}
          else if (item.jobPosition === "Full-Stack Developer") return {...item, icon: "la la-sitemap", jobListing: frequency['Full-Stack Developer']}
          else if (item.jobPosition === "UX/UI Designer") return {...item, icon: "flaticon-search-3", jobListing: frequency['UX/UI Designer']}
          else if (item.jobPosition === "Project Manager") return {...item, icon: "flaticon-briefcase", jobListing: frequency['Project Manager']}
          else if (item.jobPosition === "DevOps Engineer") return {...item, icon: "flaticon-rocket-ship", jobListing: frequency['DevOps Engineer']}
          else if (item.jobPosition === "Database Management") return {...item, icon: "la la-database", jobListing: frequency['Database Management']}
          else if (item.jobPosition === "Software Developer") return {...item, icon: "la la-file-code", jobListing: frequency['Software Developer']}
          else if (item.jobPosition === "Network & System") return {...item, icon: "la la-project-diagram", jobListing: frequency['Network & System']}
          else if (item.jobPosition === "IT technician") return {...item, icon: "la la-code-branch", jobListing: frequency['IT technician']}
          else if (item.jobPosition === "Support specialist") return {...item, icon: "la la-window-restore", jobListing: frequency['Support specialist']}
          else if (item.jobPosition === "Quality assurance tester") return {...item, icon: "la la-bug", jobListing: frequency['Quality assurance tester']}
          else if (item.jobPosition === "IT security specialist") return {...item, icon: "la la-user-secret", jobListing: frequency['IT security specialist']}
          else if (item.jobPosition === "Systems analyst") return {...item, icon: "la la-stream", jobListing: frequency['Systems analyst']}
          else if (item.jobPosition === "Network engineer") return {...item, icon: "la la-rss", jobListing: frequency['Network engineer']}
          else if (item.jobPosition === "Data scientist") return {...item, icon: "la la-signal", jobListing: frequency['Data scientist']}
        })

        state.topCategories = addIcon;
      }
    },
    loadingHomeData: (state, { payload }) => {
      state.loading = payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  getAllJobHomeData,
  getEmployerHomeData,
  getJobHomeData,
  loadingHomeData,
} = homeSlice.actions
export default homeSlice.reducer;
import api from '@/api/api'

const urlProfiles = process.env.VUE_APP_API

// Profiles
export const getAllProfiles = (numberOfRecords) => api.get(`${urlProfiles}/?results=${numberOfRecords}`)

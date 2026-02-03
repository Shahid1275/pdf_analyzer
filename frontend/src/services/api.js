import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pdf-analyzer-six.vercel.app'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

export const analyzePDFs = async (files) => {
  try {
    const formData = new FormData()
    
    files.forEach((file) => {
      formData.append('pdfs', file)
    })

    const response = await api.post('/analyze-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Server error occurred')
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.')
    } else {
      throw new Error('Failed to upload files. Please try again.')
    }
  }
}

export default api

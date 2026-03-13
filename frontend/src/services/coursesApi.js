const configuredBase = (import.meta.env?.VITE_API_URL || '').trim().replace(/\/+$/, '')
const apiBase = configuredBase || (import.meta.env.DEV ? 'http://localhost:5000' : '')

export const buildApiUrl = (path) => (
  apiBase ? `${apiBase}${path}` : path
)

const fetchJson = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return response.json()
}

export const fetchCoursesCatalog = () => (
  fetchJson(buildApiUrl('/api/courses'))
)

export const fetchCourseById = (id) => (
  fetchJson(buildApiUrl(`/api/courses/${id}`))
)

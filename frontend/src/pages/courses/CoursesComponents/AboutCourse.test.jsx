import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import AboutCourse from './AboutCourse.jsx'
import { fetchCourseById } from '../../../services/coursesApi'

vi.mock('../../../services/coursesApi', () => ({
  fetchCourseById: vi.fn(),
}))

const basePayload = {
  meta: {
    academy: 'Inno M Academy',
    technicalRequirements: ['ლეპტოპი ან კომპიუტერი'],
  },
  course: {
    id: 1,
    title: 'Full Stack პროგრამირება',
    iconKey: 'FaGlobe',
    color: 'from-[#1f3b5b] via-[#2b4a70] to-[#1a2f4d]',
    difficulty: 3,
    isAvailable: true,
    card: {
      shortDescription: 'ვებ-პროგრამირების სრული კურსი დამწყებისთვის',
    },
    details: {
      price: '250 ₾',
      month: 'თვეში',
      duration: '18 თვე',
      description: 'ეს არის სრული კურსი.',
      requirements: ['კომპიუტერის საბაზისო გამოყენება'],
    },
  },
}

describe('AboutCourse', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows not found when course id is invalid', async () => {
    fetchCourseById.mockRejectedValueOnce(new Error('Not found'))

    render(
      <MemoryRouter initialEntries={['/courses/999']}>
        <Routes>
          <Route path="/courses/:id" element={<AboutCourse />} />
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByText('კურსი ვერ მოიძებნა')).toBeInTheDocument()
  })

  it('renders course details for a valid id', async () => {
    fetchCourseById.mockResolvedValueOnce(basePayload)

    render(
      <MemoryRouter initialEntries={['/courses/1']}>
        <Routes>
          <Route path="/courses/:id" element={<AboutCourse />} />
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByText('Full Stack პროგრამირება')).toBeInTheDocument()
    expect(screen.getByText('250 ₾ თვეში')).toBeInTheDocument()
  })

  it('shows general requirements content', async () => {
    fetchCourseById.mockResolvedValueOnce(basePayload)

    render(
      <MemoryRouter initialEntries={['/courses/1']}>
        <Routes>
          <Route path="/courses/:id" element={<AboutCourse />} />
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByText('სასწავლო მოთხოვნები')).toBeInTheDocument()
    expect(screen.getByText('კომპიუტერის საბაზისო გამოყენება')).toBeInTheDocument()
  })
})

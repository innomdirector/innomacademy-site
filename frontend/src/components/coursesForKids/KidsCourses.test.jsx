import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import KidsCourses from './KidsCourses.jsx'
import { fetchCoursesCatalog } from '../../services/coursesApi'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('../../services/coursesApi', () => ({
  fetchCoursesCatalog: vi.fn(),
}))

const mockCatalog = {
  meta: { activeCourseNote: 'ტესტური შენიშვნა' },
  courses: [
    {
      id: 1,
      title: 'ვებ-დეველოპმენტი',
      iconKey: 'FaGlobe',
      isAvailable: true,
      card: { shortDescription: 'პროგრამირების დაწყება მარტივად' },
      catalog: {
        kids: {
          sectionId: 'web',
          sectionTitle: 'ვებ-დეველოპმენტი',
          title: 'ვებ-დეველოპმენტი',
          description: 'პროგრამირების დაწყება ძალიან მარტივად',
        },
      },
    },
    {
      id: 11,
      title: '3D დიზაინი და მოდელირება',
      iconKey: 'FaCube',
      isAvailable: false,
      card: { shortDescription: '3D მიმართულების ზოგადი კურსი' },
      catalog: {
        kids: {
          sectionId: 'creative',
          sectionTitle: 'კრეატივი და 3D',
          title: '3D დიზაინი და მოდელირება',
          description: '3D მიმართულების ზოგადი კურსი',
        },
      },
    },
  ],
}

const UNAVAILABLE_COURSE_ALERT =
  'ბოდიშს გიხდით, ეს კურსი ჯერ დამატებული არ არის. კურსი მალე დაემატება.'

describe('KidsCourses', () => {
  beforeEach(() => {
    mockNavigate.mockReset()
    fetchCoursesCatalog.mockResolvedValue(mockCatalog)
  })

  it('toggles a section and shows its content', async () => {
    const user = userEvent.setup()
    render(<KidsCourses />)

    await screen.findByRole('heading', { name: 'კურსები ბავშვებისთვის' })
    expect(screen.queryByText('3D დიზაინი და მოდელირება')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /კრეატივი და 3D/ }))
    expect(await screen.findByText('3D დიზაინი და მოდელირება')).toBeInTheDocument()
  })

  it('navigates to course page on course click', async () => {
    const user = userEvent.setup()
    render(<KidsCourses />)

    await screen.findByRole('heading', { name: 'კურსები ბავშვებისთვის' })
    await user.click(screen.getByText('პროგრამირების დაწყება ძალიან მარტივად'))
    expect(mockNavigate).toHaveBeenCalledWith('/courses/1')
  })

  it('shows alert and blocks navigation for unavailable course', async () => {
    const user = userEvent.setup()

    render(<KidsCourses />)

    await screen.findByRole('heading', { name: 'კურსები ბავშვებისთვის' })
    await user.click(screen.getByRole('button', { name: /კრეატივი და 3D/ }))
    await user.click(screen.getByText('3D მიმართულების ზოგადი კურსი'))

    expect(await screen.findByText(UNAVAILABLE_COURSE_ALERT)).toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})

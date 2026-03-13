import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import AdultCourses from './AdultCourses.jsx'
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
      title: 'Full Stack პროგრამირება',
      iconKey: 'FaGlobe',
      isAvailable: true,
      card: { shortDescription: 'ვებ-პროგრამირების სრული კურსი' },
      catalog: {
        adult: {
          sectionId: 'tracks',
          sectionTitle: 'პროგრამირების კურსები',
          title: 'Full Stack პროგრამირება',
          description: 'ვებ-პროგრამირების სრული კურსი',
        },
      },
    },
    {
      id: 11,
      title: '3D დიზაინი და მოდელირება',
      iconKey: 'FaCube',
      isAvailable: false,
      card: { shortDescription: '3D დიზაინის ზოგადი კურსი' },
      catalog: {
        adult: {
          sectionId: 'creative',
          sectionTitle: 'დიზაინი და კრეატივი',
          title: '3D დიზაინი და მოდელირება',
          description: '3D დიზაინის ზოგადი კურსი',
        },
      },
    },
  ],
}

const UNAVAILABLE_COURSE_ALERT =
  'ბოდიშს გიხდით, ეს კურსი ჯერ დამატებული არ არის. კურსი მალე დაემატება.'

describe('AdultCourses', () => {
  beforeEach(() => {
    mockNavigate.mockReset()
    fetchCoursesCatalog.mockResolvedValue(mockCatalog)
  })

  it('toggles a section and shows its content', async () => {
    const user = userEvent.setup()
    render(<AdultCourses />)

    await screen.findByText('პროგრამირების კურსები')
    expect(screen.queryByText('3D დიზაინი და მოდელირება')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /დიზაინი და კრეატივი/ }))
    expect(await screen.findByText('3D დიზაინი და მოდელირება')).toBeInTheDocument()
  })

  it('navigates to course page on course click', async () => {
    const user = userEvent.setup()
    render(<AdultCourses />)

    await screen.findByText('პროგრამირების კურსები')
    await user.click(screen.getByText('ვებ-პროგრამირების სრული კურსი'))
    expect(mockNavigate).toHaveBeenCalledWith('/courses/1')
  })

  it('shows alert and blocks navigation for unavailable course', async () => {
    const user = userEvent.setup()

    render(<AdultCourses />)

    await screen.findByText('პროგრამირების კურსები')
    await user.click(screen.getByRole('button', { name: /დიზაინი და კრეატივი/ }))
    await user.click(screen.getByText('3D დიზაინის ზოგადი კურსი'))

    expect(await screen.findByText(UNAVAILABLE_COURSE_ALERT)).toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})

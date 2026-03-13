import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

import Courses from './Courses.jsx'
import { fetchCoursesCatalog } from '../../../services/coursesApi'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('../../../services/coursesApi', () => ({
  fetchCoursesCatalog: vi.fn(),
}))

const mockCatalog = {
  meta: { activeCourseNote: 'ტესტური შენიშვნა' },
  courses: [
    {
      id: 1,
      title: 'Full Stack პროგრამირება',
      iconKey: 'FaGlobe',
      color: 'from-[#1f3b5b] via-[#2b4a70] to-[#1a2f4d]',
      difficulty: 3,
      isAvailable: true,
      card: {
        shortDescription: 'ვებ-პროგრამირების სრული კურსი',
        reason: 'საწყისი გზა პროგრამირებაში.',
        highlights: ['მარტივი ახსნა'],
      },
    },
    {
      id: 8,
      title: 'AI მიმართულება',
      iconKey: 'FaBrain',
      color: 'from-[#4a1f2b] via-[#5a2634] to-[#3a1620]',
      difficulty: 5,
      isAvailable: false,
      card: {
        shortDescription: 'AI-ის ზოგადი კურსი',
        reason: 'ინტერესი AI სფეროში.',
        highlights: ['ეტაპობრივი სწავლა'],
      },
    },
    {
      id: 10,
      title: 'მონაცემების ანალიზი',
      iconKey: 'FaChartBar',
      color: 'from-[#4a3a1c] via-[#5b4722] to-[#3b2d15]',
      difficulty: 4,
      isAvailable: false,
      card: {
        shortDescription: 'მონაცემებთან მუშაობის კურსი',
        reason: 'ანალიტიკური აზროვნება.',
        highlights: ['პრაქტიკული დავალებები'],
      },
    },
    {
      id: 11,
      title: '3D დიზაინი და მოდელირება',
      iconKey: 'FaCube',
      color: 'from-[#1f3a2b] via-[#27503a] to-[#182d22]',
      difficulty: 3,
      isAvailable: false,
      card: {
        shortDescription: '3D დიზაინის კურსი',
        reason: 'ვიზუალური მიმართულება.',
        highlights: ['კრეატიული მიდგომა'],
      },
    },
  ],
}

const UNAVAILABLE_COURSE_ALERT =
  'ბოდიშს გიხდით, ეს კურსი ჯერ დამატებული არ არის. კურსი მალე დაემატება.'

describe('Courses', () => {
  beforeEach(() => {
    mockNavigate.mockReset()
    fetchCoursesCatalog.mockResolvedValue(mockCatalog)
  })

  it('renders correctly when hash is present', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/courses', hash: '#courses' }]}>
        <Courses />
      </MemoryRouter>
    )

    expect(await screen.findByText('კურსები')).toBeInTheDocument()
  })

  it('runs the wizard and shows a recommendation', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Courses />
      </MemoryRouter>
    )

    await screen.findByText('ტესტური შენიშვნა')
    await user.click(screen.getByRole('button', { name: 'კურსის არჩევაში დახმარება' }))

    const answers = [
      'სუსტად ვიცი',
      'არ ვიცი',
      '2–4 საათი',
      'პროდუქტის შექმნა და აპის აწყობა',
    ]

    for (const answer of answers) {
      await user.click(screen.getByRole('button', { name: answer }))
    }

    expect(await screen.findByText('შედეგი')).toBeInTheDocument()
    expect(screen.getByText('რატომ გირჩევთ:')).toBeInTheDocument()
  })

  it('navigates when a course card is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Courses />
      </MemoryRouter>
    )

    await screen.findByText('ტესტური შენიშვნა')
    const buttons = screen.getAllByRole('button', { name: 'კურსის ფეიჯზე' })
    await user.click(buttons[0])
    expect(mockNavigate).toHaveBeenCalledWith('/courses/1')
  })

  it('shows alert and blocks navigation for unavailable course', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Courses />
      </MemoryRouter>
    )

    await screen.findByText('ტესტური შენიშვნა')
    await user.click(screen.getByText('AI-ის ზოგადი კურსი'))

    expect(await screen.findByText(UNAVAILABLE_COURSE_ALERT)).toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})

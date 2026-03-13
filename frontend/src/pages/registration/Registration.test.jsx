import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import Registration from './Registration.jsx'
import { fetchCoursesCatalog } from '../../services/coursesApi'

vi.mock('../../services/coursesApi', () => ({
  fetchCoursesCatalog: vi.fn(),
  buildApiUrl: (path) => path,
}))

const mockCatalog = {
  meta: {
    activeCourseNote: 'ამ ეტაპზე აქტიურია მხოლოდ Full Stack პროგრამირების კურსი.',
    registrationOptions: [
      { value: 'fullstack-ai', label: 'Full Stack პროგრამირება', courseId: 1, isAvailable: true },
      { value: 'ai-llm', label: 'AI მიმართულება', courseId: 8, isAvailable: false },
    ],
  },
  courses: [],
}

const fillRequiredFields = async () => {
  await userEvent.type(screen.getByPlaceholderText('მაგ: ნიკა'), 'ნიკა')
  await userEvent.type(screen.getByPlaceholderText('მაგ: ხუციშვილი'), 'ხუციშვილი')
  await userEvent.type(screen.getByPlaceholderText('მაგ: 16'), '16')
  await userEvent.type(screen.getByPlaceholderText('example@gmail.com'), 'test@gmail.com')

  await userEvent.click(screen.getByRole('button', { name: 'აირჩიე კურსი' }))
  await userEvent.click(await screen.findByRole('button', { name: 'Full Stack პროგრამირება' }))

  await userEvent.type(screen.getByPlaceholderText('მაგ: 5XX XXX XXX'), '598123456')
  await userEvent.type(screen.getByPlaceholderText('ბავშვებისათვის აუცილებელია'), '599123456')
}

describe('Registration', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    fetchCoursesCatalog.mockResolvedValue(mockCatalog)
  })

  it('renders the registration form', async () => {
    render(<Registration />)

    expect(screen.getByRole('heading', { name: 'რეგისტრაცია' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'რეგისტრაცია' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'აირჩიე კურსი' })).toBeInTheDocument()
    await waitFor(() => expect(fetchCoursesCatalog).toHaveBeenCalled())
  })

  it('shows validation errors on empty submit', async () => {
    render(<Registration />)

    await userEvent.click(screen.getByRole('button', { name: 'რეგისტრაცია' }))

    expect(await screen.findByText('სახელი სავალდებულოა.')).toBeInTheDocument()
    expect(screen.getByText('გვარი სავალდებულოა.')).toBeInTheDocument()
    expect(screen.getByText('კურსის არჩევა სავალდებულოა.')).toBeInTheDocument()
  })

  it('submits and shows success message on successful response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) })
    vi.stubGlobal('fetch', fetchMock)

    render(<Registration />)
    await fillRequiredFields()
    await userEvent.click(screen.getByRole('button', { name: 'რეგისტრაცია' }))

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled()
    })
    expect(
      await screen.findByText('გილოცავთ! თქვენ წარმატებით გაიარეთ რეგისტრაცია! მალე დაგიკავშირდებით.')
    ).toBeInTheDocument()
  })

  it('shows server error message on failed response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'სერვერის შეცდომა' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    render(<Registration />)
    await fillRequiredFields()
    await userEvent.click(screen.getByRole('button', { name: 'რეგისტრაცია' }))

    expect(await screen.findByText('სერვერის შეცდომა')).toBeInTheDocument()
  })
})

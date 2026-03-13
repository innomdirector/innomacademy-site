import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Header from './Header.jsx'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

describe('Header', () => {
  beforeEach(() => {
    mockNavigate.mockReset()
  })

  it('opens courses dropdown and navigates to all courses', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    await user.click(screen.getByRole('button', { name: /კურსები/ }))
    const allCourses = screen.getByRole('button', { name: 'ყველა კურსი' })
    expect(allCourses).toBeInTheDocument()

    await user.click(allCourses)
    expect(mockNavigate).toHaveBeenCalledWith('/courses')
  })

  it('scrolls to adult courses on home page', async () => {
    const user = userEvent.setup()
    const target = document.createElement('div')
    target.id = 'adult-courses'
    target.scrollIntoView = vi.fn()
    document.body.appendChild(target)

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    await user.click(screen.getByRole('button', { name: /კურსები/ }))
    await user.click(screen.getByRole('button', { name: 'კურსები ზრდასრულთათვის' }))

    expect(target.scrollIntoView).toHaveBeenCalled()

    document.body.removeChild(target)
  })
})

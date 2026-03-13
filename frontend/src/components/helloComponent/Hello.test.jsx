import { render, act } from '@testing-library/react'
import { vi } from 'vitest'
import Hello from './Hello.jsx'

describe('Hello', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('schedules hide and sets localStorage flag', async () => {
    const timeoutSpy = vi.spyOn(global, 'setTimeout')

    await act(async () => {
      render(<Hello />)
    })

    expect(timeoutSpy).toHaveBeenCalled()
    expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), 200)
    expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), 8200)

    act(() => {
      vi.advanceTimersByTime(8200)
    })
    expect(localStorage.getItem('greetingShown')).toBe('true')
  })

  it('does not schedule greeting timers when greeting already shown', async () => {
    const timeoutSpy = vi.spyOn(global, 'setTimeout')
    localStorage.setItem('greetingShown', 'true')
    timeoutSpy.mockClear()

    await act(async () => {
      render(<Hello />)
    })

    const greetingTimers = timeoutSpy.mock.calls.filter(([, delay]) => (
      delay === 200 || delay === 8200
    ))
    expect(greetingTimers.length).toBe(0)
    expect(document.body.textContent || '').not.toContain('გამარჯობა')
  })
})

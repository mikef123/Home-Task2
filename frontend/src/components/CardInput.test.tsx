import { render, screen, fireEvent } from '@testing-library/react'
import CardInput from '../components/CardInput'

describe('CardInput', () => {
  test('shows error when card is invalid', () => {
    render(<CardInput onValidate={vi.fn()} />)
    fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), {
      target: { value: '1234567812345678' },
    })
    fireEvent.click(screen.getByText('Validate'))
    expect(screen.getByText('Card number is not valid')).toBeInTheDocument()
  })

  test('calls onValidate when card is valid', () => {
    const onValidate = vi.fn()
    render(<CardInput onValidate={onValidate} />)
    fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), {
      target: { value: '4539148803436467' },
    })
    fireEvent.click(screen.getByText('Validate'))
    expect(onValidate).toHaveBeenCalledWith('4539148803436467')
  })
})

import { validateCreditCard } from '../utils/luhn'

describe('validateCreditCard', () => {
  it('returns true for a valid card number', () => {
    expect(validateCreditCard('4539148803436467')).toBe(true)
  })

  it('returns false for an invalid card number', () => {
    expect(validateCreditCard('1234567812345678')).toBe(false)
  })
})

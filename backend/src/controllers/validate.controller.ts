import { Request, Response } from 'express'
import { validateCreditCard } from '../utils/luhn'

export const validateCard = (req: Request, res: Response) => {
  const { cardNumber } = req.body

  if (!cardNumber) {
    return res.status(400).json({ error: 'Card number is required' })
  }

  const digits = cardNumber.replace(/\D/g, '')

  if (digits.length < 13 || digits.length > 19) {
    return res.status(400).json({ error: 'Invalid card number length' })
  }

  const isValid = validateCreditCard(digits)

  return res.json({ isValid })
}

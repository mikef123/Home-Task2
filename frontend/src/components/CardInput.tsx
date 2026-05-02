import { useState } from 'react'

interface Props {
  onValidate: (cardNumber: string) => void
  onReset?: () => void
  isLoading?: boolean
}

// Luhn algorithm
function luhnCheck(cardNumber: string): boolean {
  let sum = 0
  let double = false

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = Number(cardNumber[i])

    if (double) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    double = !double
  }

  return sum % 10 === 0
}

export default function CardInput({
  onValidate,
  onReset,
  isLoading = false,
}: Props) {
  const [cardNumber, setCardNumber] = useState('')
  const [error, setError] = useState('')

  const formatCard = (input: string) => {
    const digits = input.replace(/\D/g, '')
    const blocks = digits.match(/.{1,4}/g)
    return blocks ? blocks.join(' ') : ''
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCard(e.target.value)
    setCardNumber(formatted)
    if (error) setError('')
    if (onReset) onReset()
  }

  const handleSubmit = () => {
    const digits = cardNumber.replace(/\s/g, '')
    console.log('digits:', digits, 'length:', digits.length)
    console.log('luhn:', luhnCheck(digits))
    if (!digits) {
      setError('Card number is required')
      return
    }

    if (digits.length < 13 || digits.length > 19) {
      setError('Card number is too short')
      return
    }

    if (!luhnCheck(digits)) {
      setError('Card number is not valid')
      return
    }

    setError('')
    onValidate(digits)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
      }}
    >
      <input
        type="text"
        value={cardNumber}
        onChange={handleChange}
        placeholder="1234 5678 9012 3456"
        maxLength={19}
        disabled={isLoading}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '12px',
          outline: 'none',
          opacity: isLoading ? 0.6 : 1,
          background: '#1f2937',
          color: '#fff',
          border: error
            ? '2px solid red'
            : '0.5px solid rgba(255,255,255,0.15)',
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={!cardNumber || isLoading}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          background: '#374151',
          color: 'white',
          cursor: !cardNumber || isLoading ? 'not-allowed' : 'pointer',
          opacity: !cardNumber || isLoading ? 0.7 : 1,
        }}
      >
        {isLoading ? 'Validating...' : 'Validate'}
      </button>

      {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
    </div>
  )
}

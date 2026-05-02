import { useState } from 'react'
import CardInput from './components/CardInput'
import { validateCard } from './services/api'

function App() {
  const [result, setResult] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [networkError, setNetworkError] = useState(false)

  const handleCardValidation = async (cardNumber: string) => {
    setIsLoading(true)
    setResult(null)
    setNetworkError(false)

    try {
      const { isValid } = await validateCard(cardNumber)
      setResult(isValid)
    } catch (err) {
      console.error('Error validating card:', err)
      setNetworkError(true)
    }

    setIsLoading(false)
  }

  const handleReset = () => {
    setResult(null)
    setNetworkError(false)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          background: '#111827',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          width: '350px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Credit Card Validator</h2>

        <CardInput
          onValidate={handleCardValidation}
          onReset={handleReset}
          isLoading={isLoading}
        />

        {result === true && (
          <p
            style={{ color: '#22c55e', marginTop: '15px', fontWeight: 'bold' }}
          >
            Valid card
          </p>
        )}

        {result === false && (
          <p
            style={{ color: '#ef4444', marginTop: '15px', fontWeight: 'bold' }}
          >
            Invalid card
          </p>
        )}

        {networkError && (
          <p
            style={{ color: '#f97316', marginTop: '15px', fontWeight: 'bold' }}
          >
            Something went wrong, try again
          </p>
        )}
      </div>
    </div>
  )
}

export default App

const API_URL = import.meta.env.VITE_API_URL

export async function validateCard(cardNumber: string) {
  const response = await fetch(`${API_URL}/api/validatecard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cardNumber }),
  })

  if (!response.ok) {
    throw new Error('Error validating card')
  }

  return response.json()
}

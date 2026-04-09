const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://hotbotst.app.n8n.cloud/webhook/soulstretect-globel'

export interface WebhookPayload {
  source: 'contact_form' | 'product_inquiry' | 'chat_message' | 'whatsapp_click'
  name?: string
  email?: string
  message?: string
  type?: string
  product?: string
  timestamp: string
  page: string
}

export async function sendToN8N(payload: WebhookPayload): Promise<boolean> {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return response.ok
  } catch {
    console.error('n8n webhook failed')
    return false
  }
}

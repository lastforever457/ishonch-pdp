export const formatPhoneNumber = (phone: string) => {
  const cleaned = ('' + phone).replace(/\D/g, '')
  if (cleaned.length === 12) {
    return `+998 (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10, 12)}`
  }
  return phone
}

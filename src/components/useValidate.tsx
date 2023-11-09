export const useValidate = () => {
  const valid: boolean = true

  const validate = () => {
    console.log('Validating man!!')
    return 'validated bro'
  }

  return { valid, validate }
}

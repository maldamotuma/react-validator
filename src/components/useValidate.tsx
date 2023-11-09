import { useCallback, useEffect, useRef } from 'react'
import validator from 'validator'

const test = (re: RegExp, str: string) => {
  return re.test(str)
}
const validationRules = {
  required: (in_val: string) => !validator.isEmpty(in_val),
  email: (in_val: string) => validator.isEmail(in_val),
  name: (in_val: string) => validator.isAlpha(in_val),
  full_name: (in_val: string) => test(/^[a-zA-Z]{3,} [a-zA-Z]{3,}$/g, in_val),
  url: (in_val: string) => validator.isURL(in_val),
  alpha_numeric: (in_val: string) => validator.isAlphanumeric(in_val),
  ascii: (in_val: string) => validator.isAscii(in_val),
  base_32: (in_val: string) => validator.isBase32(in_val),
  base_58: (in_val: string) => validator.isBase58(in_val),
  base_64: (in_val: string) => validator.isBase64(in_val),
  before_now: (in_val: string) => validator.isBefore(in_val),
  BIC: (in_val: string) => validator.isBIC(in_val),
  BTC: (in_val: string) => validator.isBtcAddress(in_val),
  credit_card: (in_val: string) => validator.isCreditCard(in_val),
  currency: (in_val: string) => validator.isCurrency(in_val),
  date: (in_val: string) => validator.isDate(in_val),
  decimal: (in_val: string) => validator.isDecimal(in_val),
  even: (in_val: string) => validator.isDivisibleBy(in_val, 2),
  odd: (in_val: string) => !validator.isDivisibleBy(in_val, 2),
  ethereum: (in_val: string) => validator.isEthereumAddress(in_val),
  float: (in_val: string) => validator.isFloat(in_val),
  domain: (in_val: string) => validator.isFreightContainerID(in_val),
  shipping_id: (in_val: string) => validator.isISO6346(in_val),
  hexadecimal: (in_val: string) => validator.isHexadecimal(in_val),
  hex_color: (in_val: string) => validator.isHexColor(in_val),
  hsl: (in_val: string) => validator.isHSL(in_val),
  international_bank: (in_val: string) => validator.isIBAN(in_val),
  identity_code: (in_val: string) => validator.isIdentityCard(in_val),
  IMEI: (in_val: string) => validator.isIMEI(in_val),
  int: (in_val: string) => validator.isInt(in_val),
  ip: (in_val: string) => validator.isIP(in_val),
  ip_range: (in_val: string) => validator.isIPRange(in_val),
  JSON: (in_val: string) => validator.isJSON(in_val),
  JWT: (in_val: string) => validator.isJWT(in_val),
  lat_long: (in_val: string) => validator.isLatLong(in_val),
  locale: (in_val: string) => validator.isLocale(in_val),
  lower_case: (in_val: string) => validator.isLowercase(in_val),
  MAC: (in_val: string) => validator.isMACAddress(in_val),
  mime: (in_val: string) => validator.isMimeType(in_val),
  phone: (in_val: string) => validator.isMobilePhone(in_val, 'any'),
  numeric: (in_val: string) => validator.isNumeric(in_val),
  isOctal: (in_val: string) => validator.isOctal(in_val),
  passport: (in_val: string) => validator.isPassportNumber(in_val),
  port: (in_val: string) => validator.isPort(in_val),
  postal: (in_val: string) => validator.isPostalCode(in_val, 'any'),
  rgb: (in_val: string) => validator.isRgbColor(in_val),
  sem_ver: (in_val: string) => validator.isSemVer(in_val),
  upper_case: (in_val: string) => validator.isUppercase(in_val),
  slug: (in_val: string) => validator.isSlug(in_val),
  strong_password: (in_val: string) => validator.isStrongPassword(in_val),
  time: (in_val: string) => validator.isTime(in_val),
  tax_id: (in_val: string) => validator.isTaxID(in_val),
  uuid: (in_val: string) => validator.isUUID(in_val),
}

const validationMessages = {
  required: (in_name: string) => `${in_name} Required`,
  email: (in_name: string) => `${in_name} must be a valid email address`,
  name: (in_name: string) => `${in_name} must be valid (only alphabets accepted)`,
  full_name: (in_name: string) => `${in_name} must be a valid full name`,
  url: (in_name: string) => `${in_name} must be a valid URL link`,
  alpha_numeric: (in_name: string) => `${in_name}: only letters and numbers (a-zA-Z0-9) allowed`,
  ascii: (in_name: string) => `${in_name}: only ASCII chars allowed`,
  base_32: (in_name: string) => `${in_name}: must be base32 encoded`,
  base_58: (in_name: string) => `${in_name}: must be base58 encoded`,
  base_64: (in_name: string) => `${in_name}: must be base64 encoded`,
  before_now: (in_name: string) => `${in_name}: must be before now!`,
  BIC: (in_name: string) => `${in_name}: not a BIC (Bank Identification Code) or SWIFT code.`,
  BTC: (in_name: string) => `${in_name}: the value is not a valid BTC address.`,
  credit_card: (in_name: string) => `${in_name}: the value is not a valid credit card number.`,
  currency: (in_name: string) => `${in_name}: the value is not a valid currency amount.`,
  date: (in_name: string) => `${in_name}: Not Valid date.`,
  decimal: (in_name: string) => `${in_name}: please enter decimal only!`,
  even: (in_name: string) => `${in_name}: Please Enter even number`,
  odd: (in_name: string) => `${in_name}: Please Enter odd number`,
  ethereum: (in_name: string) => `${in_name}: Enter a valid Ethereum address`,
  float: (in_name: string) => `${in_name} must be a a float`,
  domain: (in_name: string) => `${in_name}: It is not fully qualified domain name (e.g. domain.com).`,
  shipping_id: (in_name: string) =>
    `${in_name}: check if the string is a valid ISO 6346 shipping container identification.`,
  hexadecimal: (in_name: string) => `${in_name}: check if the string is a hexadecimal number.`,
  hex_color: (in_name: string) => `${in_name}: check if the string is a hexadecimal color.`,
  hsl: (in_name: string) =>
    `${in_name}: check if the string is an HSL (hue, saturation, lightness, optional alpha) color based on CSS Colors Level 4 specification.`,
  international_bank: (in_name: string) =>
    `${in_name}: check if the string is an IBAN (International Bank Account Number).`,
  identity_code: (in_name: string) => `${in_name}: check if the string is a valid identity card code.`,
  IMEI: (in_name: string) =>
    `${in_name}: check if the string is a valid IMEI number. IMEI should be of format ############### or ##-######-######-#.`,
  int: (in_name: string) => `${in_name}: check if the string is an integer.`,
  ip: (in_name: string) => `${in_name}: check if the string is an IP (version 4 or 6).`,
  ip_range: (in_name: string) => `${in_name}: check if the string is an IP Range (version 4 or 6).`,
  JSON: (in_name: string) => `${in_name}: check if the string is valid JSON`,
  JWT: (in_name: string) => `${in_name}: check if the string is valid JWT token.`,
  lat_long: (in_name: string) =>
    `${in_name}: check if the string is a valid latitude-longitude coordinate in the format lat,long or lat, long.`,
  locale: (in_name: string) => `${in_name}: check if the string is a locale.`,
  lower_case: (in_name: string) => `${in_name}: check if the string is lowercase.`,
  MAC: (in_name: string) => `${in_name}: check if the string is a MAC address.`,
  mime: (in_name: string) => `${in_name}: check if the string matches to a valid MIME type format.`,
  phone: (in_name: string) => `${in_name}: check if the string is a mobile phone number,`,
  numeric: (in_name: string) => `${in_name}: check if the string contains only numbers.`,
  isOctal: (in_name: string) => `${in_name}: check if the string is a valid octal number.`,
  passport: (in_name: string) => `${in_name}: check if the string is a valid passport number.`,
  port: (in_name: string) => `${in_name}: check if the string is a valid port number.`,
  postal: (in_name: string) => `${in_name}: check if the string is a postal code.`,
  rgb: (in_name: string) => `${in_name}: check if the string is a rgb or rgba color.`,
  sem_ver: (in_name: string) => `${in_name}: check if the string is a Semantic Versioning Specification (SemVer).`,
  upper_case: (in_name: string) => `${in_name}: check if the string is uppercase.`,
  slug: (in_name: string) => `${in_name}: check if the string is of type slug.`,
  strong_password: (in_name: string) => `${in_name}: Please Provide Strong Password`,
  time: (in_name: string) => `${in_name}: check if the string is a valid time`,
  tax_id: (in_name: string) => `${in_name}: check if the string is a valid Tax Identification Number.`,
  uuid: (in_name: string) => `${in_name}: check if the string is a UUID`,
}

export type validationTypes =
  | 'required'
  | 'email'
  | 'name'
  | 'full_name'
  | 'url'
  | 'alpha_numeric'
  | 'ascii'
  | 'base_32'
  | 'base_58'
  | 'base_64'
  | 'before_now'
  | 'BIC'
  | 'BTC'
  | 'credit_card'
  | 'currency'
  | 'date'
  | 'decimal'
  | 'even'
  | 'odd'
  | 'ethereum'
  | 'float'
  | 'domain'
  | 'shipping_id'
  | 'hexadecimal'
  | 'hex_color'
  | 'hsl'
  | 'international_bank'
  | 'identity_code'
  | 'IMEI'
  | 'int'
  | 'ip'
  | 'ip_range'
  | 'JSON'
  | 'JWT'
  | 'lat_long'
  | 'locale'
  | 'lower_case'
  | 'MAC'
  | 'mime'
  | 'phone'
  | 'numeric'
  | 'isOctal'
  | 'passport'
  | 'port'
  | 'postal'
  | 'rgb'
  | 'sem_ver'
  | 'upper_case'
  | 'slug'
  | 'strong_password'
  | 'time'
  | 'tax_id'
  | 'uuid'

export type rulesAndMessagedType = {
  rules: { [key: string]: validationTypes[] }
  messages?: { [key: string]: string[] }
  custom?: {
    rules: { [key: string]: string }
    messages: { [key: string]: string }
  }
}

export const useValidate = (form_id: string, rules_objects: rulesAndMessagedType) => {
  const valid = useRef<boolean>(false)
  const mountRef = useRef<null | true>(null)
  const blurTrack = useRef<string[]>([])

  useCallback(() => {}, [])

  const check_validity = useCallback(
    (ipt_name: string, frm: HTMLFormElement) => {
      const parent = document.querySelector(`#input-${ipt_name}`)
      const inpt: any = frm?.querySelector(`input[name='${ipt_name}']`)
      const rls = rules_objects.rules[ipt_name]
      const rls_legth = rls?.length || 0
      let i: number = 0
      const vl = parent?.querySelector(`#validation-${ipt_name}`)
      if (vl) {
        parent?.removeChild(vl)
      }
      for (i; i < rls_legth; i++) {
        if (!validationRules[rls[i]](inpt.value)) {
          const p = document.createElement('p')
          p.style.padding = '5px 10px 0px 10px'
          p.style.margin = '0px'
          p.style.color = 'red'
          p.style.fontSize = '14px'
          p.classList.add('react-next-validator-helper')
          p.setAttribute('id', `validation-${ipt_name}`)
          const msg = document.createTextNode(`**${validationMessages[rls[i]](ipt_name)}`)
          p.append(msg)
          parent?.append(p)
          if (valid.current) valid.current = false
          return
        }
      }
    },
    [rules_objects],
  )

  useEffect(() => {
    if (mountRef.current) {
      const frm: HTMLFormElement | null = document.querySelector(`form#${form_id}`)
      frm?.querySelectorAll(`input`)?.forEach((inpt) => {
        inpt.addEventListener('blur', (e: any) => {
          const input_name = e.target?.name
          if (!blurTrack.current.includes(input_name)) {
            blurTrack.current.push(input_name)
            check_validity(e.target?.name, frm)
          }
        })
      })
      frm?.querySelectorAll(`input`)?.forEach((inpt) => {
        inpt.addEventListener('input', (e: any) => {
          const input_name = e.target?.name
          if (blurTrack.current.includes(input_name)) check_validity(e.target?.name, frm)
        })
      })
    }
    return () => {
      mountRef.current = true
    }
  }, [check_validity, form_id])

  const validate = (cb: () => void) => {
    valid.current = true
    const frm: HTMLFormElement | null = document.querySelector(`form#${form_id}`)
    if (frm) {
      blurTrack.current = [...Object.keys(rules_objects.rules)]
      Object.keys(rules_objects.rules).forEach((key) => {
        check_validity(key, frm)
      })
    }
    if (valid.current) {
      cb()
    }
  }

  return {
    valid: valid.current,
    validate,
  }
}

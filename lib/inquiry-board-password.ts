import { randomBytes, scryptSync, timingSafeEqual } from "crypto"

const SCRYPT_KEYLEN = 32

export function hashPostPassword(plain: string): string {
  const salt = randomBytes(16)
  const hash = scryptSync(plain, salt, SCRYPT_KEYLEN)
  return `${salt.toString("hex")}:${hash.toString("hex")}`
}

export function verifyPostPassword(plain: string, stored: string): boolean {
  const parts = stored.split(":")
  if (parts.length !== 2) return false
  const [saltHex, hashHex] = parts
  const salt = Buffer.from(saltHex, "hex")
  const expected = Buffer.from(hashHex, "hex")
  if (salt.length === 0 || expected.length !== SCRYPT_KEYLEN) return false
  const actual = scryptSync(plain, salt, SCRYPT_KEYLEN)
  if (actual.length !== expected.length) return false
  return timingSafeEqual(actual, expected)
}

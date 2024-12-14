"server only"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PinataSDK } from "pinata"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`
})
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomItem<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined
  }
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

export function splitArrayIntoParts<T>(array: T[], numParts: number): T[][] {
  return array.reduce((result: T[][], currentItem: T, index: number) => {
    const partIndex = index % numParts
    if (!result[partIndex]) {
      result[partIndex] = []
    }
    result[partIndex].push(currentItem)
    return result
  }, [])
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(price)
}

// LEARN: Intl.NumberFormat
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat

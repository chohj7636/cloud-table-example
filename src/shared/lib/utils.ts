import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 입력값이 유효한 문자열인지 검증
 * @param value - 검증할 값
 * @returns true: 유효한 값, false: 빈 값이거나 공백만 있는 경우
 */
export const isValidInput = (value: string | undefined | null): boolean => {
  return !!(value && value.trim().length > 0);
};

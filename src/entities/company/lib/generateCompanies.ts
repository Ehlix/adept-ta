import { randomToken } from '@/shared/lib/algo';
import { Company } from '../model/types';

export function generateCompanies(count: number): Company[] {
  return Array.from({ length: count }, () => ({
    id: randomToken(),
    name: `Company-${Math.random().toString(36).substring(7)}`,
    address: `Address-${Math.random().toString(36).substring(7)}`,
    isSelected: false,
  }));
}

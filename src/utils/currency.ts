import { ExchangeRate, Currency } from '@/types';


const EXCHANGE_RATE_API_URL = 'https://v6.exchangerate-api.com/v6';
const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;

export async function fetchExchangeRate(): Promise<ExchangeRate> {
  try {
    
    let url: string;
    if (API_KEY) {
      url = `${EXCHANGE_RATE_API_URL}/${API_KEY}/latest/USD`;
    } else {
      
      url = 'https://api.exchangerate-api.com/v4/latest/USD';
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    

    let inrRate: number;
    if (data.conversion_rates && data.conversion_rates.INR) {
  
      inrRate = data.conversion_rates.INR;
    } else if (data.rates && data.rates.INR) {
    
      inrRate = data.rates.INR;
    } else {
      throw new Error('INR rate not found in response');
    }
    
    return {
      rate: inrRate,
      lastUpdated: new Date(),
      fromCurrency: 'USD',
      toCurrency: 'INR'
    };
  } catch (error) {
    console.warn('Error fetching live exchange rate, using fallback:', error);
    // Fallback
    return {
      rate: 83.5,
      lastUpdated: new Date(),
      fromCurrency: 'USD',
      toCurrency: 'INR'
    };
  }
}

export function convertCurrency(
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency,
  exchangeRate: ExchangeRate
): number {
  if (fromCurrency === toCurrency) return amount;
  
  if (fromCurrency === 'USD' && toCurrency === 'INR') {
    return amount * exchangeRate.rate;
  } else if (fromCurrency === 'INR' && toCurrency === 'USD') {
    return amount / exchangeRate.rate;
  }
  
  return amount;
}

export function formatCurrency(amount: number, currency: Currency): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: currency === 'INR' ? 0 : 2,
    maximumFractionDigits: currency === 'INR' ? 0 : 2,
  });
  
  return formatter.format(amount);
}

export function getCurrencySymbol(currency: Currency): string {
  return currency === 'INR' ? '₹' : '$';
}

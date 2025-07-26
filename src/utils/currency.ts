import { ExchangeRate, Currency } from '@/types';

// Using exchangerate-api.com free tier (1,500 requests/month)
const EXCHANGE_RATE_API_URL = 'https://v6.exchangerate-api.com/v6';
const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;

export async function fetchExchangeRate(): Promise<ExchangeRate> {
  try {
    // Try the API with key first, fall back to free version
    let url: string;
    if (API_KEY) {
      url = `${EXCHANGE_RATE_API_URL}/${API_KEY}/latest/USD`;
    } else {
      // Using free version - limited requests but should work for demo
      url = 'https://api.exchangerate-api.com/v4/latest/USD';
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle different response formats
    let inrRate: number;
    if (data.conversion_rates && data.conversion_rates.INR) {
      // v6 API format
      inrRate = data.conversion_rates.INR;
    } else if (data.rates && data.rates.INR) {
      // v4 API format
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
    // Fallback to a reasonable rate if API fails
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

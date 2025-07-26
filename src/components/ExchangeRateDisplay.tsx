"use client";

import { ExchangeRate } from "@/types";
import { Button } from "@/components/ui/Button";

interface ExchangeRateDisplayProps {
  exchangeRate: ExchangeRate | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function ExchangeRateDisplay({
  exchangeRate,
  loading,
  error,
  onRefresh,
}: ExchangeRateDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <span className="mr-2">💱</span>
            Exchange Rate
          </h3>

          {error && <div className="text-red-600 text-sm mb-2">⚠️ {error}</div>}

          {exchangeRate && !error && (
            <div>
              <p className="text-xl font-bold text-green-600">
                1 USD = ₹{exchangeRate.rate.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Last updated: {exchangeRate.lastUpdated.toLocaleString()}
              </p>
            </div>
          )}

          {!exchangeRate && !error && !loading && (
            <p className="text-gray-500">Exchange rate not available</p>
          )}

          {loading && (
            <div className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 text-blue-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-gray-600">Fetching exchange rate...</span>
            </div>
          )}
        </div>

        <Button
          onClick={onRefresh}
          loading={loading}
          variant="secondary"
          size="sm"
        >
          <span className="mr-1">🔄</span>
          Refresh Rate
        </Button>
      </div>
    </div>
  );
}

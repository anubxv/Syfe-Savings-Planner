"use client";

import { Goal, ExchangeRate } from "@/types";
import { calculateDashboardStats } from "@/utils/storage";
import { formatCurrency, convertCurrency } from "@/utils/currency";

interface DashboardProps {
  goals: Goal[];
  exchangeRate: ExchangeRate | null;
}

export function Dashboard({ goals, exchangeRate }: DashboardProps) {
  const stats = calculateDashboardStats(goals);

  // Convert totals to both currencies for display
  const getTotalInBothCurrencies = () => {
    if (!exchangeRate) return { inr: 0, usd: 0 };

    // Calculate totals in original currencies first
    let totalINR = 0;
    let totalUSD = 0;

    goals.forEach((goal) => {
      const goalAmount =
        goal.currency === "INR"
          ? goal.targetAmount
          : convertCurrency(goal.targetAmount, "USD", "INR", exchangeRate);
      totalINR += goalAmount;

      const goalAmountUSD =
        goal.currency === "USD"
          ? goal.targetAmount
          : convertCurrency(goal.targetAmount, "INR", "USD", exchangeRate);
      totalUSD += goalAmountUSD;
    });

    return { inr: totalINR, usd: totalUSD };
  };

  const getSavedInBothCurrencies = () => {
    if (!exchangeRate) return { inr: 0, usd: 0 };

    let savedINR = 0;
    let savedUSD = 0;

    goals.forEach((goal) => {
      const savedAmount =
        goal.currency === "INR"
          ? goal.currentAmount
          : convertCurrency(goal.currentAmount, "USD", "INR", exchangeRate);
      savedINR += savedAmount;

      const savedAmountUSD =
        goal.currency === "USD"
          ? goal.currentAmount
          : convertCurrency(goal.currentAmount, "INR", "USD", exchangeRate);
      savedUSD += savedAmountUSD;
    });

    return { inr: savedINR, usd: savedUSD };
  };

  const targetTotals = getTotalInBothCurrencies();
  const savedTotals = getSavedInBothCurrencies();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">💰 Savings Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Goals */}
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">🎯</span>
            <h3 className="text-lg font-semibold">Goals</h3>
          </div>
          <p className="text-2xl font-bold">{stats.goalCount}</p>
          <p className="text-white/80 text-sm">Active goals</p>
        </div>

        {/* Total Target */}
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">🎖️</span>
            <h3 className="text-lg font-semibold">Target</h3>
          </div>
          <p className="text-xl font-bold">
            {formatCurrency(targetTotals.inr, "INR")}
          </p>
          <p className="text-white/80 text-sm">
            {formatCurrency(targetTotals.usd, "USD")}
          </p>
        </div>

        {/* Total Saved */}
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">💰</span>
            <h3 className="text-lg font-semibold">Saved</h3>
          </div>
          <p className="text-xl font-bold">
            {formatCurrency(savedTotals.inr, "INR")}
          </p>
          <p className="text-white/80 text-sm">
            {formatCurrency(savedTotals.usd, "USD")}
          </p>
        </div>

        {/* Overall Progress */}
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">📊</span>
            <h3 className="text-lg font-semibold">Progress</h3>
          </div>
          <p className="text-2xl font-bold">
            {stats.overallProgress.toFixed(1)}%
          </p>
          <div className="mt-2">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(stats.overallProgress, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Exchange Rate Info */}
      {exchangeRate && (
        <div className="mt-6 text-center text-white/80">
          <p className="text-sm">
            Exchange Rate: 1 USD = ₹{exchangeRate.rate.toFixed(2)} | Last
            updated: {exchangeRate.lastUpdated.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

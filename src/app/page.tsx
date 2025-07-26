"use client";

import { useGoals, useExchangeRate } from "@/hooks/useGoals";
import { Dashboard } from "@/components/Dashboard";
import { AddGoalForm } from "@/components/AddGoalForm";
import { GoalList } from "@/components/GoalList";
import { ExchangeRateDisplay } from "@/components/ExchangeRateDisplay";

export default function HomePage() {
  const {
    goals,
    loading: goalsLoading,
    addGoal,
    addContribution,
    deleteGoal,
  } = useGoals();
  const {
    exchangeRate,
    loading: rateLoading,
    error: rateError,
    refreshRate,
  } = useExchangeRate();

  if (goalsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4"
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
          <p className="text-gray-600">Loading your savings data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          💰 Syfe Savings Planner
        </h1>
        <p className="text-xl text-gray-600">
          Track your financial goals with multi-currency support
        </p>
      </header>

      {/* Dashboard */}
      <Dashboard goals={goals} exchangeRate={exchangeRate} />

      {/* Exchange Rate Display */}
      <ExchangeRateDisplay
        exchangeRate={exchangeRate}
        loading={rateLoading}
        error={rateError}
        onRefresh={refreshRate}
      />

      {/* Add Goal Form */}
      <AddGoalForm onAddGoal={addGoal} />

      {/* Goals Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Your Goals {goals.length > 0 && `(${goals.length})`}
          </h2>
        </div>

        <GoalList
          goals={goals}
          exchangeRate={exchangeRate}
          onAddContribution={addContribution}
          onDeleteGoal={deleteGoal}
        />
      </section>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
        <p>
          © 2025 Syfe Savings Planner. Built with Next.js, TypeScript, and
          Tailwind CSS.
        </p>
      </footer>
    </div>
  );
}

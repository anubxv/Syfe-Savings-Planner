"use client";

import { Goal, ExchangeRate } from "@/types";
import { GoalCard } from "@/components/GoalCard";

interface GoalListProps {
  goals: Goal[];
  exchangeRate: ExchangeRate | null;
  onAddContribution: (goalId: string, amount: number, date: Date) => void;
  onDeleteGoal: (goalId: string) => void;
}

export function GoalList({
  goals,
  exchangeRate,
  onAddContribution,
  onDeleteGoal,
}: GoalListProps) {
  if (goals.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No goals yet
        </h3>
        <p className="text-gray-600 mb-6">
          Start your savings journey by creating your first financial goal!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          exchangeRate={exchangeRate}
          onAddContribution={onAddContribution}
          onDeleteGoal={onDeleteGoal}
        />
      ))}
    </div>
  );
}

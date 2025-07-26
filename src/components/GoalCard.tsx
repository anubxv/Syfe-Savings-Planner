"use client";

import { useState } from "react";
import { Goal, ExchangeRate } from "@/types";
import { calculateGoalProgress } from "@/utils/storage";
import { formatCurrency, convertCurrency } from "@/utils/currency";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AddContributionModal } from "@/components/AddContributionModal";

interface GoalCardProps {
  goal: Goal;
  exchangeRate: ExchangeRate | null;
  onAddContribution: (goalId: string, amount: number, date: Date) => void;
  onDeleteGoal: (goalId: string) => void;
}

export function GoalCard({
  goal,
  exchangeRate,
  onAddContribution,
  onDeleteGoal,
}: GoalCardProps) {
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const progress = calculateGoalProgress(goal);
  const isCompleted = progress >= 100;

  // Convert target and current amounts to the other currency
  const getConvertedAmount = (amount: number) => {
    if (!exchangeRate) return amount;

    const otherCurrency = goal.currency === "INR" ? "USD" : "INR";
    return convertCurrency(amount, goal.currency, otherCurrency, exchangeRate);
  };

  const convertedTarget = getConvertedAmount(goal.targetAmount);
  const convertedCurrent = getConvertedAmount(goal.currentAmount);
  const otherCurrency = goal.currency === "INR" ? "USD" : "INR";

  const handleAddContribution = (amount: number, date: Date) => {
    onAddContribution(goal.id, amount, date);
  };

  const handleDelete = () => {
    onDeleteGoal(goal.id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {goal.name}
            </h3>
            <p className="text-sm text-gray-500">
              Created {goal.createdAt.toLocaleDateString()}
            </p>
          </div>

          {/* Status Badge */}
          {isCompleted && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✅ Completed
            </span>
          )}
        </div>

        {/* Target Amount */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Target</span>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(goal.targetAmount, goal.currency)}
              </p>
              {exchangeRate && (
                <p className="text-sm text-gray-500">
                  {formatCurrency(convertedTarget, otherCurrency)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Current Amount */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Saved</span>
            <div className="text-right">
              <p className="text-lg font-semibold text-blue-600">
                {formatCurrency(goal.currentAmount, goal.currency)}
              </p>
              {exchangeRate && (
                <p className="text-sm text-gray-500">
                  {formatCurrency(convertedCurrent, otherCurrency)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <ProgressBar progress={progress} showLabel={false} />
        </div>

        {/* Contributions Summary */}
        {goal.contributions.length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              <span className="font-medium">{goal.contributions.length}</span>{" "}
              contribution{goal.contributions.length !== 1 ? "s" : ""}
            </p>
            <p className="text-sm text-gray-600">
              Last:{" "}
              {goal.contributions[
                goal.contributions.length - 1
              ]?.date.toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            onClick={() => setIsContributionModalOpen(true)}
            className="flex-1"
            disabled={isCompleted}
          >
            <span className="mr-2">💰</span>
            Add Contribution
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
            className="px-3"
          >
            🗑️
          </Button>
        </div>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800 mb-3">
              Are you sure you want to delete this goal? This action cannot be
              undone.
            </p>
            <div className="flex space-x-2">
              <Button variant="danger" size="sm" onClick={handleDelete}>
                Delete
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      <AddContributionModal
        isOpen={isContributionModalOpen}
        onClose={() => setIsContributionModalOpen(false)}
        onAddContribution={handleAddContribution}
        goalName={goal.name}
      />
    </>
  );
}

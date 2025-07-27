"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Plus,
  Trash2,
  CheckCircle,
  Calendar,
  TrendingUp,
} from "lucide-react";
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
      <motion.div
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        layout
      >
       
        <motion.div
          className="flex justify-between items-start mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <Target className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">
                {goal.name}
              </h3>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              Created {goal.createdAt.toLocaleDateString()}
            </div>
          </div>

         
          <AnimatePresence>
            {isCompleted && (
              <motion.span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-syfe-gradient text-white border border-purple-200"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                Completed
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        
        <motion.div
          className="mb-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">
              Target Amount
            </span>
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
        </motion.div>

       
        <motion.div
          className="mb-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-sm font-medium text-gray-700">
                Amount Saved
              </span>
            </div>
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
        </motion.div>

        
        <motion.div
          className="mb-6"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <ProgressBar progress={progress} showLabel={true} />
        </motion.div>

        
        <div className="mb-6 h-20 flex items-center">
          <AnimatePresence>
            {goal.contributions.length > 0 ? (
              <motion.div
                className="w-full p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-blue-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-blue-700 font-medium">
                  {goal.contributions.length} contribution
                  {goal.contributions.length !== 1 ? "s" : ""} made
                </p>
                <p className="text-sm text-blue-600">
                  Last:{" "}
                  {goal.contributions[
                    goal.contributions.length - 1
                  ]?.date.toLocaleDateString()}
                </p>
              </motion.div>
            ) : (
              <motion.div
                className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-gray-500 text-center">
                  No contributions yet
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

       
        <motion.div
          className="flex space-x-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => setIsContributionModalOpen(true)}
            className="flex-1 bg-syfe-gradient hover:bg-syfe-gradient-dark"
            disabled={isCompleted}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Contribution
          </Button>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              className="px-3"
            >
              <Trash2 className="w-6 h-6" />
            </Button>
          </motion.div>
        </motion.div>

        
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-red-800 mb-4">
                Are you sure you want to delete this goal? This action cannot be
                undone.
              </p>
              <div className="flex space-x-4 ">
                <Button variant="danger" size="sm" onClick={handleDelete}>
                  <Trash2 className="w-4 h-4 mr-1" />
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AddContributionModal
        isOpen={isContributionModalOpen}
        onClose={() => setIsContributionModalOpen(false)}
        onAddContribution={handleAddContribution}
        goalName={goal.name}
      />
    </>
  );
}

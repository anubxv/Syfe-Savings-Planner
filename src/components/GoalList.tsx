"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  TrendingUp,
  Plus,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { Goal, ExchangeRate, Currency } from "@/types";
import { GoalCard } from "@/components/GoalCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { validateGoalForm } from "@/utils/storage";

interface GoalListProps {
  goals: Goal[];
  exchangeRate: ExchangeRate | null;
  onAddContribution: (goalId: string, amount: number, date: Date) => void;
  onDeleteGoal: (goalId: string) => void;
  onAddGoal: (name: string, targetAmount: number, currency: Currency) => void;
}

export function GoalList({
  goals,
  exchangeRate,
  onAddContribution,
  onDeleteGoal,
  onAddGoal,
}: GoalListProps) {
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("INR");
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const amount = parseFloat(targetAmount);
    const validationErrors = validateGoalForm(name, amount);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      onAddGoal(name, amount, currency);
      setName("");
      setTargetAmount("");
      setCurrency("INR");
      setErrors([]);
      setIsAddGoalOpen(false);
    } catch {
      setErrors(["Failed to create goal. Please try again."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsAddGoalOpen(false);
    setName("");
    setTargetAmount("");
    setCurrency("INR");
    setErrors([]);
  };
  if (goals.length === 0) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-24 h-24 mx-auto mb-6 bg-syfe-gradient rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          <Target className="w-12 h-12 text-white" />
        </motion.div>
        <motion.h3
          className="text-2xl font-semibold text-gray-900 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          No goals yet
        </motion.h3>
        <motion.p
          className="text-gray-600 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Start your savings journey by creating your first financial goal!
        </motion.p>

        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setIsAddGoalOpen(true)}
              className="bg-syfe-gradient hover:bg-syfe-gradient-dark text-lg px-8 py-4"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Goal
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <TrendingUp className="w-4 h-4 mr-1" />
          Set targets, track progress, achieve success
        </motion.div>

        {/* Modal for empty state */}
        <Modal
          isOpen={isAddGoalOpen}
          onClose={handleClose}
          title="Create New Goal"
        >
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Goal Name */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <label
                htmlFor="goalName"
                className="flex items-center text-sm font-medium text-gray-700 mb-2"
              >
                <Target className="w-4 h-4 mr-2 text-blue-500" />
                Goal Name
              </label>
              <motion.input
                type="text"
                id="goalName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Emergency Fund, Trip to Japan"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </motion.div>

            {/* Target Amount */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <label
                htmlFor="targetAmount"
                className="flex items-center text-sm font-medium text-gray-700 mb-2"
              >
                <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                Target Amount
              </label>
              <motion.input
                type="number"
                id="targetAmount"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="0"
                min="1"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </motion.div>

            {/* Currency */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <label
                htmlFor="currency"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Currency
              </label>
              <motion.select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
              </motion.select>
            </motion.div>

            {errors.length > 0 && (
              <motion.div
                className="bg-red-50 border border-red-200 rounded-lg p-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Please fix the following errors:
                    </h3>
                    <ul className="mt-2 text-sm text-red-700 space-y-1">
                      {errors.map((error, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center"
                        >
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2" />
                          {error}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              className="flex justify-end space-x-3 pt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Button
                type="button"
                variant="secondary"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" loading={isSubmitting}>
                <Target className="w-4 h-4 mr-2" />
                Create Goal
              </Button>
            </motion.div>
          </motion.form>
        </Modal>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Target className="w-6 h-6 mr-2 text-blue-500" />
          Your Goals
          {goals.length > 0 && (
            <span className="ml-2 px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
              {goals.length}
            </span>
          )}
        </h2>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => setIsAddGoalOpen(true)}
            className="w-full sm:w-auto bg-syfe-gradient hover:bg-syfe-gradient-dark"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Goal
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <AnimatePresence mode="popLayout">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut",
                  },
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: -20,
                transition: { duration: 0.3 },
              }}
              layout
            >
              <GoalCard
                goal={goal}
                exchangeRate={exchangeRate}
                onAddContribution={onAddContribution}
                onDeleteGoal={onDeleteGoal}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <Modal
        isOpen={isAddGoalOpen}
        onClose={handleClose}
        title="Create New Goal"
      >
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Goal Name */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <label
              htmlFor="goalName"
              className="flex items-center text-sm font-medium text-gray-700 mb-2"
            >
              <Target className="w-4 h-4 mr-2 text-blue-500" />
              Goal Name
            </label>
            <motion.input
              type="text"
              id="goalName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Emergency Fund, Trip to Japan"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </motion.div>

          {/* Target Amount */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <label
              htmlFor="targetAmount"
              className="flex items-center text-sm font-medium text-gray-700 mb-2"
            >
              <DollarSign className="w-4 h-4 mr-2 text-green-500" />
              Target Amount
            </label>
            <motion.input
              type="number"
              id="targetAmount"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="0"
              min="1"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </motion.div>

          {/* Currency */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Currency
            </label>
            <motion.select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
            </motion.select>
          </motion.div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <motion.div
              className="bg-red-50 border border-red-200 rounded-lg p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Please fix the following errors:
                  </h3>
                  <ul className="mt-2 text-sm text-red-700 space-y-1">
                    {errors.map((error, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2" />
                        {error}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            className="flex justify-end space-x-3 pt-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              <Target className="w-4 h-4 mr-2" />
              Create Goal
            </Button>
          </motion.div>
        </motion.form>
      </Modal>
    </motion.div>
  );
}

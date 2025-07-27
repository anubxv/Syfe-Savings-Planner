"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Target, DollarSign, AlertCircle } from "lucide-react";
import { Currency } from "@/types";
import { validateGoalForm } from "@/utils/storage";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

interface AddGoalFormProps {
  onAddGoal: (name: string, targetAmount: number, currency: Currency) => void;
}

export function AddGoalForm({ onAddGoal }: AddGoalFormProps) {
  const [isOpen, setIsOpen] = useState(false);
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
      setIsOpen(false);
    } catch {
      setErrors(["Failed to create goal. Please try again."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setName("");
    setTargetAmount("");
    setCurrency("INR");
    setErrors([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full mb-6 py-4 bg-syfe-gradient hover:bg-syfe-gradient-dark"
      >
        <Plus className="w-5 h-5 mr-2" />
        <span className="text-base">Create New Goal</span>
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose} title="Create New Goal">
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
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

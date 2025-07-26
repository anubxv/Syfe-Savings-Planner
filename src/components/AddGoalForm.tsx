"use client";

import { useState } from "react";
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

      // Reset form
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
    <>
      <Button onClick={() => setIsOpen(true)} className="mb-6">
        <span className="mr-2">➕</span>
        Add New Goal
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose} title="Create New Goal">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Goal Name */}
          <div>
            <label
              htmlFor="goalName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Goal Name
            </label>
            <input
              type="text"
              id="goalName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Emergency Fund, Trip to Japan"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Target Amount */}
          <div>
            <label
              htmlFor="targetAmount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Target Amount
            </label>
            <input
              type="number"
              id="targetAmount"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="0"
              min="1"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Currency */}
          <div>
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
            </select>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="flex">
                <div className="text-red-400">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Please fix the following errors:
                  </h3>
                  <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Create Goal
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

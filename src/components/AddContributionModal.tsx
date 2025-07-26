"use client";

import { useState } from "react";
import { validateContributionForm } from "@/utils/storage";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

interface AddContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContribution: (amount: number, date: Date) => void;
  goalName: string;
}

export function AddContributionModal({
  isOpen,
  onClose,
  onAddContribution,
  goalName,
}: AddContributionModalProps) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const contributionAmount = parseFloat(amount);
    const contributionDate = new Date(date);

    const validationErrors = validateContributionForm(contributionAmount);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      onAddContribution(contributionAmount, contributionDate);

      // Reset form
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]);
      setErrors([]);
      onClose();
    } catch {
      setErrors(["Failed to add contribution. Please try again."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setErrors([]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Add Contribution to ${goalName}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contribution Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            min="0.01"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
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
            Add Contribution
          </Button>
        </div>
      </form>
    </Modal>
  );
}

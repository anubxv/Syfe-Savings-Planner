'use client';

import { useState, useEffect } from 'react';
import { Goal, Contribution, Currency, ExchangeRate } from '@/types';
import { loadGoals, saveGoals, generateId } from '@/utils/storage';
import { fetchExchangeRate } from '@/utils/currency';

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedGoals = loadGoals();
    setGoals(savedGoals);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      saveGoals(goals);
    }
  }, [goals, loading]);

  const addGoal = (name: string, targetAmount: number, currency: Currency) => {
    const newGoal: Goal = {
      id: generateId(),
      name: name.trim(),
      targetAmount,
      currency,
      currentAmount: 0,
      contributions: [],
      createdAt: new Date(),
    };

    setGoals(prev => [...prev, newGoal]);
  };

  const addContribution = (goalId: string, amount: number, date: Date) => {
    const contribution: Contribution = {
      id: generateId(),
      amount,
      date,
      goalId,
    };

    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          currentAmount: goal.currentAmount + amount,
          contributions: [...goal.contributions, contribution],
        };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  return {
    goals,
    loading,
    addGoal,
    addContribution,
    deleteGoal,
  };
}

export function useExchangeRate() {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshRate = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const rate = await fetchExchangeRate();
      setExchangeRate(rate);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch exchange rate');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshRate();
  }, []);

  return {
    exchangeRate,
    loading,
    error,
    refreshRate,
  };
}

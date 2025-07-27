"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SplashScreen } from "@/components/SplashScreen";
import { Logo } from "@/components/ui/Logo";
import { Dashboard } from "@/components/Dashboard";
import { GoalList } from "@/components/GoalList";
import { ExchangeRateDisplay } from "@/components/ExchangeRateDisplay";
import { useGoals, useExchangeRate } from "@/hooks/useGoals";

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
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

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

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
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.header
          className="text-center mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <p className="text-gray-600 text-lg">
            Plan, save, and achieve your financial goals
          </p>
        </motion.header>

        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
        >
          
          <motion.div
            className="grid gap-8 lg:grid-cols-3"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            <motion.div
              className="lg:col-span-2"
              variants={{
                hidden: { x: -30, opacity: 0 },
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              <Dashboard goals={goals} exchangeRate={exchangeRate} />
            </motion.div>

            <motion.div
              variants={{
                hidden: { x: 30, opacity: 0 },
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              <ExchangeRateDisplay
                exchangeRate={exchangeRate}
                loading={rateLoading}
                error={rateError}
                onRefresh={refreshRate}
              />
            </motion.div>
          </motion.div>

          
          <motion.div
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
              },
            }}
          >
            <GoalList
              goals={goals}
              exchangeRate={exchangeRate}
              onAddContribution={addContribution}
              onDeleteGoal={deleteGoal}
              onAddGoal={addGoal}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

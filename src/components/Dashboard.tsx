"use client";

import { motion } from "framer-motion";
import { Goal, ExchangeRate } from "@/types";
import { calculateDashboardStats } from "@/utils/storage";
import { formatCurrency, convertCurrency } from "@/utils/currency";
import { Target, TrendingUp, DollarSign, BarChart3 } from "lucide-react";

interface DashboardProps {
  goals: Goal[];
  exchangeRate: ExchangeRate | null;
}

export function Dashboard({ goals, exchangeRate }: DashboardProps) {
  const stats = calculateDashboardStats(goals);


  const getTotalInBothCurrencies = () => {
    if (!exchangeRate) return { inr: 0, usd: 0 };


    let totalINR = 0;
    let totalUSD = 0;

    goals.forEach((goal) => {
      const goalAmount =
        goal.currency === "INR"
          ? goal.targetAmount
          : convertCurrency(goal.targetAmount, "USD", "INR", exchangeRate);
      totalINR += goalAmount;

      const goalAmountUSD =
        goal.currency === "USD"
          ? goal.targetAmount
          : convertCurrency(goal.targetAmount, "INR", "USD", exchangeRate);
      totalUSD += goalAmountUSD;
    });

    return { inr: totalINR, usd: totalUSD };
  };

  const getSavedInBothCurrencies = () => {
    if (!exchangeRate) return { inr: 0, usd: 0 };

    let savedINR = 0;
    let savedUSD = 0;

    goals.forEach((goal) => {
      const savedAmount =
        goal.currency === "INR"
          ? goal.currentAmount
          : convertCurrency(goal.currentAmount, "USD", "INR", exchangeRate);
      savedINR += savedAmount;

      const savedAmountUSD =
        goal.currency === "USD"
          ? goal.currentAmount
          : convertCurrency(goal.currentAmount, "INR", "USD", exchangeRate);
      savedUSD += savedAmountUSD;
    });

    return { inr: savedINR, usd: savedUSD };
  };

  const targetTotals = getTotalInBothCurrencies();
  const savedTotals = getSavedInBothCurrencies();

  return (
    <motion.div
      className="bg-syfe-gradient text-white rounded-xl p-8 mb-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <motion.h2
        className="text-3xl font-bold mb-8 flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <DollarSign className="w-8 h-8 mr-3" />
        </motion.div>
        Savings Dashboard
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <motion.div
          className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center mb-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Target className="w-6 h-6 mr-3 text-white" />
            </motion.div>
            <h3 className="text-lg font-semibold">Goals</h3>
          </div>
          <motion.p
            className="text-3xl font-bold mb-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {stats.goalCount}
          </motion.p>
          <p className="text-white/80 text-sm">Active goals</p>
        </motion.div>


        <motion.div
          className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center mb-3">
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <TrendingUp className="w-6 h-6 mr-3 text-emerald-200" />
            </motion.div>
            <h3 className="text-lg font-semibold">Target</h3>
          </div>
          <motion.p
            className="text-xl font-bold mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {formatCurrency(targetTotals.inr, "INR")}
          </motion.p>
          <p className="text-white/80 text-sm">
            {formatCurrency(targetTotals.usd, "USD")}
          </p>
        </motion.div>

      
        <motion.div
          className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center mb-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <DollarSign className="w-6 h-6 mr-3 text-green-200" />
            </motion.div>
            <h3 className="text-lg font-semibold">Saved</h3>
          </div>
          <motion.p
            className="text-xl font-bold mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {formatCurrency(savedTotals.inr, "INR")}
          </motion.p>
          <p className="text-white/80 text-sm">
            {formatCurrency(savedTotals.usd, "USD")}
          </p>
        </motion.div>

        
        <motion.div
          className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center mb-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <BarChart3 className="w-6 h-6 mr-3 text-blue-200" />
            </motion.div>
            <h3 className="text-lg font-semibold">Progress</h3>
          </div>
          <motion.p
            className="text-3xl font-bold mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            {stats.overallProgress.toFixed(1)}%
          </motion.p>
          <div className="mt-3">
            <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
              <motion.div
                className="bg-white h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(stats.overallProgress, 100)}%` }}
                transition={{ delay: 1, duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      
      {exchangeRate && (
        <motion.div
          className="mt-8 text-center text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-sm">
            Exchange Rate: 1 USD = ₹{exchangeRate.rate.toFixed(2)} | Last
            updated: {exchangeRate.lastUpdated.toLocaleString()}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

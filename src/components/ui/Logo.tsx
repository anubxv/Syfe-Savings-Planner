"use client";

import { motion } from "framer-motion";
import { TrendingUp, Target } from "lucide-react";

export function Logo({ size = "lg" }: { size?: "sm" | "lg" }) {
  const isLarge = size === "lg";

  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={`relative ${isLarge ? "w-12 h-12" : "w-8 h-8"}`}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg"
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Target className={`${isLarge ? "w-7 h-7" : "w-4 h-4"} text-white`} />
        </div>
      </motion.div>

      <div className="flex flex-col">
        <motion.h1
          className={`font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ${
            isLarge ? "text-3xl" : "text-lg"
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Syfe Savings Planner
        </motion.h1>
      </div>

      <motion.div
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <TrendingUp
          className={`${isLarge ? "w-6 h-6" : "w-4 h-4"} text-emerald-500`}
        />
      </motion.div>
    </motion.div>
  );
}

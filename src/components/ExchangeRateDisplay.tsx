"use client";

import { motion } from "framer-motion";
import { ExchangeRate } from "@/types";
import { Button } from "@/components/ui/Button";
import {
  ArrowRightLeft,
  AlertTriangle,
  CheckCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface ExchangeRateDisplayProps {
  exchangeRate: ExchangeRate | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function ExchangeRateDisplay({
  exchangeRate,
  loading,
  error,
  onRefresh,
}: ExchangeRateDisplayProps) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 py-12 mb-8 overflow-hidden relative hover:shadow-xl transition-shadow duration-300 min-h-[180px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-syfe-gradient opacity-10 rounded-full -mr-16 -mt-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="flex flex-col gap-4 h-full">
      
        <motion.h1
          className="text-xl font-semibold text-gray-900 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRightLeft className="w-5 h-5 mr-3 text-orange-600" />
          </motion.div>
          Exchange Rate
        </motion.h1>

        
        <div className="flex-1">
          {error && (
            <motion.div
              className="flex items-center text-red-600 text-sm mb-3 bg-red-50 px-4 py-3 rounded-lg border border-red-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {!exchangeRate && !error && !loading && (
            <motion.div
              className="flex items-center text-gray-500 bg-gray-50 px-4 py-3 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertTriangle className="w-4 h-4 mr-2 text-gray-400" />
              <span>Exchange rate not available</span>
            </motion.div>
          )}

          {loading && (
            <motion.div
              className="flex items-center bg-blue-50 px-4 py-3 rounded-lg border border-blue-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Loader2 className="animate-spin h-5 w-5 text-blue-500 mr-3" />
              <span className="text-blue-700 font-medium">
                Fetching latest rates...
              </span>
            </motion.div>
          )}
        </div>

        
        {exchangeRate && !error && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="flex justify-center w-full"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center bg-gradient-to-r from-purple-20 to-indigo-20 text-white px-6 py-4 rounded-lg shadow-lg whitespace-nowrap w-full max-w-md">
                <span className="text-indigo-600 text-lg font-medium mr-3">
                  1 USD =
                </span>
                <span className="text-2xl font-bold text-green-600">
                  ₹{exchangeRate.rate.toFixed(2)}
                </span>
                <CheckCircle className="w-5 h-5 ml-3 text-green-500" />
              </div>
            </motion.div>
          </motion.div>
        )}

        
        <motion.div 
          className="flex justify-center w-full"
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onRefresh}
            loading={loading}
            variant="secondary"
            size="md"
            className="w-full max-w-md px-6 py-4 bg-syfe-gradient hover:bg-syfe-gradient-dark text-white border-0 shadow-lg text-base font-medium"
          >
            <motion.div
              animate={loading ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                duration: 1,
                repeat: loading ? Infinity : 0,
                ease: "linear",
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
            </motion.div>
            Refresh Rate
          </Button>
        </motion.div>

        
        <p className="text-sm text-gray-500 flex items-center justify-center mt-2">
          <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
          <span>Last updated: {exchangeRate?.lastUpdated?.toLocaleString()}</span>
        </p>
      </div>
    </motion.div>
  );
}
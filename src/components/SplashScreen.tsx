"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { useEffect, useState } from "react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setTimeout(onComplete, 600);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-purple-100 flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              <Logo size="lg" />
            </motion.div>

            <motion.div
              className="mt-8 flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-emerald-500 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>

            <motion.p
              className="mt-4 text-gray-600 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              Track your financial goals
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        {/* Logo Container with a sophisticated reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="relative"
        >
          <Image
            src="/logo.svg"
            alt="Webtray Logo"
            width={180}
            height={60}
            priority
            className="h-auto w-auto"
          />
          
          {/* Subtle light sweep animation over the logo */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              repeatDelay: 1
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-20"
          />
        </motion.div>

        {/* Minimalist modern progress line */}
        <div className="mt-12 h-[1px] w-40 overflow-hidden bg-gray-100">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="h-full w-full bg-[#111827]"
          />
        </div>
      </div>
    </div>
  );
}

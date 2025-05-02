"use client"

import { motion } from "framer-motion"
import { Upload } from "lucide-react"

export function UploadAnimation() {
  return (
    <div className="relative h-20 w-20">
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/10"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Upload className="h-10 w-10 text-primary" />
      </motion.div>
    </div>
  )
}

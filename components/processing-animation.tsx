"use client"

import { motion } from "framer-motion"
import { Brain } from "lucide-react"

export function ProcessingAnimation() {
  const circleVariants = {
    initial: { opacity: 0.3, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  }

  return (
    <div className="relative h-24 w-24">
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20"
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

      <div className="absolute inset-0">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <motion.div
            key={index}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              rotate: index * 60,
            }}
          >
            <motion.div
              className="h-2 w-2 rounded-full bg-primary"
              variants={circleVariants}
              initial="initial"
              animate="animate"
              transition={{
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: index * 0.15,
              }}
              style={{
                translateY: -36,
              }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Brain className="h-12 w-12 text-primary" />
      </motion.div>
    </div>
  )
}

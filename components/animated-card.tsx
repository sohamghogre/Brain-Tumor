"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Brain } from "lucide-react"

export function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/50 to-primary opacity-75 blur-xl" />
      <Card className="relative overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            <motion.img
              src="/placeholder.svg?height=400&width=600"
              alt="Brain scan visualization"
              className="h-auto w-full object-cover"
              initial={{ scale: 1 }}
              animate={{
                scale: [1, 1.02, 1],
                rotate: [0, 0.5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
              <Brain className="h-5 w-5" />
              <span className="font-medium">Advanced Visualization</span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">AI-Powered Analysis</h3>
            <p className="text-muted-foreground">
              Our deep learning model has been trained on over 100,000 MRI scans to accurately detect and classify brain
              tumors.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <motion.div
                className="rounded-lg bg-primary/10 p-4 text-center"
                whileHover={{ y: -5, backgroundColor: "rgba(var(--primary), 0.2)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl font-bold text-primary">97%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </motion.div>
              <motion.div
                className="rounded-lg bg-primary/10 p-4 text-center"
                whileHover={{ y: -5, backgroundColor: "rgba(var(--primary), 0.2)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl font-bold text-primary">3s</div>
                <div className="text-sm text-muted-foreground">Processing Time</div>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

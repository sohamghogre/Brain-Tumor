"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Brain, Download, Share2 } from "lucide-react"

interface ScanResultsProps {
  results: {
    hasTumor: boolean
    confidence: number
    tumorType?: string
    heatmapUrl?: string
  }
  scanImage: string
  onNewScan: () => void
}

export function ScanResults({ results, scanImage, onNewScan }: ScanResultsProps) {
  const [activeTab, setActiveTab] = useState("results")

  const confidencePercent = Math.round(results.confidence * 100)

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center mb-6">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={`rounded-full p-4 ${
              results.hasTumor
                ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
            }`}
          >
            {results.hasTumor ? <AlertTriangle className="h-8 w-8" /> : <Brain className="h-8 w-8" />}
          </motion.div>

          <motion.h2
            className={`text-2xl font-bold mt-4 ${
              results.hasTumor ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {results.hasTumor ? "Tumor Detected" : "No Tumor Detected"}
          </motion.h2>

          <motion.p
            className="text-muted-foreground mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Confidence: {confidencePercent}%
          </motion.p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="pt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Scan Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Diagnosis:</span>
                    <span className="font-medium">{results.hasTumor ? "Abnormal" : "Normal"}</span>
                  </div>

                  {results.hasTumor && results.tumorType && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tumor Type:</span>
                      <span className="font-medium">{results.tumorType}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="font-medium">{confidencePercent}%</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Analysis Date:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                  <p className="text-sm text-muted-foreground">
                    {results.hasTumor
                      ? "Based on the analysis, we recommend consulting with a neurologist for further evaluation and potential treatment options."
                      : "No abnormalities detected. Regular follow-up scans are recommended as per standard medical guidelines."}
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="text-lg font-medium mb-2">Original Scan</h3>
                <div className="relative rounded-lg overflow-hidden border bg-muted/40 flex-1">
                  <img
                    src={scanImage || "/placeholder.svg"}
                    alt="Original MRI Scan"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visualization" className="pt-4">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative rounded-lg overflow-hidden border bg-muted/40">
                  <img
                    src={scanImage || "/placeholder.svg"}
                    alt="Original MRI Scan"
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute bottom-2 left-2 bg-background/80 text-xs px-2 py-1 rounded">
                    Original Scan
                  </div>
                </div>

                <div className="relative rounded-lg overflow-hidden border bg-muted/40">
                  <img
                    src={results.heatmapUrl || "/placeholder.svg?height=512&width=512"}
                    alt="Tumor Heatmap"
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute bottom-2 left-2 bg-background/80 text-xs px-2 py-1 rounded">AI Heatmap</div>
                </div>
              </div>

              <div className="bg-muted/40 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2">About This Visualization</h3>
                <p className="text-xs text-muted-foreground">
                  The heatmap overlay shows areas where our AI has detected potential abnormalities. Red and yellow
                  areas indicate higher probability of tumor presence, while green areas represent lower probability.
                  This visualization is meant to assist medical professionals and should not be used as the sole basis
                  for diagnosis.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="pt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Technical Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Model Version:</span>
                    <span>NeuraScan v3.2.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Analysis ID:</span>
                    <span>AN-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Time:</span>
                    <span>3.2 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Image Resolution:</span>
                    <span>512 x 512 px</span>
                  </div>
                </div>
              </div>

              {results.hasTumor && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Tumor Characteristics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Size:</span>
                      <span>2.3 cm x 1.8 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>Frontal Lobe, Right Hemisphere</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Boundary:</span>
                      <span>Irregular</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Density:</span>
                      <span>Heterogeneous</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-muted/40 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Disclaimer</h3>
                <p className="text-xs text-muted-foreground">
                  This analysis is provided as a screening tool and should not replace professional medical advice.
                  Always consult with a qualified healthcare provider for diagnosis and treatment options.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2 justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
        <Button onClick={onNewScan}>New Scan</Button>
      </CardFooter>
    </Card>
  )
}

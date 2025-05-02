"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileUp, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ScanResults } from "@/components/scan-results"
import { UploadAnimation } from "@/components/upload-animation"
import { ProcessingAnimation } from "@/components/processing-animation"

export default function ScanPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<null | {
    hasTumor: boolean
    confidence: number
    tumorType?: string
    heatmapUrl?: string
  }>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    // Simulate upload completion
    setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      setIsUploading(false)
      setIsProcessing(true)

      // Simulate processing time
      setTimeout(() => {
        setIsProcessing(false)
        // Mock results - in a real app, this would come from your backend
        setResults({
          hasTumor: Math.random() > 0.5,
          confidence: 0.87 + Math.random() * 0.1,
          tumorType: "Glioblastoma",
          heatmapUrl: "/placeholder.svg?height=512&width=512",
        })
      }, 3000)
    }, 2000)
  }

  const resetScan = () => {
    setFile(null)
    setPreview(null)
    setResults(null)
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Brain Tumor Detection</h1>

      <Tabs defaultValue="upload" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upload">Upload Scan</TabsTrigger>
          <TabsTrigger value="camera" disabled>
            Capture Image
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <AnimatePresence mode="wait">
            {!file && !isProcessing && !results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-dashed border-2">
                  <CardContent className="pt-6 pb-8 flex flex-col items-center justify-center min-h-[300px]">
                    <UploadAnimation />

                    <div className="text-center mt-4 space-y-2">
                      <h3 className="text-lg font-medium">Upload MRI Scan</h3>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Drag and drop your MRI scan image or click to browse. We support JPEG, PNG, and DICOM formats.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col items-center gap-4">
                      <Button onClick={() => fileInputRef.current?.click()} className="gap-2" size="lg">
                        <FileUp className="h-4 w-4" />
                        Select File
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/jpeg,image/png,image/dicom"
                        className="hidden"
                      />
                      <p className="text-xs text-muted-foreground">Maximum file size: 50MB</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {file && preview && !isProcessing && !results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent className="pt-6 flex flex-col items-center">
                    <div className="relative w-full max-w-md mx-auto rounded-lg overflow-hidden mb-6">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt="MRI Scan Preview"
                        className="w-full h-auto object-contain max-h-[400px]"
                      />
                    </div>

                    <div className="w-full space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>File: {file.name}</span>
                        <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                      </div>

                      {isUploading && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Uploading...</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}

                      <div className="flex gap-4">
                        <Button variant="outline" className="flex-1" onClick={resetScan}>
                          Cancel
                        </Button>
                        <Button className="flex-1 gap-2" onClick={handleUpload} disabled={isUploading}>
                          {isUploading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4" />
                              Process Scan
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Card>
                  <CardContent className="pt-6 pb-8 flex flex-col items-center justify-center min-h-[400px]">
                    <ProcessingAnimation />

                    <h3 className="text-xl font-medium mt-6">Processing Your Scan</h3>
                    <p className="text-muted-foreground text-center max-w-md mt-2">
                      Our AI is analyzing your MRI scan. This typically takes 10-15 seconds.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <ScanResults results={results} scanImage={preview || ""} onNewScan={resetScan} />
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  )
}

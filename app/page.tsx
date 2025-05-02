import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, FileText, Upload } from "lucide-react"
import { AnimatedCard } from "@/components/animated-card"
import { HeroSection } from "@/components/hero-section"
import { FeatureCard } from "@/components/feature-card"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Brain className="h-6 w-6 text-primary" />
            <span>NeuraScan</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/scan" className="text-sm font-medium transition-colors hover:text-primary">
              Scan
            </Link>
            <Link href="/history" className="text-sm font-medium transition-colors hover:text-primary">
              History
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/scan">
              <Button>
                Start Scan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Advanced Brain Tumor Detection
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Our AI-powered platform provides accurate and rapid detection of brain tumors from MRI scans, helping
              medical professionals make informed decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-12">
            <FeatureCard
              icon={<Upload className="h-10 w-10 text-primary" />}
              title="Easy Upload"
              description="Simply upload MRI scans in common formats including DICOM, JPG, and PNG."
            />
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-primary" />}
              title="AI Analysis"
              description="Our advanced neural network analyzes the scan with 97% accuracy."
            />
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-primary" />}
              title="Detailed Reports"
              description="Receive comprehensive reports with visualization of detected anomalies."
            />
          </div>
        </section>

        <section className="container py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900 rounded-lg">
          <div className="mx-auto grid items-center gap-6 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-4xl">How It Works</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Our platform uses a state-of-the-art convolutional neural network trained on thousands of MRI scans.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    1
                  </div>
                  <span>Upload your MRI scan</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <span>AI processes and analyzes the image</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    3
                  </div>
                  <span>Review detailed results and visualization</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    4
                  </div>
                  <span>Export reports for medical professionals</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/scan">
                  <Button size="lg">
                    Try It Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <AnimatedCard />
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2 text-sm">
            <Brain className="h-5 w-5 text-primary" />
            <p>© 2024 NeuraScan. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

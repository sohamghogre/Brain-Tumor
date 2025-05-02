# NeuraScan: Brain Tumor Detection UI
NeuraScan is a modern, animated UI for brain tumor detection applications. This project provides a complete frontend interface for medical professionals and researchers to upload, process, and analyze MRI scans for potential brain tumors.
## 🧠 Features

- **Modern, Medical-Themed UI**: Clean, professional interface designed for healthcare applications
- **Smooth Animations**: Engaging transitions and micro-interactions throughout the application
- **Interactive Scan Process**: Step-by-step guided workflow for scan uploads and analysis
- **Detailed Results Visualization**: Comprehensive results display with multiple viewing options
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
## 🛠️ Technologies Used

- **Next.js**: React framework for building the application
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth transitions and effects
- **Shadcn/UI**: Component library for consistent UI elements
- **Lucide Icons**: Icon library for clean, consistent iconography

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
![Screenshot 2025-04-28 194745](https://github.com/user-attachments/assets/592021fc-af1f-4ed4-a375-4c1fad5a87e9)
![Screenshot 2025-04-28 194845](https://github.com/user-attachments/assets/b54dd174-98ec-4454-b0b9-fd52fdbf7496)
![Screenshot 2025-04-28 195018](https://github.com/user-attachments/assets/86b45a3a-211d-4609-9459-cbe57fce0b6d)





## 🔧 Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/sohamghogre/Brain-Tumor.git
   cd neurascan
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`
## 📁 Project Structure


neurascan/
├── app/                  # Next.js app directory
│   ├── page.tsx          # Home page
│   ├── scan/             # Scan page directory
│   │   └── page.tsx      # Scan page component
│   └── layout.tsx        # Root layout component
├── components/           # Reusable components
│   ├── animated-card.tsx # Animated information card
│   ├── feature-card.tsx  # Feature showcase card
│   ├── hero-section.tsx  # Home page hero section
│   ├── processing-animation.tsx # Animation for scan processing
│   ├── scan-results.tsx  # Results display component
│   ├── ui/               # UI components from shadcn
│   └── upload-animation.tsx # Animation for file upload
├── public/               # Static assets
└── ...                   # Configuration files


## 🔄 Integration with Backend

To connect this UI with your existing backend:

1. Update the API endpoints in the scan page component:
   \`\`\`typescript
   // In app/scan/page.tsx
   const handleUpload = async () => {
     // Replace with your actual API endpoint
     const response = await fetch('/api/analyze-scan', {
       method: 'POST',
       body: formData,
     });
     const data = await response.json();
     setResults(data);
   };
   \`\`\`

2. Ensure your backend returns data in the format expected by the frontend:
   \`\`\`json
   {
     "hasTumor": true,
     "confidence": 0.95,
     "tumorType": "Glioblastoma",
     "heatmapUrl": "/path/to/heatmap.png"
   }
   \`\`\`

## 🎨 Customization

### Changing Colors

The project uses Tailwind CSS for styling. You can customize the color scheme by modifying the `tailwind.config.ts` file:

\`\`\`typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      // Add or modify other colors here
    },
  },
},
\`\`\`

### Adding New Pages

To add new pages to the application:

1. Create a new directory in the `app` folder
2. Add a `page.tsx` file in the new directory
3. Import and use components as needed

Example:
\`\`\`typescript
// app/history/page.tsx
import { PatientHistory } from "@/components/patient-history";

export default function HistoryPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Scan History</h1>
      <PatientHistory />
    </div>
  );
}
\`\`\`
This README provides comprehensive documentation for your Brain Tumor Detection UI project, including installation instructions, project structure, customization options, and integration guidelines. You can customize it further by adding actual screenshots, your personal information, and specific details about your implementation.

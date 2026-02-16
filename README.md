# CyberScan 3D URL Analyzer

CyberScan is a cutting-edge 3D URL analysis tool designed to visualize and assess the security of web addresses in real-time. Leveraging the power of Google Gemini AI and advanced 3D visualization techniques, it provides users with a cinematic and immersive experience while ensuring their digital safety.

<img width="1919" height="844" alt="Screenshot 2026-02-12 124251" src="https://github.com/user-attachments/assets/1be24ced-18b6-4d70-9a9f-ff9ee5a980b3" />


## 🚀 Features

- **3D Globe Visualization**: Interactive 3D globe powered by Three.js that visualizes the geographical location of the server hosting the URL.
- **AI-Powered Analysis**: Utilizes Google's Gemini AI to perform deep analysis of URLs, providing a comprehensive security verdict.
- **Real-Time Security Reports**: Instant feedback on URL safety, including a risk score, vendor flags, and a detailed summary.
- **Network Intelligence**: Displays critical network data such as IP address, ASN (Autonomous System Number), and server location.
- **Dual Modes**: 
    - **Analysis Mode**: The primary interface for scanning and visualizing URLs.
    - **Archive Mode**: Access past scans and study security trends (Feature in development).
- **Cinematic UI**: A modern, high-performance interface featured with glassmorphism, smooth animations (GSAP), and a responsive design.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **AI Integration**: Google Generative AI (Gemini)
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: Lucide React

## 📦 Installation & Setup

Follow these steps to get CyberScan running on your local machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- A Google Gemini API Key

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/cyberscan-3d-url-analyzer.git
   cd cyberscan-3d-url-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   > **Note:** The application uses `GEMINI_API_KEY` to authenticate with Google's Generative AI service.

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Navigate to `http://localhost:3000` (or the port shown in your terminal) to view the application.

## 🖥️ Usage

1. **Enter URL**: Type or paste a URL into the search bar at the center of the screen.
2. **Analyze**: Press Enter or click the analyze button. The system will "decrypt" the target architecture.
3. **View Results**: 
    - The globe will rotate to the server's location.
    - A security status (SAFE/HARMFUL) will be displayed.
    - Detailed network intelligence and a security summary will appear in the side panels.
4. **Detailed Report**: Click "ACCESS_DETAILED_REPORT" at the bottom to view a full breakdown of the analysis.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
#

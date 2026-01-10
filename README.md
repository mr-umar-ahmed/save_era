# SAVERA - Sustainable Future Protocol 🌿







![Project Status](https://img.shields.io/badge/Status-Prototype-emerald)



![Tech Stack](https://img.shields.io/badge/Stack-Next.js_14-black)



![Style](https://img.shields.io/badge/Style-Tailwind_CSS-blue)







**SAVERA** is an AI-powered household and community resource intelligence platform designed to enable citizens, institutions, and governments to understand, reduce, and respond to energy and water consumption patterns.







> **Live Demo:** [https://saveera.vercel.app/](https://saveera.vercel.app/)







---







## 🚀 Overview







Savera connects individual consumption habits with community resilience, creating a feedback loop between citizens and authorities. It transforms fragmented utility billing data into actionable insights, gamifies sustainability through a "Mission Center," and provides governments with a command center for regional load monitoring and emergency broadcasts.







This project is a high-fidelity frontend prototype built for the Microsoft Imagine Cup.







## ✨ Key Features







### 🏡 For Residents (Household Layer)



* **AI Utility Analysis:** Visualizes energy and water usage with appliance-level breakdowns.



* **Gamification:** Weekly challenges, XP systems, and leaderboards to encourage sustainable behavior.



* **Impact Matrix:** Real-time tracking of financial savings, water conservation, and CO2 reduction.



* **Smart Recommendations:** Actionable, AI-driven tips (e.g., AC optimization, LED upgrades).



* **Onboarding Wizard:** Intuitive setup for household demographics and utility bill processing.







### 🏛️ For Government (Admin Layer)



* **Regional Dashboard:** Monitor load matrices across different sectors (North, South, East, West).



* **Emergency Broadcast System:** Send critical alerts (Power Cuts, Heatwaves) directly to residents.



* **Live Analytics:** Real-time visualization of peak demand and grid stress.







---







## 🛠️ Tech Stack







* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)



* **Language:** TypeScript



* **Styling:** Tailwind CSS



* **Icons:** Lucide React



* **Charts:** Recharts



* **Fonts:** Google Fonts (Outfit & Inter)



* **Deployment:** Vercel







---







## 📂 Project Structure







```bash



src/app



├── alerts/           # User: Critical alerts feed



├── auth/             # Logic: Role selection (Gov vs Resident)



├── breakdown/        # User: Detailed appliance consumption charts



├── challenges/       # User: Gamified sustainability quests



├── components/       # Reusable UI components



├── dashboard/        # User: Main Resident Command Center



├── gov-admin/        # Admin: Government Control Panel



├── household-setup/  # Onboarding: Family size & appliance config



├── impact/           # User: Environmental impact visualization



├── utility-input/    # Onboarding: Bill upload simulation



├── layout.tsx        # Global font & style settings



└── page.tsx          # Landing Page (The Entrance)



🔄 User Journey Flow



Landing Page: Introduction to the Savera ecosystem.







Authentication: The user selects their role (Government or Resident).







Government Path: Redirects immediately to the Gov Admin Portal for macro-monitoring.







Resident Path: Initiates the Setup Wizard.







Resident Wizard:







Household Setup: User configures occupancy and high-load appliances.







Utility Input: User uploads bills or enters meter readings.







Dashboard: User lands on the main command center to view analytics.







⚡ Getting Started Locally



To run this project on your local machine:







Clone the repository:







Bash







git clone [https://github.com/your-username/savera.git](https://github.com/your-username/savera.git)



Install dependencies:







Bash







npm install



# or



yarn install



Run the development server:







Bash







npm run dev



Open your browser: Navigate to http://localhost:3000.







🔮 Future Roadmap



Azure OpenAI Integration: To process real OCR data from utility bills.







IoT Handshake: Direct connection with smart meters for live data ingestion.







Offline First: PWA support for low-connectivity regions using SMS fallbacks.







📄 License



This project is created for educational and competition purposes.


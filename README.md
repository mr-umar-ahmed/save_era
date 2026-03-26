# 🌿 SAVERA - Sustainable Future Protocol 

SAVERA is an AI-powered household and community resource intelligence platform designed to enable citizens, institutions, and governments to understand, reduce, and respond to energy and water consumption patterns.

**Live Demo:** https://saveera.vercel.app/

## 🚀 Overview

Savera connects individual consumption habits with community resilience, creating a feedback loop between citizens and authorities. It transforms fragmented utility billing data into actionable insights, gamifies sustainability through a "Mission Center," and provides governments with a dynamic, multi-tenant command center for regional load monitoring and offline emergency broadcasts.

This project is a high-fidelity, production-ready frontend prototype engineered for high-stakes hackathons and civic tech deployments.

## ✨ Key Features

### 🏡 For Residents (Layer 1: The Citizen)
* **Contextual Setup & AI Utility Analysis:** Setup wizard that adapts to property types (e.g., Flat vs. Farmhouse) and visualizes energy/water usage with appliance-level breakdowns.
* **Carbon Footprint Analyzer:** A comprehensive ESG tracker mapping commute, diet, and energy data to regional baselines with AI-suggested lifestyle mitigations.
* **One-Click System Upgrades (Fixes):** Actionable, AI-driven tips with a simulated "Automate" engine that instantly calculates new monthly savings.
* **Gamification (Mission Center):** Co-op sector challenges, XP systems, and regional leaderboards to encourage sustainable behavior.
* **City Hub & Civic Ticketing:** A centralized portal for public transit status, welfare scheme applications, and encrypted direct-to-authority complaint logging.

### 🏛️ For Government (Layer 2: The Authority)
* **Multi-Tenant SCADA Dashboard:** Dynamic role-based access that morphs the UI based on the logged-in department (⚡ GESCOM for Power, 💧 KUWSDB for Water, 🛡️ DDMA for Crisis Management).
* **Live Regional Analytics:** Real-time visualization of peak demand, grid stress matrices, and active IoT nodes across city sectors.
* **Cell Broadcast Emergency System:** A hardware-level push notification simulator designed to bypass internet outages during disasters.
* **Unified CMS Terminal:** Allows officers to seamlessly push infrastructure updates directly to the citizens' City Hub.

## 🛠️ Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Custom Dark/Cyber Aesthetic)
* **Icons:** Lucide React
* **Charts:** Recharts
* **Animations:** Framer Motion
* **Fonts:** Google Fonts (Outfit & Inter)
* **Deployment:** Vercel

## 📂 Project Structure

```text
src/app
├── alerts/           # User: Critical alerts & verified Gov telemetry feed
├── auth/             # Logic: Role & Department selection (Gov vs Resident)
├── carbon-footprint/ # User: Interactive ESG emissions calculator & offset engine
├── challenges/       # User: Gamified sustainability quests and leaderboards
├── city-hub/         # User: Civic ticketing, live services, and welfare board
├── components/       # Global: Reusable UI (Sidebar, ThemeProvider, Layouts)
├── dashboard/        # User: Main Resident Command Center
├── fixes/            # User: AI-recommended system upgrades and automation
├── gov-admin/        # Admin: Multi-tenant Government SCADA Control Panel
├── household-setup/  # Onboarding: Property context & custom asset config
├── impact/           # User: Environmental impact & milestone visualization
├── layout.tsx        # Global: Font, style settings, and forced Dark Mode
└── page.tsx          # Landing: Executive summary and B2B2C architecture overview


🔄 User Journey Flow
Landing Page: Executive introduction to the Savera dual-sided ecosystem.

Authentication: User selects their role (Government Official or Resident).

Government Path: * Selects jurisdiction (GESCOM, KUWSDB, or DDMA).

Redirects to the customized Gov Admin Portal for macro-monitoring and broadcast control.

Resident Path: * Initiates the Setup Wizard.

Household Setup: Configures property type, occupancy, and custom high-load appliances.

Utility Input: Uploads bills for simulated OCR extraction.

Dashboard: Lands on the main command center to view analytics, fix vulnerabilities, and access the City Hub.

⚡ Getting Started Locally
To run this project on your local machine:

1. Clone the repository:

Bash
git clone [https://github.com/mr-umar-ahmed/save_era.git](https://github.com/mr-umar-ahmed/save_era.git)
cd save_era
2. Install dependencies:

Bash
npm install
# or
yarn install
3. Run the development server:

Bash
npm run dev
4. Open your browser: Navigate to http://localhost:3000.

🔮 Future Roadmap
Hardware-Level Integrations: Direct connection with actual smart meters via MQTT for live data ingestion.

Azure / Local LLM Integration: To process real OCR data from utility bills and generate dynamic insights natively.

True Offline-First Architecture: PWA support for low-connectivity rural regions using SMS fallbacks (Cell Broadcast Technology integration).

📄 License
This project is created for educational and competition purposes.
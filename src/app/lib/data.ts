export const demoData = {
  electricity: {
    monthlyCost: 4500,
    units: 800,
    wastePercent: 28,
    appliances: [
      { name: "AC", cost: 1800, percent: 40 },
      { name: "Fridge", cost: 675, percent: 15 },
      { name: "Lights", cost: 900, percent: 20 },
      { name: "Others", cost: 1125, percent: 25 }
    ]
  },
  water: {
    monthlyCost: 1200,
    liters: 45000,
    wastePercent: 35,
    fixtures: [
      { name: "Shower", cost: 480, percent: 40 },
      { name: "Toilet", cost: 240, percent: 20 },
      { name: "Washing", cost: 360, percent: 30 },
      { name: "Others", cost: 120, percent: 10 }
    ]
  },
  savingsPotential: "₹2500/month",
  recommendations: [
    { action: "Set AC to 26°C", savings: "₹800", effort: "Low" },
    { action: "Shorten showers by 2 min", savings: "₹400", effort: "Low" },
    { action: "LED bulbs everywhere", savings: "₹600", effort: "Medium" }
  ]
};

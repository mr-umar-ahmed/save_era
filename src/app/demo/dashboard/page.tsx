'use client';

import Link from "next/link";
import { demoData } from "@/app/lib/data";
import UsageChart from "@/app/components/Chart";

export default function DemoDashboard() {
  return (
    <>
      <style jsx>{`
        @keyframes countUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-count { animation: countUp 0.8s ease-out; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-16 animate-count">
            <div className="inline-block mb-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-2xl">
                🛡️️ SAVERA
              </h1>
            </div>

            <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-semibold max-w-3xl mx-auto leading-relaxed">
              AI-powered demo for a typical 4-person household in Raichur, Karnataka
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <span className="inline-flex items-center px-6 py-3 bg-emerald-100 text-emerald-800 text-lg font-bold rounded-2xl shadow-lg">
                🤖 AI-estimated{" "}
                <span className="ml-2 w-4 h-4 bg-emerald-400 rounded-full animate-pulse" />
              </span>
              <span className="text-sm text-gray-500">95% confidence score</span>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
            {/* Electricity */}
            <div className="group bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50">
              <div className="flex items-start mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg -mt-2">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">Electricity</h3>
                  <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide">
                    This month
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-5xl xl:text-6xl font-black text-blue-600 mb-1 tracking-tight">
                  ₹{demoData.electricity.monthlyCost.toLocaleString()}
                </p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-black text-red-500 mr-1">−</span>
                  <span className="text-2xl font-bold text-red-500">
                    {demoData.electricity.wastePercent}%
                  </span>
                  <span className="text-red-600 font-semibold ml-1">waste detected</span>
                </div>
              </div>

              <div className="text-sm bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl">
                <span>{demoData.electricity.units.toLocaleString()} kWh</span>
                <span className="ml-4 text-blue-700 font-semibold">↑ 8% vs last month</span>
              </div>
            </div>

            {/* Water */}
            <div className="group bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50">
              <div className="flex items-start mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg -mt-2">
                  <span className="text-2xl">💧</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">Water</h3>
                  <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">
                    This month
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-5xl xl:text-6xl font-black text-emerald-600 mb-1 tracking-tight">
                  ₹{demoData.water.monthlyCost.toLocaleString()}
                </p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-black text-red-500 mr-1">−</span>
                  <span className="text-2xl font-bold text-red-500">
                    {demoData.water.wastePercent}%
                  </span>
                  <span className="text-red-600 font-semibold ml-1">waste detected</span>
                </div>
              </div>

              <div className="text-sm bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-2xl">
                <span>{demoData.water.liters.toLocaleString()} liters</span>
                <span className="ml-4 text-emerald-700 font-semibold">↓ 3% vs last month</span>
              </div>
            </div>

            {/* Savings */}
            <div className="group md:col-span-2 xl:col-span-1 bg-gradient-to-br from-emerald-500 to-emerald-600 bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 border-0">
              <div className="flex items-start mb-6">
                <div className="w-16 h-16 bg-white/30 rounded-2xl flex items-center justify-center mr-4 shadow-lg -mt-2">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                    Potential Savings
                  </h3>
                  <p className="text-white/90 text-sm font-semibold uppercase tracking-wide drop-shadow-lg">
                    Monthly target
                  </p>
                </div>
              </div>

              <p className="text-5xl xl:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
                {demoData.savingsPotential}
              </p>

              <div className="flex flex-wrap gap-2 text-white/90 text-sm font-semibold">
                <span>🌳 = 2 trees planted</span>
                <span>♻️ = 15,000L saved</span>
                <span>☁️ = 1 ton CO₂ cut</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="md:col-span-2 xl:col-span-1 group bg-gradient-to-br from-purple-500 to-pink-600 bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 border-0 hidden lg:block">
              <h3 className="text-xl font-bold text-white mb-6 drop-shadow-lg">Quick Stats</h3>
              <div className="space-y-4 text-white/95">
                <div className="flex justify-between">
                  <span>Peak usage hour</span>
                  <span className="font-black text-2xl">8-10 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Similar households</span>
                  <span className="font-semibold text-green-200">Youre top 20%</span>
                </div>
                <div className="flex justify-between">
                  <span>Next alert</span>
                  <span className="font-semibold text-yellow-200">6 PM today</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-20">
            <UsageChart
              data={demoData.electricity.appliances}
              title="⚡ Electricity Breakdown by Appliance"
              color="#3B82F6"
              total={`₹${demoData.electricity.monthlyCost}`}
            />
            <UsageChart
              data={demoData.water.fixtures}
              title="💧 Water Breakdown by Fixture"
              color="#10B981"
              total={`₹${demoData.water.monthlyCost}`}
            />
          </div>

          {/* CTA */}
          <div className="text-center space-y-8 mb-20">
            <div className="inline-block p-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full">
              <Link
                href="/auth"
                className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white px-16 py-8 rounded-3xl text-2xl font-black shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 tracking-wide transform-gpu"
              >
                🚀 Start with My Data Now
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 justify-center items-center text-sm text-gray-600 max-w-2xl mx-auto">
              <Link href="/" className="hover:text-blue-600 font-semibold flex items-center">
                🏠 Back Home <span className="ml-1">→</span>
              </Link>
              <span>•</span>
              <Link href="/alerts" className="hover:text-green-600 font-semibold flex items-center">
                🔔 See Alerts <span className="ml-1">→</span>
              </Link>
              <span>•</span>
              <span>Powered by Microsoft Azure AI</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-12 border-t border-gray-200/50">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 mb-6">
              <span>🤖 Privacy-first AI</span>
              <span>🌍 Global-ready</span>
              <span>⚡ Real-time alerts</span>
              <span>📱 Works offline (demo)</span>
            </div>
            <p className="text-lg font-semibold text-gray-700">
              Ready to save ₹30,000/year? Your real dashboard awaits above.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

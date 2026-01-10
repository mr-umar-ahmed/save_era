'use client';

import Link from "next/link";
import {
  Users,
  Zap,
  Droplets,
  ArrowRight,
  Check,
  ThermometerSnowflake,
  Refrigerator,
  Lightbulb,
  Tv,
  ShowerHead,
  Waves,
  Minus,
  Plus,
  Home
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { useState, Dispatch, SetStateAction } from "react";

// Font setup
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Properly typed helper
type StringListSetter = Dispatch<SetStateAction<string[]>>;

const toggleSelection = (
  id: string,
  setList: StringListSetter
) => {
  setList(prev =>
    prev.includes(id)
      ? prev.filter(item => item !== id)
      : [...prev, id]
  );
};

export default function HouseholdSetup() {
  const [occupants, setOccupants] = useState<number>(4);
  const [selectedElec, setSelectedElec] = useState<string[]>(['ac', 'fridge']);
  const [selectedWater, setSelectedWater] = useState<string[]>(['shower']);

  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen bg-[#050B08] text-white font-sans flex items-center justify-center p-4`}>
      <div className="w-full max-w-2xl">
        <div className="bg-[#0A0F0D]/80 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500 mb-6">
              <Home className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black">
              Configure <span className="text-emerald-400">Habitat</span>
            </h1>
            <p className="text-white/50 mt-2">
              Calibrate AI for your household consumption.
            </p>
          </div>

          {/* Occupants */}
          <div className="mb-10">
            <label className="flex items-center gap-2 text-sm font-bold text-white/70 uppercase mb-3">
              <Users className="w-4 h-4 text-emerald-400" /> Occupancy Load
            </label>

            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-2">
              <button
                onClick={() => setOccupants(o => Math.max(1, o - 1))}
                className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/10"
              >
                <Minus />
              </button>

              <div className="text-center">
                <span className="text-3xl font-black">{occupants}</span>
                <span className="block text-sm text-white/40">Residents</span>
              </div>

              <button
                onClick={() => setOccupants(o => Math.min(20, o + 1))}
                className="w-14 h-14 flex items-center justify-center rounded-xl bg-emerald-500 text-black"
              >
                <Plus />
              </button>
            </div>
          </div>

          {/* Energy */}
          <div className="mb-10">
            <label className="flex items-center gap-2 text-sm font-bold text-white/70 uppercase mb-3">
              <Zap className="w-4 h-4 text-amber-400" /> High-Load Appliances
            </label>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'ac', label: 'AC Unit', icon: ThermometerSnowflake },
                { id: 'fridge', label: 'Refrigerator', icon: Refrigerator },
                { id: 'lights', label: 'Smart Lights', icon: Lightbulb },
                { id: 'other', label: 'Heavy Machinery', icon: Tv },
              ].map(item => {
                const isSelected = selectedElec.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleSelection(item.id, setSelectedElec)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition
                      ${isSelected
                        ? 'bg-amber-500/10 border-amber-500/50'
                        : 'bg-white/5 border-white/10 text-white/60'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {isSelected && <Check className="ml-auto w-4 h-4 text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Water */}
          <div className="mb-12">
            <label className="flex items-center gap-2 text-sm font-bold text-white/70 uppercase mb-3">
              <Droplets className="w-4 h-4 text-cyan-400" /> Water Points
            </label>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'shower', label: 'Shower', icon: ShowerHead },
                { id: 'toilet', label: 'Flush Tanks', icon: Waves },
              ].map(item => {
                const isSelected = selectedWater.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleSelection(item.id, setSelectedWater)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition
                      ${isSelected
                        ? 'bg-cyan-500/10 border-cyan-500/50'
                        : 'bg-white/5 border-white/10 text-white/60'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {isSelected && <Check className="ml-auto w-4 h-4 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <Link
              href="/utility-input"
              className="flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-bold"
            >
              Initialize System <ArrowRight />
            </Link>

            <Link
              href="/dashboard"
              className="text-center text-white/40 text-sm hover:text-white"
            >
              Skip Setup (Demo Data)
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

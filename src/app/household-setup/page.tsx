'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Zap, Droplets, Flame, ArrowRight, Check,
  ThermometerSnowflake, Refrigerator, Wind, Factory,
  ShowerHead, Waves, Minus, Plus, Cpu, UploadCloud,
  CheckCircle2, ArrowLeft, ScanLine, PlusCircle, X, Building,
  TreePine, Calendar, ChevronDown, MapPin, Clock
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { useTheme } from "../components/ThemeProvider";
import { clsx } from "clsx";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

type UtilityKey = 'electricity' | 'water' | 'gas';
type ResultsType = UtilityKey | 'carbon';

interface ConfigItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

interface UtilityConfig {
  title: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: 'amber' | 'cyan' | 'rose';
  items: ConfigItem[];
}

interface CustomDevice {
  id: string;
  label: string;
}

interface CategoryState {
  selectedItems: string[];
  customDevices: CustomDevice[];
  fileUploaded: boolean;
  uploadedFileName: string | null;
  primarySource: string;
  billingCycle: string;
  billPeriod: string;
}

const CONFIG_DATA: Record<UtilityKey, UtilityConfig> = {
  electricity: {
    title: "Electricity Setup",
    icon: Zap,
    color: "amber",
    items: [
      { id: 'ac', label: 'AC Unit', icon: ThermometerSnowflake },
      { id: 'fridge', label: 'Refrigerator', icon: Refrigerator },
      { id: 'pump', label: '1HP Submersible Pump', icon: Factory },
      { id: 'fans', label: 'Ceiling Fans (3+)', icon: Wind },
    ]
  },
  water: {
    title: "Water Setup",
    icon: Droplets,
    color: "cyan",
    items: [
      { id: 'shower', label: 'Showers', icon: ShowerHead },
      { id: 'toilet', label: 'Flush Tanks', icon: Waves },
      { id: 'garden', label: 'Garden / Lawn', icon: Flame },
      { id: 'livestock', label: 'Livestock Care', icon: Factory },
    ]
  },
  gas: {
    title: "Gas & Heating",
    icon: Flame,
    color: "rose",
    items: [
      { id: 'stove', label: 'Gas Stove (Daily)', icon: Flame },
      { id: 'geyser', label: 'Gas Water Heater', icon: ThermometerSnowflake },
      { id: 'lpg', label: 'LPG Cylinders', icon: UploadCloud },
      { id: 'piped', label: 'Piped City Gas', icon: Waves },
    ]
  }
};

const UTILITY_SOURCES: Record<UtilityKey, string[]> = {
  electricity: ["Grid (State Utility)", "Grid + Solar Panel", "Grid + Generator", "100% Off-Grid"],
  water: ["Municipal (Piped)", "Borewell", "Municipal + Tanker", "100% Tanker Reliance"],
  gas: ["LPG Cylinders", "Piped Natural Gas (PNG)", "Biogas", "Electric Induction (No Gas)"]
};

const COLOR_VARIANTS: Record<UtilityConfig['color'], {
  bgLight: string;
  borderAccent: string;
  textAccent: string;
  buttonBg: string;
  buttonText: string;
  iconContainer: string;
}> = {
  amber: { bgLight: 'bg-amber-500/10', borderAccent: 'border-amber-500/50', textAccent: 'text-amber-500', buttonBg: 'bg-amber-500', buttonText: 'text-black', iconContainer: 'bg-amber-500/10 border-amber-500/20 text-amber-400' },
  cyan:  { bgLight: 'bg-cyan-500/10',  borderAccent: 'border-cyan-500/50',  textAccent: 'text-cyan-500',  buttonBg: 'bg-cyan-500',  buttonText: 'text-black', iconContainer: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' },
  rose:  { bgLight: 'bg-rose-500/10',  borderAccent: 'border-rose-500/50',  textAccent: 'text-rose-500',  buttonBg: 'bg-rose-500',  buttonText: 'text-black', iconContainer: 'bg-rose-500/10 border-rose-500/20 text-rose-400' },
};

const getCurrentMonthString = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

const INITIAL_CATEGORY_STATE: Omit<CategoryState, 'primarySource'> = {
  selectedItems: [],
  customDevices: [],
  fileUploaded: false,
  uploadedFileName: null,
  billingCycle: "monthly",
  billPeriod: getCurrentMonthString(),
};

// --- NEW: Suggestion Engine ---
const getSuggestions = (type: ResultsType) => {
  const list = {
    electricity: [
      { id: 1, text: "Shift AC usage to 'Eco Mode' during 2 PM - 4 PM peak.", impact: "High" },
      { id: 2, text: "Your Refrigerator is consuming 15% more than average.", impact: "Medium" }
    ],
    water: [
      { id: 1, text: "Install smart aerators on bathroom showers.", impact: "High" },
      { id: 2, text: "Borewell recharge detected as low; automate garden watering for 5 AM.", impact: "Critical" }
    ],
    gas: [
      { id: 1, text: "Switch to induction for morning tea to save 1 LPG cylinder/year.", impact: "Medium" },
      { id: 2, text: "Check burner flame color; yellow indicates wastage.", impact: "Low" }
    ],
    carbon: [
      { id: 1, text: "Carpooling twice a week will offset your AC emissions.", impact: "High" },
      { id: 2, text: "Transitioning to a plant-forward diet reduces footprint by 20%.", impact: "High" }
    ]
  };
  return list[type] || [];
};

export default function UnifiedSetupHub() {
  const router = useRouter();
  const { theme, colors } = useTheme();

  // --- UPDATED: Added 'results' step and resultsType ---
  const [step, setStep] = useState<'hub' | 'config' | 'loading' | 'results'>('hub');
  const [selectedUtility, setSelectedUtility] = useState<UtilityKey | null>(null);
  const [resultsType, setResultsType] = useState<ResultsType | null>(null);

  const [occupants, setOccupants] = useState<number>(4);
  const [propertyType, setPropertyType] = useState<"apartment" | "independent" | "farmhouse" | "commercial">("independent");

  const [categoryStates, setCategoryStates] = useState<Record<UtilityKey, CategoryState>>({
    electricity: { ...INITIAL_CATEGORY_STATE, primarySource: UTILITY_SOURCES.electricity[0] },
    water: { ...INITIAL_CATEGORY_STATE, primarySource: UTILITY_SOURCES.water[0] },
    gas: { ...INITIAL_CATEGORY_STATE, primarySource: UTILITY_SOURCES.gas[0] },
  });

  const [newDeviceInput, setNewDeviceInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentConfig = useMemo(() => 
    selectedUtility ? CONFIG_DATA[selectedUtility] : null, 
    [selectedUtility]
  );

  const color = currentConfig?.color ?? 'amber';
  const variants = COLOR_VARIANTS[color];
  const currentCategoryState = selectedUtility ? categoryStates[selectedUtility] : null;

  const handleSelectUtility = useCallback((utility: UtilityKey) => {
    setSelectedUtility(utility);
    setNewDeviceInput(""); 
    setStep('config');
  }, []);

  const toggleSelection = useCallback((id: string) => {
    if (!selectedUtility) return;
    setCategoryStates(prev => {
      const state = prev[selectedUtility];
      const newItems = state.selectedItems.includes(id) 
        ? state.selectedItems.filter(item => item !== id) 
        : [...state.selectedItems, id];
      return { ...prev, [selectedUtility]: { ...state, selectedItems: newItems } };
    });
  }, [selectedUtility]);

  const handleAddCustomDevice = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeviceInput.trim() || !currentConfig || !selectedUtility) return;

    const safeId = `custom-${selectedUtility}-${newDeviceInput.trim().toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    setCategoryStates(prev => {
      const state = prev[selectedUtility];
      const exists = state.customDevices.some(d => d.id === safeId) ||
                     currentConfig.items.some(i => i.id === safeId);

      if (exists) return prev;

      return {
        ...prev,
        [selectedUtility]: {
          ...state,
          customDevices: [...state.customDevices, { id: safeId, label: newDeviceInput.trim() }],
          selectedItems: [...state.selectedItems, safeId] 
        }
      };
    });

    setNewDeviceInput("");
  }, [newDeviceInput, currentConfig, selectedUtility]);

  const removeCustomDevice = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!selectedUtility) return;

    setCategoryStates(prev => {
      const state = prev[selectedUtility];
      return {
        ...prev,
        [selectedUtility]: {
          ...state,
          customDevices: state.customDevices.filter(d => d.id !== id),
          selectedItems: state.selectedItems.filter(item => item !== id)
        }
      };
    });
  }, [selectedUtility]);

  const updateCategoryField = useCallback((field: keyof CategoryState, value: any) => {
    if (!selectedUtility) return;
    setCategoryStates(prev => ({
      ...prev,
      [selectedUtility]: {
        ...prev[selectedUtility],
        [field]: value
      }
    }));
  }, [selectedUtility]);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentConfig || !selectedUtility) return;

    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));

    updateCategoryField('uploadedFileName', file.name);
    updateCategoryField('fileUploaded', true);
    
    setIsUploading(false);
  }, [currentConfig, selectedUtility, updateCategoryField]);

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // --- UPDATED: Utility AI Analysis ---
  const startAIAnalysis = useCallback(() => {
    if (!selectedUtility || !currentConfig || isAnalyzing || !currentCategoryState?.fileUploaded) return;

    setIsAnalyzing(true);
    setStep('loading');
    setResultsType(selectedUtility);
    setLoadingText("OCR Vision Activating... Extracting raw units.");

    const timeout1 = setTimeout(() => {
      setLoadingText(`Cross-referencing ${selectedUtility} rates for Bengaluru (IST)...`);
    }, 1600);

    const timeout2 = setTimeout(() => {
      setLoadingText(`Isolating parameters for ${currentCategoryState.billPeriod} billing cycle...`);
    }, 3600);

    const timeout3 = setTimeout(() => {
      setIsAnalyzing(false);
      setStep('results'); // Move to results view instead of pushing to dashboard immediately
    }, 5200);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [
    selectedUtility, currentConfig, currentCategoryState, isAnalyzing
  ]);

  // --- NEW: Carbon Footprint Analysis Flow ---
  const startCarbonAnalysis = useCallback(() => {
    setIsAnalyzing(true);
    setResultsType('carbon');
    setStep('loading');
    setLoadingText("Scanning lifestyle parameters and local grid emissions...");

    setTimeout(() => {
      setLoadingText("Calculating holistic ESG impact & carbon footprint...");
    }, 2000);

    setTimeout(() => {
      setIsAnalyzing(false);
      setStep('results');
    }, 4500);
  }, []);

  const handleAutomate = useCallback(() => {
    alert(`Automation Sequence Initiated for ${resultsType}! Syncing with smart home bridge...`);
    router.push('/dashboard');
  }, [resultsType, router]);

  const SelectDropdown = ({ 
    icon: Icon, value, onChange, options 
  }: { 
    icon: any, value: string, onChange: (e: any) => void, options: {val: string, label: string}[] 
  }) => (
    <div className="relative group">
      <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 z-10 ${colors.textMuted} group-focus-within:text-emerald-500 transition-colors`} />
      <select
        value={value}
        onChange={onChange}
        className={clsx(
          "w-full pl-10 pr-10 py-3.5 rounded-2xl border appearance-none outline-none text-sm font-bold transition-all cursor-pointer relative z-0", 
          theme === 'dark' 
            ? 'bg-[#111816] border-white/10 focus:border-emerald-500 text-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]' 
            : 'bg-white border-gray-200 focus:border-emerald-500 text-gray-900 shadow-sm hover:border-gray-300'
        )}
      >
        {options.map(opt => (
          <option 
            key={opt.val} 
            value={opt.val} 
            className={theme === 'dark' ? 'bg-[#0A0F0D] text-white py-2' : 'bg-white text-gray-900 py-2'}
          >
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${colors.textMuted}`} />
    </div>
  );

  if (step === 'loading') {
    return (
      <div className={`min-h-[calc(100vh-64px)] flex flex-col items-center justify-center ${colors.bg} ${colors.text} ${outfit.variable} font-display relative overflow-hidden`}>
        <div className="relative w-64 h-64 flex items-center justify-center mb-8">
          <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-[spin_2s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border-r-2 border-teal-500 animate-[spin_3s_linear_infinite_reverse]" />
          <div className="absolute inset-4 rounded-full border-b-2 border-blue-500 animate-[spin_1.5s_linear_infinite]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-full animate-pulse blur-xl" />
          <Cpu className="w-16 h-16 text-emerald-400 relative z-10 animate-pulse" />
        </div>
        <h2 className="text-3xl font-black tracking-tight mb-4">Processing Payload</h2>
        <p className="text-emerald-400 font-mono text-sm tracking-widest uppercase h-6 animate-pulse text-center px-4">
          {loadingText}
        </p>
      </div>
    );
  }

  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen ${colors.bg} ${colors.text} font-sans flex items-center justify-center p-4 transition-colors duration-300 relative overflow-x-hidden`}>
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className={clsx(
            "absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-1000",
            selectedUtility === 'electricity' && "bg-amber-500/10",
            selectedUtility === 'water' && "bg-cyan-500/10",
            selectedUtility === 'gas' && "bg-rose-500/10",
            (!selectedUtility || resultsType === 'carbon') && "bg-emerald-500/10"
          )}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl py-12">
        {step === 'hub' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            
            <div className="flex justify-center mb-8">
              <div className={clsx(
                "inline-flex items-center gap-4 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase border shadow-sm backdrop-blur-sm",
                theme === 'dark' ? 'bg-white/5 border-white/10 text-white/70' : 'bg-gray-50/80 border-gray-200 text-gray-600'
              )}>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-500" /> Bengaluru, IN</span>
                <span className="w-1 h-1 rounded-full bg-emerald-500 opacity-50" />
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-emerald-500" /> IST • {currentTime}</span>
              </div>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight mb-4">
                Digitize Your <span className="text-emerald-500">Habitat</span>
              </h1>
              <p className={`text-lg max-w-xl mx-auto ${colors.textMuted}`}>
                Select a utility stream to configure. Our AI requires context to map your historical consumption accurately.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {(['electricity', 'water', 'gas'] as const).map((utility) => {
                const config = CONFIG_DATA[utility];
                const Icon = config.icon;
                const utilityState = categoryStates[utility];
                const hasData = utilityState.selectedItems.length > 0 || utilityState.fileUploaded;

                return (
                  <button
                    key={utility}
                    onClick={() => handleSelectUtility(utility)}
                    className={clsx(
                      "group relative p-8 rounded-[2rem] border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 text-left overflow-hidden",
                      theme === 'dark'
                        ? 'bg-[#0A0F0D] border-white/10 hover:border-white/50'
                        : 'bg-white border-gray-200 hover:border-gray-500 shadow-xl'
                    )}
                  >
                    {hasData && (
                       <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" title="Configuration started" />
                    )}

                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                      <Icon className="w-32 h-32 -rotate-12" style={{ color: `var(--${config.color}-500)` }} />
                    </div>
                    <div className={clsx(
                      "w-14 h-14 rounded-2xl mb-6 flex items-center justify-center border transition-colors",
                      theme === 'dark' ? COLOR_VARIANTS[config.color].iconContainer : `bg-${config.color}-50 border-${config.color}-200 text-${config.color}-600`
                    )}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold font-display mb-2">{config.title}</h3>
                    <p className={`text-sm ${colors.textMuted}`}>
                      {utility === 'electricity' && "Configure high-load appliances and scan power bills."}
                      {utility === 'water' && "Map usage points and calculate regional scarcity impact."}
                      {utility === 'gas' && "Track LPG cylinders or piped municipal gas usage."}
                    </p>
                  </button>
                );
              })}
            </div>

            <button
              onClick={startCarbonAnalysis}
              className={clsx(
                "w-full group relative p-8 rounded-[2rem] border transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 text-left overflow-hidden flex flex-col md:flex-row items-center gap-8",
                theme === 'dark'
                  ? 'bg-gradient-to-r from-emerald-950/40 to-[#0A0F0D] border-emerald-500/20 hover:border-emerald-500/50'
                  : 'bg-gradient-to-r from-emerald-50 to-white border-emerald-200 hover:border-emerald-400 shadow-xl'
              )}
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                 <TreePine className="w-48 h-48 text-emerald-500 -rotate-12" />
              </div>
              <div className="shrink-0">
                <div className={clsx("w-16 h-16 rounded-2xl flex items-center justify-center border shadow-inner", theme === 'dark' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'bg-emerald-100 border-emerald-200 text-emerald-600')}>
                  <TreePine className="w-8 h-8" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left z-10">
                 <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                   <h3 className="text-3xl font-bold font-display text-emerald-500">Carbon Footprint Analyzer</h3>
                   <span className="hidden md:flex px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-emerald-500 text-black rounded animate-pulse">New</span>
                 </div>
                 <p className={`text-sm ${colors.textMuted} max-w-xl`}>
                   Go beyond basic utilities. Map your commuting, diet, and lifestyle to calculate your complete environmental impact and receive actionable ESG optimization strategies.
                 </p>
              </div>
              <div className="shrink-0 mt-4 md:mt-0 z-10">
                 <div className="w-12 h-12 rounded-full border border-emerald-500/30 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </div>
              </div>
            </button>
          </div>
        )}

        {step === 'config' && currentConfig && currentCategoryState && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setStep('hub')}
                className={`flex items-center gap-2 text-sm font-bold hover:opacity-100 transition-opacity ${colors.textMuted}`}
              >
                <ArrowLeft className="w-4 h-4" /> Back to Hub
              </button>
              
              <div className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 ${colors.textMuted}`}>
                <Clock className="w-3.5 h-3.5" /> Context Check
              </div>
            </div>

            <div className={clsx("rounded-[2.5rem] p-8 md:p-10 border shadow-2xl", theme === 'dark' ? 'bg-[#0A0F0D] border-white/10' : 'bg-white border-gray-100')}>
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/5">
                <div className={clsx("p-3 rounded-2xl border", variants.iconContainer)}>
                  <currentConfig.icon className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-black font-display leading-tight">{currentConfig.title}</h2>
                  <p className={`text-sm font-medium mt-1 ${colors.textMuted}`}>Configure the exact parameters of your {selectedUtility} setup.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${colors.textMuted}`}>Property Type</label>
                  <SelectDropdown 
                    icon={Building}
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as any)}
                    options={[
                      { val: "apartment", label: "Apartment / Flat" },
                      { val: "independent", label: "Independent House" },
                      { val: "farmhouse", label: "Farmhouse / Rural" },
                      { val: "commercial", label: "Small Commercial" }
                    ]}
                  />
                </div>

                <div>
                  <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${colors.textMuted}`}>Number of Occupants</label>
                  <div className={clsx("flex items-center justify-between px-2 py-2 rounded-2xl border h-[52px]", theme === 'dark' ? 'bg-[#111816] border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]' : 'bg-white border-gray-200 shadow-sm')}>
                    <button onClick={() => setOccupants(o => Math.max(1, o - 1))} className={clsx("w-9 h-9 flex items-center justify-center rounded-xl transition-all active:scale-95", theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-900')}>
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-black font-display w-12 text-center">{occupants}</span>
                    <button onClick={() => setOccupants(o => Math.min(20, o + 1))} className={clsx("w-9 h-9 flex items-center justify-center rounded-xl transition-all active:scale-95 text-white", variants.buttonBg)}>
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${colors.textMuted}`}>Primary Source</label>
                  <SelectDropdown 
                    icon={Factory}
                    value={currentCategoryState.primarySource}
                    onChange={(e) => updateCategoryField('primarySource', e.target.value)}
                    options={UTILITY_SOURCES[selectedUtility!].map(src => ({ val: src, label: src }))}
                  />
                </div>

                <div>
                  <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${colors.textMuted}`}>Billing Cycle</label>
                  <SelectDropdown 
                    icon={Calendar}
                    value={currentCategoryState.billingCycle}
                    onChange={(e) => updateCategoryField('billingCycle', e.target.value)}
                    options={[
                      { val: "monthly", label: "Monthly" },
                      { val: "bimonthly", label: "Bi-Monthly" },
                      { val: "quarterly", label: "Quarterly" }
                    ]}
                  />
                </div>
              </div>

              <div className="mb-8 pt-6 border-t border-white/5">
                <label className={`text-[10px] font-bold uppercase tracking-widest mb-3 block ${colors.textMuted}`}>Select Your Assets</label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[...currentConfig.items, ...currentCategoryState.customDevices.map(d => ({ ...d, icon: currentConfig.icon }))].map((item) => {
                    const isSelected = currentCategoryState.selectedItems.includes(item.id);
                    const isCustom = currentCategoryState.customDevices.some(d => d.id === item.id);
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleSelection(item.id)}
                        className={clsx(
                          "relative flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 text-left hover:scale-[1.02] group",
                          isSelected ? clsx(variants.bgLight, variants.borderAccent, variants.textAccent) : theme === 'dark' ? 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10' : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-white hover:border-gray-200'
                        )}
                      >
                        <item.icon className={clsx("w-5 h-5 shrink-0", isSelected ? 'opacity-100' : 'opacity-50')} />
                        <span className="font-bold text-xs leading-tight pr-6">{item.label}</span>
                        {isSelected && <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />}
                        {isCustom && (
                          <div 
                            onClick={(e) => removeCustomDevice(e, item.id)} 
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 z-10"
                          >
                            <X className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <form onSubmit={handleAddCustomDevice} className="flex gap-2 relative">
                  <input
                    type="text"
                    placeholder={`Add other ${currentConfig.title.split(' ')[0]} asset...`}
                    value={newDeviceInput}
                    onChange={(e) => setNewDeviceInput(e.target.value)}
                    className={clsx("flex-1 rounded-xl px-4 py-3 text-sm font-medium border outline-none transition-all", theme === 'dark' ? 'bg-[#111816] border-white/10 focus:border-emerald-500 placeholder:text-white/30 text-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]' : 'bg-white border-gray-200 focus:border-emerald-500 placeholder:text-gray-400 text-gray-900 shadow-sm hover:border-gray-300')}
                  />
                  <button type="submit" disabled={!newDeviceInput.trim()} className={clsx("px-4 rounded-xl border transition-all flex items-center justify-center disabled:opacity-50", theme === 'dark' ? 'bg-white/10 border-white/10 hover:bg-white/20 text-white' : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200')}>
                    <PlusCircle className="w-5 h-5" />
                  </button>
                </form>
              </div>

              <div className="mb-8 pt-8 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <label className={clsx("text-[10px] font-bold uppercase tracking-widest flex items-center gap-2", variants.textAccent)}>
                    <ScanLine className="w-4 h-4" /> Sync Latest Bill
                  </label>
                  
                  <input 
                    type="month" 
                    value={currentCategoryState.billPeriod}
                    onChange={(e) => updateCategoryField('billPeriod', e.target.value)}
                    className={clsx("text-xs font-bold px-2 py-1 rounded border outline-none cursor-pointer", theme === 'dark' ? 'bg-[#111816] border-white/10 text-white' : 'bg-white border-gray-200 text-gray-700')}
                  />
                </div>

                <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileUpload} />
                <div onClick={triggerFileInput} className={clsx("relative h-32 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden group/upload", currentCategoryState.fileUploaded ? clsx(variants.bgLight, variants.borderAccent) : theme === 'dark' ? 'bg-[#111816] border-white/10 hover:bg-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]' : 'bg-gray-50 border-gray-200 hover:bg-gray-100')}>
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${currentConfig.color}-400 to-transparent opacity-0 group-hover/upload:opacity-100 group-hover/upload:animate-[scan_2s_ease-in-out_infinite]`} />
                  
                  {isUploading ? (
                    <div className="flex flex-col items-center z-10">
                      <Cpu className="w-8 h-8 animate-spin mb-2 text-emerald-500" />
                      <p className="text-sm font-medium">Processing bill...</p>
                    </div>
                  ) : currentCategoryState.fileUploaded ? (
                    <div className="text-center z-10">
                      <CheckCircle2 className={clsx("w-8 h-8 mx-auto mb-2", variants.textAccent)} />
                      <p className={clsx("font-bold text-sm mb-1", theme === 'dark' ? 'text-white' : 'text-gray-900')}>{currentCategoryState.uploadedFileName}</p>
                      <p className={clsx("text-xs", variants.textAccent)}>Timestamp locked to {currentCategoryState.billPeriod}</p>
                    </div>
                  ) : (
                    <div className="text-center z-10">
                      <UploadCloud className={clsx("w-8 h-8 mx-auto mb-2 opacity-60", theme === 'dark' ? 'text-white' : 'text-gray-600')} />
                      <p className={clsx("font-bold text-sm", theme === 'dark' ? 'text-white/70' : 'text-gray-600')}>Tap to upload recent utility bill</p>
                      <p className="text-xs text-white/40 mt-1">Supports PDF & Images • OCR enabled</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={startAIAnalysis}
                disabled={!currentCategoryState.fileUploaded || isAnalyzing}
                className={clsx("w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg", currentCategoryState.fileUploaded && !isAnalyzing ? clsx(variants.buttonBg, variants.buttonText, "hover:scale-[1.02] active:scale-[0.98]") : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/10')}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze with Savera AI"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* --- NEW: Results & Recommendations View --- */}
        {step === 'results' && resultsType && (
          <div className="animate-in fade-in zoom-in duration-500 max-w-2xl mx-auto text-center">
            <div className={clsx(
              "p-8 md:p-12 rounded-[3rem] border backdrop-blur-xl mb-6",
              theme === 'dark' ? 'bg-[#0A0F0D] border-emerald-500/20' : 'bg-white border-emerald-100 shadow-2xl'
            )}>
              <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-500 mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black mb-2 capitalize">{resultsType} Analysis Complete</h2>
              <p className={colors.textMuted}>
                Savera AI found {getSuggestions(resultsType).length} optimization opportunities for your {resultsType} setup.
              </p>

              <div className="mt-8 space-y-4 text-left">
                {getSuggestions(resultsType).map((s) => (
                  <div key={s.id} className={clsx(
                    "p-5 rounded-2xl border flex items-center justify-between gap-4 transition-all hover:border-emerald-500/50",
                    theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                  )}>
                    <div className="flex items-start gap-3">
                      {resultsType === 'electricity' && <Zap className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />}
                      {resultsType === 'water' && <Droplets className="w-5 h-5 text-cyan-500 mt-0.5 shrink-0" />}
                      {resultsType === 'gas' && <Flame className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />}
                      {resultsType === 'carbon' && <TreePine className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />}
                      <p className="text-sm font-bold leading-relaxed">{s.text}</p>
                    </div>
                    <span className={clsx(
                      "text-[10px] font-black uppercase px-2 py-1 rounded",
                      s.impact === 'High' || s.impact === 'Critical' ? 'bg-emerald-500 text-black' : 'bg-gray-200 text-gray-800'
                    )}>
                      {s.impact}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                <button
                  onClick={handleAutomate}
                  className="flex items-center justify-center gap-2 py-4 bg-emerald-500 text-black rounded-2xl font-black hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                >
                  <Cpu className="w-5 h-5" /> Automate Now
                </button>
                
                <button
                  onClick={() => router.push(resultsType === 'carbon' ? '/carbon-footprint' : '/dashboard')}
                  className={clsx(
                    "py-4 rounded-2xl font-bold border transition-all flex items-center justify-center gap-2",
                    theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'
                  )}
                >
                  View Full Report <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <button onClick={() => { setStep('hub'); setResultsType(null); setSelectedUtility(null); }} className={clsx("text-sm font-bold flex items-center gap-2 mx-auto transition-opacity hover:opacity-70", colors.textMuted)}>
               <ArrowLeft className="w-4 h-4" /> Start another setup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
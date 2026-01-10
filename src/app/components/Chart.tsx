'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  Tooltip,
  Cell,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { ScanLine, TrendingUp, Info } from 'lucide-react';

interface ChartProps {
  data: Array<{ name: string; cost: number; percent: number }>;
  title: string;
  color: string; // Expecting Hex (e.g. #10B981)
  total: string;
}

export default function UsageChart({ data, title, color, total }: ChartProps) {
  // Create a unique ID for the gradient based on title to avoid conflicts if multiple charts exist
  const gradientId = `barGradient-${title.replace(/\s+/g, '')}`;

  return (
    <div className="group relative bg-[#0A0F0D]/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-500 overflow-hidden">
      
      {/* Background Glow Effect based on the passed color */}
      <div 
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-500"
        style={{ backgroundColor: color }} 
      />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
           <h3 className="text-2xl font-bold font-display text-white flex items-center gap-2">
            {title}
          </h3>
          <p className="text-xs text-white/40 font-mono mt-1 flex items-center gap-1">
             <Info className="w-3 h-3" /> Real-time detection
          </p>
        </div>
       
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md">
          <ScanLine className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            AI Confidence 95%
          </span>
        </div>
      </div>
      
      {/* Chart Area */}
      <div className="relative z-10 h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.8}/>
                <stop offset="100%" stopColor={color} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              vertical={false} 
              stroke="rgba(255,255,255,0.05)" 
              strokeDasharray="4 4" 
            />
            
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: 500, fill: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-inter)' }}
              dy={10}
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
              tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-inter)' }}
            />
            
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              contentStyle={{
                backgroundColor: '#050B08',
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '16px',
                color: '#fff',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
                fontFamily: 'var(--font-inter)',
                fontSize: '14px'
              }}
              itemStyle={{ color: '#fff' }}
              formatter={(value) => [`${value ?? 0}%`, 'Usage']}
              labelStyle={{ color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            />
            
            <Bar 
              dataKey="percent" 
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#${gradientId})`} 
                  stroke={color}
                  strokeOpacity={0.3}
                  strokeWidth={1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Footer / Total */}
      <div className="relative z-10 mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-2 text-white/40 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Monthly Projection</span>
         </div>
         <div className="text-right">
            <p className="text-4xl font-black font-display tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              {total}
            </p>
         </div>
      </div>
    </div>
  );
}
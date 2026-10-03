import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Cpu, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  TrendingUp, 
  Layers, 
  HelpCircle,
  FileCheck2,
  Lock
} from 'lucide-react';

interface AiHealthSectionProps {
  onShowToast: (text: string, type?: 'success' | 'alert' | 'info') => void;
}

export const AiHealthSection: React.FC<AiHealthSectionProps> = ({ onShowToast }) => {
  // Interactive Simulation State
  const [age, setAge] = useState<number>(44);
  const [heartRate, setHeartRate] = useState<number>(76);
  const [spo2, setSpo2] = useState<number>(98);
  const [systolicBp, setSystolicBp] = useState<number>(120);
  const [temperature, setTemperature] = useState<number>(36.8);
  const [selectedCondition, setSelectedCondition] = useState<string>('Hypertension (Mild)');
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(true);

  // Simple calculation of demo risk
  const computeRisk = () => {
    let score = 15;
    if (heartRate > 100) score += (heartRate - 100) * 0.9;
    if (heartRate < 55) score += (55 - heartRate) * 1.1;
    if (spo2 < 95) score += (95 - spo2) * 5;
    if (systolicBp > 135) score += (systolicBp - 135) * 0.6;
    if (temperature > 37.8) score += (temperature - 37.8) * 15;
    if (age > 65) score += (age - 65) * 0.4;
    if (selectedCondition === 'Cardiovascular Disease') score += 18;
    if (selectedCondition === 'Type 2 Diabetes') score += 12;
    if (selectedCondition === 'Respiratory Asthma') score += 10;
    return Math.min(96, Math.max(8, Math.round(score)));
  };

  const riskScore = computeRisk();

  const getRiskLevel = (score: number) => {
    if (score >= 65) {
      return {
        level: 'HIGH',
        color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
        priority: 'High Priority (Same-Day Clinical Review)',
        confidence: '88% Pattern Similarity',
        factors: [
          heartRate > 100 ? `Tachycardia (${heartRate} bpm > 100 limit)` : null,
          spo2 < 93 ? `Hypoxemia (${spo2}% < 95% target)` : null,
          systolicBp > 140 ? `Elevated Blood Pressure (${systolicBp} mmHg)` : null,
          temperature > 38.0 ? `Febrile indicator (${temperature}°C)` : null,
          selectedCondition !== 'None' ? `Comorbidity weight: ${selectedCondition}` : null,
        ].filter(Boolean) as string[],
        unusual: 'Combination of accelerated heart rate and oxygen variance detected.',
      };
    } else if (score >= 35) {
      return {
        level: 'MODERATE',
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        priority: 'Routine Watch (Review within 48 Hours)',
        confidence: '91% Pattern Similarity',
        factors: [
          heartRate > 90 ? `Mildly elevated resting pulse (${heartRate} bpm)` : null,
          systolicBp > 130 ? `Pre-hypertensive systolic range (${systolicBp} mmHg)` : null,
          `Underlying baseline: ${selectedCondition}`,
        ].filter(Boolean) as string[],
        unusual: 'Mild variance noted across resting blood pressure trends.',
      };
    } else {
      return {
        level: 'LOW',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        priority: 'Standard Wellness (Maintain Healthy Habits)',
        confidence: '95% Pattern Similarity',
        factors: ['All core vital metrics remain within healthy reference thresholds.'],
        unusual: 'None. Physiological readings are balanced.',
      };
    }
  };

  const insight = getRiskLevel(riskScore);

  const capabilities = [
    { title: 'Disease Risk Analysis', desc: 'Identifies potential warning signs from combinations of blood pressure, oxygen, and heart rate.' },
    { title: 'Anomaly Detection', desc: 'Flags sudden unexpected spikes or drops in your daily smart device readings.' },
    { title: 'Patient Prioritization', desc: 'Helps triage nurses allocate early attention to patients experiencing acute symptoms.' },
    { title: 'Readmission-Risk Estimation', desc: 'Estimates if recovering patients need additional home health check-ins after discharge.' },
    { title: 'Emergency-Risk Flagging', desc: 'Rapidly identifies acute decompensations and recommends immediate emergency outreach.' },
    { title: 'Patient Severity Estimation', desc: 'Combines age, lab history, and live vitals into an easy-to-understand stability index.' },
    { title: 'Treatment-Response Trends', desc: 'Tracks whether your health measurements improve after starting a new medication.' },
    { title: 'Smart Scheduling', desc: 'Estimates appointment time needed based on your visit type and health questions.' },
    { title: 'Resource Optimization', desc: 'Ensures clinic exam rooms and diagnostic equipment are prepared ahead of appointments.' },
  ];

  const mlConcepts = [
    { name: 'Random Forest', simpleDesc: 'Structured healthcare risk prediction by combining multiple decision trees.' },
    { name: 'XGBoost', simpleDesc: 'Fast classification and risk analysis for clinical health patterns.' },
    { name: 'Support Vector Machine (SVM)', simpleDesc: 'Patient classification finding clean boundaries between healthy and at-risk readings.' },
    { name: 'Convolutional Neural Networks (CNN)', simpleDesc: 'Medical-image and waveform analysis for detecting rhythm changes in ECG streams.' },
    { name: 'Long Short-Term Memory (LSTM)', simpleDesc: 'Time-series health monitoring that tracks vital trends over hours and days.' },
    { name: 'Neural Networks (MLP)', simpleDesc: 'Complex prediction tasks connecting multiple health factors simultaneously.' },
  ];

  const dataPipelineSteps = [
    { step: 'Patient Data', desc: 'Information from smart devices, clinic visits, and health logs' },
    { step: 'Data Validation', desc: 'Checking that readings fall within possible human ranges' },
    { step: 'Missing Data Handling', desc: 'Carefully filling temporary gaps in device connections' },
    { step: 'Normalization', desc: 'Adjusting measurements to standard reference scales' },
    { step: 'Encoding', desc: 'Organizing categories and condition types for computer review' },
    { step: 'Scaling', desc: 'Balancing different units (like bpm vs mmHg) equally' },
    { step: 'Feature Engineering', desc: 'Creating helpful health indicators (like pulse pressure or recovery rate)' },
    { step: 'AI Analysis', desc: 'Evaluating information against tested healthcare patterns' },
    { step: 'Health Insight', desc: 'Delivering clear, understandable guidance to you and your care team' },
  ];

  return (
    <section id="ai-health" className="py-20 bg-slate-950/70 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold block">
              Intelligent Care Support
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-0.5">
              AI Health
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              See a demonstration of how health information can be analyzed for possible risk patterns.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            Demo AI Output — Not a Medical Diagnosis
          </div>
        </div>

        {/* Plain Language CareConnect Statement */}
        <div className="mb-10 p-5 rounded-2xl border border-slate-800 bg-slate-900/60 text-slate-300 text-sm leading-relaxed backdrop-blur-sm">
          <p>
            <strong className="text-white">How CareConnect uses AI: </strong>
            CareConnect uses AI/ML concepts to demonstrate how healthcare information can be analyzed to identify patterns and support care teams. This technology is designed to assist doctors and nurses by highlighting subtle vital sign trends early, but it never replaces licensed medical professionals or official medical diagnoses.
          </p>
        </div>

        {/* Interactive Demonstration Area */}
        <div className="rounded-3xl border border-teal-500/40 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-14">
          <div className="flex items-center gap-2 mb-2 text-teal-400 font-mono text-xs font-bold uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Health Insight Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Try the AI Health Pattern Demonstrator
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mb-6">
            Adjust the health values below to see how CareConnect detects potential patterns and presents easy-to-understand insights.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Sliders (7 cols) */}
            <div className="lg:col-span-7 space-y-4 bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80">
              
              {/* Age */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Age</span>
                  <span className="text-teal-400 font-mono">{age} years</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="90"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full accent-teal-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Heart Rate */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Heart Rate</span>
                  <span className="text-teal-400 font-mono">{heartRate} bpm</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="140"
                  value={heartRate}
                  onChange={(e) => setHeartRate(Number(e.target.value))}
                  className="w-full accent-teal-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                  <span>Slow (45)</span>
                  <span>Normal (60–100)</span>
                  <span>High (140)</span>
                </div>
              </div>

              {/* SpO2 */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Blood Oxygen (SpO₂)</span>
                  <span className="text-teal-400 font-mono">{spo2}%</span>
                </div>
                <input
                  type="range"
                  min="85"
                  max="100"
                  value={spo2}
                  onChange={(e) => setSpo2(Number(e.target.value))}
                  className="w-full accent-teal-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                  <span>Low (85%)</span>
                  <span>Target Range (95%–100%)</span>
                </div>
              </div>

              {/* Blood Pressure */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Systolic Blood Pressure</span>
                  <span className="text-teal-400 font-mono">{systolicBp} mmHg</span>
                </div>
                <input
                  type="range"
                  min="90"
                  max="180"
                  value={systolicBp}
                  onChange={(e) => setSystolicBp(Number(e.target.value))}
                  className="w-full accent-teal-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Temperature */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Body Temperature</span>
                  <span className="text-teal-400 font-mono">{temperature}°C</span>
                </div>
                <input
                  type="range"
                  min="36.0"
                  max="39.5"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-teal-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Previous Conditions */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Known Previous Conditions
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'None',
                    'Hypertension (Mild)',
                    'Type 2 Diabetes',
                    'Cardiovascular Disease',
                    'Respiratory Asthma',
                  ].map((cond) => (
                    <button
                      key={cond}
                      onClick={() => setSelectedCondition(cond)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        selectedCondition === cond
                          ? 'bg-teal-500 text-slate-950 font-bold'
                          : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Simulated Result Card (5 cols) */}
            <div className="lg:col-span-5 bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  Demo Health Insight
                </span>
                <span className="text-[10px] text-teal-400 font-mono">Simulated Output</span>
              </div>

              {/* Risk Level Badge */}
              <div className="text-center py-2">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                  Evaluated Risk Level
                </span>
                <div className={`inline-block px-5 py-1.5 rounded-full border text-lg sm:text-xl font-extrabold font-mono tracking-wider ${insight.color}`}>
                  {insight.level} RISK
                </div>
              </div>

              {/* Review Priority & Confidence */}
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Review Priority:</span>
                  <span className="font-semibold text-white text-right">{insight.priority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Confidence Indicator:</span>
                  <span className="font-mono text-teal-300 font-semibold">{insight.confidence}</span>
                </div>
              </div>

              {/* Possible Factors */}
              <div>
                <span className="text-xs font-bold text-slate-300 block mb-1.5">
                  Possible Risk Factors:
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {insight.factors.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-teal-400 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Detected Unusual Readings */}
              <div className="pt-2 border-t border-slate-800/80 text-xs">
                <span className="text-slate-400 block mb-0.5">Detected Observations:</span>
                <p className="text-slate-300 italic">{insight.unusual}</p>
              </div>

              {/* Mandatory Notice */}
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-[11px] text-center font-medium">
                Demo AI output — not a medical diagnosis.
              </div>
            </div>

          </div>
        </div>

        {/* 9 Healthcare AI Capabilities Grid */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-white">
              How AI Supports Modern Healthcare Teams
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Explore the nine ways algorithmic analysis helps clinics stay organized and alert.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap) => (
              <div key={cap.title} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-colors">
                <h4 className="text-sm font-bold text-teal-300 mb-1">{cap.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* "How health information is prepared" Workflow */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl mb-14">
          <div className="mb-6">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold block">
              Technology Behind The Platform
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              How Health Information is Prepared
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Before health measurements can be analyzed, they pass through a structured verification pipeline to ensure safety and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2">
            {dataPipelineSteps.map((step, idx) => (
              <div key={step.step} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block mb-1">0{idx + 1}</span>
                  <span className="text-xs font-bold text-white uppercase block leading-snug">
                    {step.step}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 mt-2 block leading-snug">
                  {step.desc}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs text-slate-400 items-center justify-between">
            <span>Example Calculated Features: Risk Score · Patient Severity Index · Disease Progression Trend · Treatment Response</span>
            <span className="text-teal-400 font-mono text-[11px]">Strict Data Quality Standards</span>
          </div>
        </div>

        {/* AI/ML Technology (Secondary Technical Area in Plain Terms) */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
          <h3 className="text-base font-bold text-white mb-2">
            AI & Machine Learning Technology Concepts
          </h3>
          <p className="text-slate-400 text-xs mb-4">
            A look under the hood at the computational algorithms used in clinical research and healthcare prototypes.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {mlConcepts.map((item) => (
              <div key={item.name} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="font-bold text-teal-300 block mb-1">{item.name}</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">{item.simpleDesc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

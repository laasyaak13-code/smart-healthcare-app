import React, { useState } from 'react';
import { 
  Heart, 
  Activity, 
  Gauge, 
  Thermometer, 
  Wind, 
  Footprints, 
  Moon, 
  Zap, 
  RefreshCw, 
  Watch, 
  Fingerprint, 
  CheckCircle2, 
  AlertCircle, 
  BatteryCharging, 
  Wifi, 
  WifiOff,
  Sparkles
} from 'lucide-react';
import { INITIAL_VITALS, INITIAL_DEVICES } from '../data/mockData';
import { VitalMetric, ConnectedDevice, HealthStatusTier } from '../types';

interface MyHealthSectionProps {
  onShowToast: (text: string, type?: 'success' | 'alert' | 'info') => void;
}

export const MyHealthSection: React.FC<MyHealthSectionProps> = ({ onShowToast }) => {
  const [vitals, setVitals] = useState<VitalMetric[]>(INITIAL_VITALS);
  const [devices, setDevices] = useState<ConnectedDevice[]>(INITIAL_DEVICES);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const getMetricIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart': return Heart;
      case 'Activity': return Activity;
      case 'Gauge': return Gauge;
      case 'Thermometer': return Thermometer;
      case 'Wind': return Wind;
      case 'Footprints': return Footprints;
      case 'Moon': return Moon;
      case 'Zap': return Zap;
      default: return Activity;
    }
  };

  const getDeviceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Watch': return Watch;
      case 'Activity': return Activity;
      case 'Fingerprint': return Fingerprint;
      case 'Gauge': return Gauge;
      case 'Thermometer': return Thermometer;
      default: return Watch;
    }
  };

  const statusStyles: Record<HealthStatusTier, { badge: string; text: string }> = {
    Normal: { badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', text: 'Normal' },
    Monitor: { badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20', text: 'Monitor' },
    Attention: { badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20', text: 'Attention' },
    Critical: { badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30', text: 'Critical' },
  };

  // Sync All Devices handler
  const handleSyncDevices = () => {
    setIsSyncing(true);
    setTimeout(() => {
      // Fluctuate sample readings realistically
      setVitals(prev => prev.map(item => {
        let newVal = item.numericValue;
        let newDisplay = item.value;
        let newHistory = [...item.history.slice(1)];

        if (item.id === 'hr') {
          newVal = Math.floor(Math.random() * 8) + 68;
          newDisplay = `${newVal}`;
          newHistory.push(newVal);
        } else if (item.id === 'spo2') {
          newVal = Math.floor(Math.random() * 3) + 97;
          newDisplay = `${newVal}`;
          newHistory.push(newVal);
        } else if (item.id === 'bp') {
          const sys = Math.floor(Math.random() * 8) + 116;
          const dia = Math.floor(Math.random() * 6) + 74;
          newVal = sys;
          newDisplay = `${sys}/${dia}`;
          newHistory.push(sys);
        } else if (item.id === 'steps') {
          newVal = item.numericValue + Math.floor(Math.random() * 120) + 15;
          newDisplay = newVal.toLocaleString();
          newHistory.push(newVal);
        } else if (item.id === 'temp') {
          const t = +(36.7 + Math.random() * 0.3).toFixed(1);
          newVal = t;
          newDisplay = `${t}`;
          newHistory.push(t);
        }

        return {
          ...item,
          numericValue: newVal,
          value: newDisplay,
          history: newHistory,
          lastUpdated: 'Just now',
        };
      }));

      // Update connected devices last synced
      setDevices(prev => prev.map(d => d.isConnected ? { ...d, lastSynced: 'Just now' } : d));

      setIsSyncing(false);
      onShowToast('All connected smart devices synchronized successfully.', 'success');
    }, 600);
  };

  // Toggle individual device connection
  const handleToggleDevice = (deviceId: string) => {
    setDevices(prev => prev.map(d => {
      if (d.id === deviceId) {
        const nextState = !d.isConnected;
        onShowToast(
          nextState ? `${d.name} connected successfully.` : `${d.name} disconnected.`,
          nextState ? 'success' : 'info'
        );
        return {
          ...d,
          isConnected: nextState,
          lastSynced: nextState ? 'Just now' : d.lastSynced,
        };
      }
      return d;
    }));
  };

  // Sync individual device
  const handleSyncSingleDevice = (deviceId: string) => {
    const target = devices.find(d => d.id === deviceId);
    if (!target?.isConnected) {
      onShowToast('Please connect the device first before synchronizing.', 'alert');
      return;
    }
    setDevices(prev => prev.map(d => d.id === deviceId ? { ...d, lastSynced: 'Just now' } : d));
    onShowToast(`${target.name} data refreshed.`, 'success');
  };

  return (
    <section id="my-health" className="py-20 bg-slate-950/80 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with First-Time Guidance */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-10 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold block">
              Personal Monitoring
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-0.5">
              My Health
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Check your latest health readings and connected-device information.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              Demo Readings
            </span>
            <button
              onClick={handleSyncDevices}
              disabled={isSyncing}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 active:scale-95 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync My Devices'}</span>
            </button>
          </div>
        </div>

        {/* 8 Health Measurement Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {vitals.map((metric) => {
            const Icon = getMetricIcon(metric.icon);
            const statusConfig = statusStyles[metric.status];

            // Render mini sparkline SVG from history numbers
            const minH = Math.min(...metric.history);
            const maxH = Math.max(...metric.history);
            const range = maxH - minH || 1;
            const points = metric.history
              .map((val, idx) => {
                const x = (idx / (metric.history.length - 1)) * 100;
                const y = 30 - ((val - minH) / range) * 24;
                return `${x},${y}`;
              })
              .join(' ');

            return (
              <div
                key={metric.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm hover:border-teal-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusConfig.badge}`}>
                      {statusConfig.text}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-slate-300 block">
                    {metric.name}
                  </span>

                  {/* Value */}
                  <div className="mt-1 flex items-baseline gap-1.5 font-mono">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                      {metric.value}
                    </span>
                    <span className="text-xs text-slate-400 font-sans">{metric.unit}</span>
                  </div>

                  <div className="text-[11px] text-slate-400 mt-1">
                    Normal: {metric.normalRange}
                  </div>
                </div>

                {/* Sparkline & Footer */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <div className="w-full h-8 mb-2">
                    <svg className="w-full h-full" viewBox="0 0 100 35" preserveAspectRatio="none">
                      <polyline
                        fill="none"
                        stroke="#14b8a6"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={points}
                      />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>Trend: {metric.trend}</span>
                    <span>{metric.lastUpdated}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Connected Devices Section */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Watch className="w-5 h-5 text-teal-400" />
                <span>Connected Devices</span>
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Manage personal wearable sensors, home monitors, and automated health trackers.
              </p>
            </div>
            <span className="text-xs font-mono text-teal-400">
              {devices.filter(d => d.isConnected).length} of {devices.length} Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map((device) => {
              const DeviceIcon = getDeviceIcon(device.iconName);

              return (
                <div 
                  key={device.id}
                  className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400">
                          <DeviceIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white leading-snug">
                            {device.name}
                          </h4>
                          <span className="text-[11px] text-slate-400 block">{device.category}</span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                        device.isConnected 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {device.isConnected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                        <span>{device.isConnected ? 'Connected' : 'Offline'}</span>
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 mb-4 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Battery Level:</span>
                        <span className="font-mono text-teal-300 font-semibold">{device.batteryPct}%</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Last Synced:</span>
                        <span className="text-slate-200">{device.lastSynced}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/60 truncate">
                        Feeds: {device.dataType}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                    <button
                      onClick={() => handleToggleDevice(device.id)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        device.isConnected
                          ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
                          : 'bg-teal-500 hover:bg-teal-400 text-slate-950'
                      }`}
                    >
                      {device.isConnected ? 'Disconnect' : 'Connect'}
                    </button>

                    <button
                      onClick={() => handleSyncSingleDevice(device.id)}
                      disabled={!device.isConnected}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-teal-400 hover:text-teal-300 text-xs font-semibold transition-colors disabled:opacity-40"
                    >
                      Sync
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  RotateCcw, 
  Play, 
  Phone, 
  Star, 
  Compass, 
  Building2, 
  Pill, 
  FlaskConical, 
  AlertTriangle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { HEALTHCARE_FACILITIES } from '../data/mockData';
import { HealthcareFacility } from '../types';

interface FindCareSectionProps {
  externalSelectedFacilityId?: string;
  onShowToast: (text: string, type?: 'success' | 'alert' | 'info') => void;
}

export const FindCareSection: React.FC<FindCareSectionProps> = ({ externalSelectedFacilityId, onShowToast }) => {
  const [selectedType, setSelectedType] = useState<HealthcareFacility['type'] | 'All'>('All');
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('fac-1');
  const [routeMode, setRouteMode] = useState<'shortest' | 'alternative'>('shortest');
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [navProgress, setNavProgress] = useState<number>(0);

  useEffect(() => {
    if (externalSelectedFacilityId) {
      setSelectedFacilityId(externalSelectedFacilityId);
      const target = HEALTHCARE_FACILITIES.find(f => f.id === externalSelectedFacilityId);
      if (target) {
        setSelectedType(target.type);
        setRouteMode('shortest');
      }
    }
  }, [externalSelectedFacilityId]);

  const filteredFacilities = selectedType === 'All'
    ? HEALTHCARE_FACILITIES
    : HEALTHCARE_FACILITIES.filter(f => f.type === selectedType);

  const selectedFacility = HEALTHCARE_FACILITIES.find(f => f.id === selectedFacilityId) || HEALTHCARE_FACILITIES[0];

  // User starting point (Home)
  const homeCoords = { x: 140, y: 320 };

  const currentRouteCoords = routeMode === 'shortest' 
    ? selectedFacility.shortestRouteCoords 
    : selectedFacility.alternativeRouteCoords;

  // Path SVG string
  const routePathD = currentRouteCoords.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  // Calculate distance and time with alternate modifier
  const currentDistance = routeMode === 'shortest' 
    ? selectedFacility.distanceKm 
    : +(selectedFacility.distanceKm * 1.35).toFixed(1);

  const currentEstTime = routeMode === 'shortest'
    ? selectedFacility.estimatedMins
    : Math.round(selectedFacility.estimatedMins * 1.4);

  // Animated dispatch along route
  useEffect(() => {
    let animFrame: number;
    if (isNavigating) {
      const startTime = performance.now();
      const duration = 5000;

      const loop = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(1, elapsed / duration);
        setNavProgress(p);
        if (p < 1) {
          animFrame = requestAnimationFrame(loop);
        } else {
          setIsNavigating(false);
          onShowToast(`Arrived at ${selectedFacility.name}.`, 'success');
        }
      };
      animFrame = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(animFrame);
  }, [isNavigating, selectedFacility.name]);

  const handleSelectFacility = (fac: HealthcareFacility) => {
    setSelectedFacilityId(fac.id);
    setIsNavigating(false);
    setNavProgress(0);
    onShowToast(`Route calculated for ${fac.name}.`, 'info');
  };

  const handleResetRoute = () => {
    setIsNavigating(false);
    setNavProgress(0);
    setRouteMode('shortest');
    onShowToast('Route view reset to default.', 'info');
  };

  // Interpolate user moving position
  const getNavMarkerPosition = () => {
    const pts = currentRouteCoords;
    const segCount = pts.length - 1;
    const totalPos = navProgress * segCount;
    const segIdx = Math.min(segCount - 1, Math.floor(totalPos));
    const t = totalPos - segIdx;
    const p0 = pts[segIdx];
    const p1 = pts[segIdx + 1];
    return {
      x: p0.x + (p1.x - p0.x) * t,
      y: p0.y + (p1.y - p0.y) * t,
    };
  };

  const navMarker = getNavMarkerPosition();

  const getFacilityIcon = (type: HealthcareFacility['type']) => {
    switch (type) {
      case 'Clinic': return Building2;
      case 'Hospital': return Building2;
      case 'Pharmacy': return Pill;
      case 'Laboratory': return FlaskConical;
      case 'Emergency Facility': return AlertTriangle;
      default: return MapPin;
    }
  };

  return (
    <section id="find-care" className="py-20 bg-slate-950/70 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold block">
              Facility Finder & Route Visualization
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-0.5">
              Find Care
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Find healthcare facilities and view a route to your selected destination.
            </p>
          </div>

          {/* 4-Step User Journey Guide */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-slate-300">
            <span>1. Choose facility</span>
            <span className="text-teal-400">→</span>
            <span>2. Pick location</span>
            <span className="text-teal-400">→</span>
            <span>3. View route</span>
            <span className="text-teal-400">→</span>
            <span className="text-teal-300 font-bold">4. Distance & ETA</span>
          </div>
        </div>

        {/* Step 1: Filter What You Need */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-bold text-slate-300 mr-2">Filter Category:</span>
          {(['All', 'Clinic', 'Hospital', 'Pharmacy', 'Laboratory', 'Emergency Facility'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedType(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedType === cat
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Map & Facility Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Facility List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Select Destination ({filteredFacilities.length} available):
            </span>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredFacilities.map((fac) => {
                const IconComponent = getFacilityIcon(fac.type);
                const isSelected = selectedFacilityId === fac.id;

                return (
                  <div
                    key={fac.id}
                    onClick={() => handleSelectFacility(fac)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-teal-500/15 border-teal-400 shadow-lg shadow-teal-500/10'
                        : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        fac.type === 'Emergency Facility'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 font-bold'
                          : 'bg-slate-950 text-teal-400 border-slate-800'
                      }`}>
                        {fac.type}
                      </span>
                      <span className="text-xs font-bold text-teal-300 font-mono">
                        {fac.distanceKm} km · {fac.estimatedMins} min
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-1">
                      {fac.name}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-1 mb-2">
                      {fac.address}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                      <span>{fac.openHours}</span>
                      <span className="flex items-center gap-1 text-amber-400 font-mono">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {fac.rating}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Vector Map Canvas & Controls (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Route Control Toolbar */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 backdrop-blur-sm">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    setIsNavigating(false);
                    setNavProgress(0);
                    onShowToast(`Showing optimal route to ${selectedFacility.name}. Distance: ${currentDistance} km, Est. time: ${currentEstTime} min.`, 'info');
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 border border-teal-500/50 text-teal-300 hover:bg-slate-800 hover:border-teal-400 transition-all active:scale-95 shadow-sm"
                  title="Display route details on map"
                >
                  <Navigation className="w-3.5 h-3.5 text-teal-400" />
                  <span>Show Route</span>
                </button>

                <button
                  onClick={() => {
                    setRouteMode('shortest');
                    setNavProgress(0);
                    onShowToast(`Switched to Shortest Route (${selectedFacility.distanceKm} km).`, 'info');
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    routeMode === 'shortest'
                      ? 'bg-teal-500 text-slate-950 font-bold shadow'
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-white'
                  }`}
                >
                  Shortest Route ({selectedFacility.distanceKm} km)
                </button>

                <button
                  onClick={() => {
                    setRouteMode('alternative');
                    setNavProgress(0);
                    onShowToast(`Switched to Alternative Route (+${+(selectedFacility.distanceKm * 0.35).toFixed(1)} km detour).`, 'info');
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    routeMode === 'alternative'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-white'
                  }`}
                >
                  Alternative Route (+{+(selectedFacility.distanceKm * 0.35).toFixed(1)} km)
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setNavProgress(0);
                    setIsNavigating(true);
                  }}
                  disabled={isNavigating}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold disabled:opacity-50 transition-all active:scale-95 shadow-md shadow-teal-500/20"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isNavigating ? 'Navigating...' : 'Simulate Route'}</span>
                </button>

                <button
                  onClick={handleResetRoute}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                  title="Reset Route"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Route</span>
                </button>
              </div>
            </div>

            {/* Destination Info Pill Card */}
            <div className="rounded-2xl border border-teal-500/30 bg-slate-900/90 p-4 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-teal-400 uppercase font-bold tracking-wider block">
                  SELECTED DESTINATION
                </span>
                <h3 className="text-base font-bold text-white">
                  {selectedFacility.name}
                </h3>
                <span className="text-xs text-slate-400">{selectedFacility.address}</span>
              </div>

              <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 font-mono text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block">DISTANCE</span>
                  <span className="text-sm font-bold text-white">{currentDistance} km</span>
                </div>
                <div className="w-px h-6 bg-slate-800" />
                <div>
                  <span className="text-slate-400 text-[10px] block">EST. TIME</span>
                  <span className="text-sm font-bold text-teal-400">{currentEstTime} min</span>
                </div>
                <div className="w-px h-6 bg-slate-800" />
                <div>
                  <span className="text-slate-400 text-[10px] block">ROUTE</span>
                  <span className="text-xs font-bold uppercase text-slate-200">{routeMode}</span>
                </div>
              </div>
            </div>

            {/* Self-Contained SVG Vector Map */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-2 mb-2 text-xs font-mono text-slate-400 border-b border-slate-800/80">
                <span className="flex items-center gap-1.5 text-teal-400">
                  <Compass className="w-3.5 h-3.5" />
                  <span>METROPOLITAN HEALTH CORRIDOR MAP (OFFLINE SVG)</span>
                </span>
                <span className="text-slate-400">Zero External API Dependencies</span>
              </div>

              <div className="relative w-full aspect-[16/9] bg-[#070b12] rounded-xl border border-slate-800/80 overflow-hidden">
                
                {/* City Grid Background */}
                <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none">
                  <defs>
                    <pattern id="careGrid" width="36" height="36" patternUnits="userSpaceOnUse">
                      <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#2dd4bf" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#careGrid)" />
                </svg>

                {/* City Road Network */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 900 500" preserveAspectRatio="none">
                  <g stroke="#1a2436" strokeWidth="4" opacity="0.6">
                    <line x1="60" y1="120" x2="840" y2="120" />
                    <line x1="60" y1="220" x2="840" y2="220" />
                    <line x1="60" y1="320" x2="840" y2="320" />
                    <line x1="60" y1="410" x2="840" y2="410" />
                    <line x1="140" y1="50" x2="140" y2="460" />
                    <line x1="280" y1="50" x2="280" y2="460" />
                    <line x1="490" y1="50" x2="490" y2="460" />
                    <line x1="740" y1="50" x2="740" y2="460" />
                  </g>

                  {/* Active Route Path */}
                  <path
                    d={routePathD}
                    fill="none"
                    stroke={routeMode === 'shortest' ? '#14b8a6' : '#f59e0b'}
                    strokeWidth="5"
                    strokeDasharray="8 5"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />

                  {/* Moving Navigation Vehicle Marker */}
                  {isNavigating && (
                    <g transform={`translate(${navMarker.x}, ${navMarker.y})`}>
                      <circle r="16" fill="#0d9488" opacity="0.3" className="animate-ping" />
                      <circle r="10" fill="#14b8a6" stroke="#ffffff" strokeWidth="2.5" />
                      <text x="-4" y="4" fontSize="10" fill="#ffffff" fontWeight="bold">🚗</text>
                    </g>
                  )}
                </svg>

                {/* Home Location Marker */}
                <div 
                  style={{ left: `${(homeCoords.x / 900) * 100}%`, top: `${(homeCoords.y / 500) * 100}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <div className="w-8 h-8 rounded-full bg-sky-500 border-2 border-white shadow-xl flex items-center justify-center text-xs text-white font-bold">
                    🏠
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap bg-slate-950/90 border border-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-sky-300">
                    Your Location
                  </div>
                </div>

                {/* Facility Destination Markers */}
                {HEALTHCARE_FACILITIES.map((fac) => {
                  const leftPct = (fac.coords.x / 900) * 100;
                  const topPct = (fac.coords.y / 500) * 100;
                  const isCurrent = fac.id === selectedFacilityId;

                  return (
                    <div
                      key={fac.id}
                      onClick={() => handleSelectFacility(fac)}
                      style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                    >
                      <div className={`p-2 rounded-xl text-base shadow-xl transition-all ${
                        isCurrent
                          ? 'bg-teal-400 text-slate-950 scale-125 border-2 border-white'
                          : fac.type === 'Emergency Facility'
                            ? 'bg-rose-600 text-white border border-rose-400'
                            : 'bg-slate-900 border border-slate-700 text-teal-400 group-hover:scale-110'
                      }`}>
                        {fac.type === 'Clinic' && '🏥'}
                        {fac.type === 'Hospital' && '🏨'}
                        {fac.type === 'Pharmacy' && '💊'}
                        {fac.type === 'Laboratory' && '🔬'}
                        {fac.type === 'Emergency Facility' && '🚑'}
                      </div>

                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-bold shadow ${
                        isCurrent
                          ? 'bg-teal-500 text-slate-950 border border-white'
                          : 'bg-slate-950/90 text-slate-200 border border-slate-800'
                      }`}>
                        {fac.name.split('(')[0]}
                      </div>
                    </div>
                  );
                })}

              </div>

              <div className="mt-2 text-right text-[10px] text-slate-500 font-mono">
                Click any facility icon on map or select from the left panel to update route and estimated travel time.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react'

function Windrhytm() {
  const [inputs, setInputs] = useState({
    cooldown: 0.6,
    bonus: 40,
    cdr: 0,
    castSpeed: 0,
    additionalCastSpeed: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  // Multiplier from CDR via Wind Rhythm Talent
  // Formula: 1 + (Wind Rhythm Bonus % * CDR %)
  const windRhythmMult = 1 + (inputs.bonus / 100 * (inputs.cdr / 100));
  
  // Multiplier from direct Cast Speed bonuses
  const castSpeedMult = 1 + ((inputs.castSpeed + inputs.additionalCastSpeed) / 100);
  
  // Raw calculation: Base Cooldown / WR Multiplier / Cast Speed Multiplier
  const rawCastTime = inputs.cooldown / windRhythmMult / castSpeedMult;
  
  // Server tick limit: 30Hz (0.03333s)
  const tick = 1 / 30;
  const serverCastTime = Math.ceil(rawCastTime / tick) * tick;
  const totalEffectiveCastSpeed = (windRhythmMult * castSpeedMult - 1) * 100;

  return (
    <div id="Wind-Rhythm" className="p-6 md:p-8 max-w-6xl mx-auto mt-10" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
      {/* Header */}
      <div className="mb-8 border-b-8 pb-4" style={{borderColor: '#1c1b1b', color: '#1c1b1b'}}>
        <h2 className="text-5xl font-bold uppercase tracking-tighter" style={{color: '#a93100'}}>WIND RHYTHM</h2>
        <p className="text-lg mt-3" style={{color: '#5c4037'}}>Advanced cast rate and frame-perfect rhythmic combat cycle analyzer</p>
      </div>

      {/* Main Grid: Inputs + Results */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* LEFT: Calculator Inputs */}
        <section className="md:col-span-4 flex flex-col gap-4">
          <div className="bg-white border-4 p-6" style={{borderColor: '#1c1b1b', boxShadow: '8px 8px 0px 0px rgba(28, 27, 27, 1)'}}>
            <div className="flex items-center justify-between mb-4 border-b-4 pb-2" style={{borderColor: '#1c1b1b', color: '#1c1b1b'}}>
              <h3 className="font-bold uppercase tracking-wide text-sm">CALC PARAMETERS</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-xs uppercase mb-2" style={{color: '#5c4037'}}>Base Cooldown (s)</label>
                <select 
                  name="cooldown"
                  value={inputs.cooldown}
                  onChange={handleInputChange}
                  className="w-full border-4 p-3 font-bold uppercase outline-none cursor-pointer"
                  style={{borderColor: '#1c1b1b', backgroundColor: '#f6f3f2', color: '#1c1b1b'}}
                >
                  <option value="0.5">0.5</option>
                  <option value="0.6">0.6</option>
                  <option value="0.7">0.7</option>
                  <option value="0.8">0.8</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-xs uppercase mb-2" style={{color: '#5c4037'}}>Wind Rhythm Bonus %</label>
                <input 
                  name="bonus" type="number" value={inputs.bonus} onChange={handleInputChange}
                  className="w-full border-4 p-3 font-bold outline-none"
                  style={{borderColor: '#1c1b1b', backgroundColor: '#f6f3f2', color: '#1c1b1b'}}
                />
              </div>
              <div>
                <label className="block font-bold text-xs uppercase mb-2" style={{color: '#5c4037'}}>Cooldown Rate %</label>
                <input 
                  name="cdr" type="number" value={inputs.cdr} onChange={handleInputChange}
                  className="w-full border-4 p-3 font-bold outline-none"
                  style={{borderColor: '#1c1b1b', backgroundColor: '#f6f3f2', color: '#1c1b1b'}}
                />
              </div>
              <div>
                <label className="block font-bold text-xs uppercase mb-2" style={{color: '#5c4037'}}>Cast Speed Bonus %</label>
                <input 
                  name="castSpeed" type="number" value={inputs.castSpeed} onChange={handleInputChange}
                  className="w-full border-4 p-3 font-bold outline-none"
                  style={{borderColor: '#1c1b1b', backgroundColor: '#f6f3f2', color: '#1c1b1b'}}
                />
              </div>
            </div>
          </div>

          {/* Result Box */}
          <div className="p-6 border-4" style={{backgroundColor: '#1c1b1b', borderColor: '#1c1b1b', boxShadow: '8px 8px 0px 0px #7000ff', color: '#fcf9f8'}}>
            <h3 className="font-bold text-xs uppercase mb-2" style={{color: '#00eefc'}}>CURRENT RESULT</h3>
            <div>
              <p className="text-xs uppercase opacity-70">Cast Rate ปัจจุบัน</p>
              <p className="text-4xl font-bold" style={{color: '#00eefc'}}>{serverCastTime.toFixed(5)}s</p>
              <p className="text-xs opacity-80 mt-1">Raw: {rawCastTime.toFixed(5)}s</p>
            </div>
          </div>
        </section>

        {/* RIGHT: Tables & Stats */}
        <section className="md:col-span-8 flex flex-col gap-4">
          {/* Effective Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border-4 p-4" style={{backgroundColor: '#d34000', borderColor: '#1c1b1b', color: '#fffbff', boxShadow: '4px 4px 0px 0px #1c1b1b'}}>
              <h4 className="font-bold text-xs uppercase mb-2">Effective Cast Speed</h4>
              <p className="text-3xl font-bold">{totalEffectiveCastSpeed.toFixed(1)}%</p>
            </div>
            <div className="border-4 p-4" style={{backgroundColor: '#f6f3f2', borderColor: '#1c1b1b'}}>
              <h4 className="font-bold text-xs uppercase mb-2" style={{color: '#1c1b1b'}}>Server Tick</h4>
              <p className="text-3xl font-bold" style={{color: '#a93100'}}>0.03333s</p>
            </div>
          </div>

          {/* Breakpoints Tables */}
          <div className="bg-white border-4 p-6" style={{borderColor: '#1c1b1b', boxShadow: '8px 8px 0px 0px rgba(28, 27, 27, 1)'}}>
            <h3 className="font-bold text-sm uppercase mb-4 border-b-4 pb-2" style={{borderColor: '#1c1b1b', color: '#1c1b1b'}}>ข้อมูล BREAKPOINTS ถัดไป</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CDR Table */}
              <div>
                <h4 className="font-bold text-xs uppercase mb-3 border-l-4 pl-2" style={{color: '#a93100', borderColor: '#a93100'}}>Cooldown Rate (%)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                    <thead className="border-b-2" style={{borderColor: '#1c1b1b', backgroundColor: '#f6f3f2'}}>
                      <tr style={{color: '#916f65'}}>
                        <th className="p-2 text-left font-bold">%</th>
                        <th className="p-2 text-left font-bold">Server (s)</th>
                        <th className="p-2 text-left opacity-60">Raw (s)</th>
                      </tr>
                    </thead>
                    <tbody style={{color: '#1c1b1b'}}>
                      <tr style={{backgroundColor: '#00eefc'}}>
                        <td className="p-2 font-bold">6</td>
                        <td className="p-2 font-bold">0.56667</td>
                        <td className="p-2 opacity-60">0.56604</td>
                      </tr>
                      <tr><td className="p-2">13</td><td className="p-2 font-bold">0.53333</td><td className="p-2 opacity-60">0.53097</td></tr>
                      <tr><td className="p-2">20</td><td className="p-2 font-bold">0.50000</td><td className="p-2 opacity-60">0.50000</td></tr>
                      <tr><td className="p-2">29</td><td className="p-2 font-bold">0.46667</td><td className="p-2 opacity-60">0.46512</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cast Speed Table */}
              <div>
                <h4 className="font-bold text-xs uppercase mb-3 border-l-4 pl-2" style={{color: '#7000ff', borderColor: '#7000ff'}}>Cast Speed Bonus (%)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                    <thead className="border-b-2" style={{borderColor: '#1c1b1b', backgroundColor: '#f6f3f2'}}>
                      <tr style={{color: '#916f65'}}>
                        <th className="p-2 text-left font-bold">%</th>
                        <th className="p-2 text-left font-bold">Server (s)</th>
                        <th className="p-2 text-left opacity-60">Raw (s)</th>
                      </tr>
                    </thead>
                    <tbody style={{color: '#1c1b1b'}}>
                      <tr style={{backgroundColor: '#00eefc'}}>
                        <td className="p-2 font-bold">15</td>
                        <td className="p-2 font-bold">0.56667</td>
                        <td className="p-2 opacity-60">0.56604</td>
                      </tr>
                      <tr><td className="p-2">32</td><td className="p-2 font-bold">0.53333</td><td className="p-2 opacity-60">0.53191</td></tr>
                      <tr><td className="p-2">50</td><td className="p-2 font-bold">0.50000</td><td className="p-2 opacity-60">0.50000</td></tr>
                      <tr><td className="p-2">72</td><td className="p-2 font-bold">0.46667</td><td className="p-2 opacity-60">0.46584</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Optimization Hint */}
      <div className="bg-white border-4 p-6" style={{borderColor: '#1c1b1b', boxShadow: '12px 12px 0px 0px #7000ff'}}>
        <div className="flex gap-4">
          <div className="text-4xl" style={{color: '#7000ff'}}>💡</div>
          <div>
            <h3 className="font-bold text-lg uppercase mb-2" style={{color: '#1c1b1b'}}>OPTIMIZATION HINT: SERVER TICKS</h3>
            <p style={{color: '#5c4037'}}>The game engine processes actions at 30 FPS intervals (0.03333s). If your <span className="font-bold" style={{color: '#a93100'}}>Raw Cast Speed</span> falls between two 0.033s increments, it rounds up to the next server tick. Target the <span className="font-bold" style={{color: '#006970'}}>Server (s)</span> values to avoid wasted stats.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Windrhytm
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
    <div id="Wind-Rhythm" className="p-8 max-w-4xl mx-auto bg-gray-50 rounded-xl shadow-md mt-10">
      <h5 className="text-2xl font-bold mb-6 text-gray-800">Wind Rhytm Cast Rate Calculator</h5>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">Base Cooldown (s)</label>
          <select 
            name="cooldown"
            value={inputs.cooldown}
            onChange={handleInputChange}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="0.5">0.5</option>
            <option value="0.6">0.6</option>
            <option value="0.7">0.7</option>
            <option value="0.8">0.8</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">Wind Rhytm Bonus (%)</label>
          <input 
            name="bonus" type="number" value={inputs.bonus} onChange={handleInputChange}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">Cooldown Rate (%)</label>
          <input 
            name="cdr" type="number" value={inputs.cdr} onChange={handleInputChange}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">Cast Speed Bonus (%)</label>
          <input 
            name="castSpeed" type="number" value={inputs.castSpeed} onChange={handleInputChange}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <span className="block text-lg font-bold mb-2">Current Cast Rate:</span>
        <p className="text-3xl font-bold text-blue-600 mb-2">
          {serverCastTime.toFixed(5)} s <span className="text-sm text-gray-400 font-normal">({rawCastTime.toFixed(5)} s raw)</span>
        </p>
        <div className="space-y-1 text-sm text-gray-500 border-t pt-4">
          <p>Effective Cast Speed: <span className="font-mono font-bold text-gray-700">{totalEffectiveCastSpeed.toFixed(2)}%</span></p>
          <p>Calculation: {inputs.cooldown} / (1 + ({inputs.bonus}% × {inputs.cdr}%)) / (1 + {inputs.castSpeed + inputs.additionalCastSpeed}%)</p>
          <p>Rounding: Value is rounded up to the next 0.03333s tick (30Hz).</p>
        </div>
      </div>

      <div id="breakpoints">
        <h6 className="text-xl font-bold mb-4">Breakpoints Guide</h6>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <span className="font-bold block mb-4 border-b pb-2">Cooldown Rate (%)</span>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-400"><th>CDR %</th><th>Server (s)</th><th>Raw (s)</th></tr>
              </thead>
              <tbody className="divide-y">
                <tr><td>6</td><td>0.56667</td><td>0.56604</td></tr>
                <tr><td>13</td><td>0.53333</td><td>0.53097</td></tr>
                <tr><td>20</td><td>0.50000</td><td>0.50000</td></tr>
                <tr><td>29</td><td>0.46667</td><td>0.46512</td></tr>
                <tr><td>39</td><td>0.43333</td><td>0.43165</td></tr>
                <tr><td>50</td><td>0.40000</td><td>0.40000</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <span className="font-bold block mb-4 border-b pb-2">Cast Speed Bonus (%)</span>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-400"><th>Cast %</th><th>Server (s)</th><th>Raw (s)</th></tr>
              </thead>
              <tbody className="divide-y">
                <tr><td>15</td><td>0.56667</td><td>0.56604</td></tr>
                <tr><td>32</td><td>0.53333</td><td>0.53191</td></tr>
                <tr><td>50</td><td>0.50000</td><td>0.50000</td></tr>
                <tr><td>72</td><td>0.46667</td><td>0.46584</td></tr>
                <tr><td>97</td><td>0.43333</td><td>0.43228</td></tr>
                <tr><td>125</td><td>0.40000</td><td>0.40000</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Windrhytm
import React from 'react'

function Windrhytm() {
  return (
    <div id="root"><main class="container"><div class="section" id="calculator"><h5>Wind Rhytm Cast Rate Calculator</h5><div class="inputs-container"><div class="input-row"><label>Wind Rhytm Cooldown (seconds):</label><select class="input-control"><option value="0.5">0.5</option><option value="0.6">0.6</option><option value="0.7">0.7</option><option value="0.8">0.8</option></select></div><div class="input-row"><label>Wind Rhytm bonus (%):</label><input class="input-control" min="40" max="100" step="1" type="number" value="40"></div><div class="input-row"><label>Cooldown Rate (%):</label><input class="input-control" min="0" max="999" step="0.01" type="number" value="0"></div><div class="input-row"><label>Cast speed bonus (%):</label><input class="input-control" min="0" max="999" step="0.01" type="number" value="0"></div><div class="input-row"><label>Additional cast speed bonus (%):</label><input class="input-control" min="0" max="999" step="0.01" type="number" value="0"></div></div><div class="card"><div class="card-content"><span class="card-title">Your current wind rhytm cast rate:</span><p>0.60000 s (0.60000 s)</p><p class="grey-text">Cast Speed: 0% (base) → 0% (final)</p><p class="grey-text">based on calc: 0.6 / (1 + (40% × 0%)) / (1 + 0%)</p><p class="grey-text">Tick rate: 30 Hz (tick = 0.03333 s). Value is limited up to the next tick.</p></div></div><div class="section" id="breakpoints"><h6>Your next breakpoints:</h6><div class="card"><div class="card-content"><span class="card-title">Breakpoints for Cooldown Rate (%)</span><table class="striped"><thead><tr><th>CDR %</th><th>Server cast time (s)</th><th>Raw cast time (s)</th></tr></thead><tbody><tr><td>6</td><td>0.56667</td><td>0.56604</td></tr><tr><td>13</td><td>0.53333</td><td>0.53097</td></tr><tr><td>20</td><td>0.50000</td><td>0.50000</td></tr><tr><td>29</td><td>0.46667</td><td>0.46512</td></tr><tr><td>39</td><td>0.43333</td><td>0.43165</td></tr><tr><td>50</td><td>0.40000</td><td>0.40000</td></tr><tr><td>64</td><td>0.36667</td><td>0.36585</td></tr><tr><td>80</td><td>0.33333</td><td>0.33333</td></tr><tr><td>100</td><td>0.30000</td><td>0.30000</td></tr></tbody></table></div></div><div class="card"><div class="card-content"><span class="card-title">Breakpoints for Cast speed bonus (%)</span><table class="striped"><thead><tr><th>Cast speed %</th><th>Server cast time (s)</th><th>Raw cast time (s)</th></tr></thead><tbody><tr><td>15</td><td>0.56667</td><td>0.56604</td></tr><tr><td>32</td><td>0.53333</td><td>0.53191</td></tr><tr><td>50</td><td>0.50000</td><td>0.50000</td></tr><tr><td>72</td><td>0.46667</td><td>0.46584</td></tr><tr><td>97</td><td>0.43333</td><td>0.43228</td></tr><tr><td>125</td><td>0.40000</td><td>0.40000</td></tr><tr><td>160</td><td>0.36667</td><td>0.36585</td></tr><tr><td>200</td><td>0.33333</td><td>0.33333</td></tr><tr><td>250</td><td>0.30000</td><td>0.30000</td></tr><tr><td>313</td><td>0.26667</td><td>0.26643</td></tr><tr><td>393</td><td>0.23333</td><td>0.23328</td></tr></tbody></table></div></div></div></div></main></div>
    <div id="Wind-Rhythm" className="p-8 max-w-4xl mx-auto bg-gray-50 rounded-xl shadow-md mt-10">
      <main className="container">
        <div className="section" id="calculator">
          <h5 className="text-2xl font-bold mb-6 text-gray-800">Wind Rhytm Cast Rate Calculator</h5>
          <div className="inputs-container grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="input-row flex flex-col">
              <label className="text-sm font-medium text-gray-600">Wind Rhytm Cooldown (seconds):</label>
              <select className="input-control border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="0.5">0.5</option>
                <option value="0.6">0.6</option>
                <option value="0.7">0.7</option>
                <option value="0.8">0.8</option>
              </select>
            </div>
            <div className="input-row flex flex-col">
              <label className="text-sm font-medium text-gray-600">Wind Rhytm bonus (%):</label>
              <input className="input-control border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" min="40" max="100" step="1" type="number" defaultValue="40" />
            </div>
            <div className="input-row flex flex-col">
              <label className="text-sm font-medium text-gray-600">Cooldown Rate (%):</label>
              <input className="input-control border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" min="0" max="999" step="0.01" type="number" defaultValue="0" />
            </div>
            <div className="input-row flex flex-col">
              <label className="text-sm font-medium text-gray-600">Cast speed bonus (%):</label>
              <input className="input-control border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" min="0" max="999" step="0.01" type="number" defaultValue="0" />
            </div>
            <div className="input-row flex flex-col">
              <label className="text-sm font-medium text-gray-600">Additional cast speed bonus (%):</label>
              <input className="input-control border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" min="0" max="999" step="0.01" type="number" defaultValue="0" />
            </div>
          </div>
          <div className="card bg-white p-6 rounded-lg border border-gray-200 mb-8">
            <div className="card-content">
              <span className="card-title block text-lg font-bold mb-2">Your current wind rhytm cast rate:</span>
              <p className="text-xl font-bold text-blue-600 mb-4">0.60000 s (0.60000 s)</p>
              <p className="text-gray-500 text-sm">Cast Speed: 0% (base) → 0% (final)</p>
              <p className="text-gray-500 text-sm">based on calc: 0.6 / (1 + (40% × 0%)) / (1 + 0%)</p>
              <p className="text-gray-500 text-sm">Tick rate: 30 Hz (tick = 0.03333 s). Value is limited up to the next tick.</p>
            </div>
          </div>
          <div className="section" id="breakpoints">
            <h6 className="text-xl font-bold mb-4">Your next breakpoints:</h6>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card bg-white p-4 rounded-lg border border-gray-200">
                <div className="card-content">
                  <span className="card-title font-bold block mb-4">Breakpoints for Cooldown Rate (%)</span>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2">CDR %</th>
                        <th className="py-2">Server cast time (s)</th>
                        <th className="py-2">Raw cast time (s)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td>6</td><td>0.56667</td><td>0.56604</td></tr>
                      <tr className="border-b"><td>13</td><td>0.53333</td><td>0.53097</td></tr>
                      <tr className="border-b"><td>20</td><td>0.50000</td><td>0.50000</td></tr>
                      <tr className="border-b"><td>29</td><td>0.46667</td><td>0.46512</td></tr>
                      <tr className="border-b"><td>39</td><td>0.43333</td><td>0.43165</td></tr>
                      <tr className="border-b"><td>50</td><td>0.40000</td><td>0.40000</td></tr>
                      <tr className="border-b"><td>64</td><td>0.36667</td><td>0.36585</td></tr>
                      <tr className="border-b"><td>80</td><td>0.33333</td><td>0.33333</td></tr>
                      <tr className="border-b"><td>100</td><td>0.30000</td><td>0.30000</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card bg-white p-4 rounded-lg border border-gray-200">
                <div className="card-content">
                  <span className="card-title font-bold block mb-4">Breakpoints for Cast speed bonus (%)</span>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2">Cast speed %</th>
                        <th className="py-2">Server cast time (s)</th>
                        <th className="py-2">Raw cast time (s)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td>15</td><td>0.56667</td><td>0.56604</td></tr>
                      <tr className="border-b"><td>32</td><td>0.53333</td><td>0.53191</td></tr>
                      <tr className="border-b"><td>50</td><td>0.50000</td><td>0.50000</td></tr>
                      <tr className="border-b"><td>72</td><td>0.46667</td><td>0.46584</td></tr>
                      <tr className="border-b"><td>97</td><td>0.43333</td><td>0.43228</td></tr>
                      <tr className="border-b"><td>125</td><td>0.40000</td><td>0.40000</td></tr>
                      <tr className="border-b"><td>160</td><td>0.36667</td><td>0.36585</td></tr>
                      <tr className="border-b"><td>200</td><td>0.33333</td><td>0.33333</td></tr>
                      <tr className="border-b"><td>250</td><td>0.30000</td><td>0.30000</td></tr>
                      <tr className="border-b"><td>313</td><td>0.26667</td><td>0.26643</td></tr>
                      <tr className="border-b"><td>393</td><td>0.23333</td><td>0.23328</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Windrhytm
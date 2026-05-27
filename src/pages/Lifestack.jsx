import React, { useState } from 'react'

function Lifestack() {
  // State to hold all input values
  const [inputs, setInputs] = useState({
    life: 0,
    lifeCost: 0,
    attackSpeed: 0,
    recently: 4,
    lifePerStack: 0,
    maxStacks: 0,
    minDamage: 0,
    maxDamage: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  // Calculations derived directly from state
  const lifeEach = inputs.life * (inputs.lifeCost / 100);
  const lifeRecent = lifeEach * inputs.attackSpeed * inputs.recently;
  const rawStacks = inputs.lifePerStack > 0 ? lifeRecent / inputs.lifePerStack : 0;
  const stacks = Math.min(rawStacks, inputs.maxStacks);
  const stackRatio = inputs.maxStacks > 0 ? stacks / inputs.maxStacks : 0;
  const requiredLife = inputs.lifePerStack * inputs.maxStacks;
  const neededAspd = (lifeEach * inputs.recently) > 0 ? requiredLife / (lifeEach * inputs.recently) : 0;
  const neededPercent = inputs.attackSpeed > 0 ? Math.max(0, (neededAspd / inputs.attackSpeed - 1) * 100) : 0;
  const totalMin = stacks * inputs.minDamage;
  const totalMax = stacks * inputs.maxDamage;
  const totalAvg = (totalMin + totalMax) / 2;

  const numberFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
  const fmt = (num) => numberFormat.format(num);

  return (
    <div id="LifeStack" className="p-6 md:p-8 max-w-6xl mx-auto mt-10" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
      {/* Header */}
      <div className="mb-8 border-b-8 pb-4" style={{borderColor: '#1c1b1b', color: '#1c1b1b'}}>
        <h2 className="text-5xl font-bold uppercase tracking-tighter" style={{color: '#a93100'}}>LIFE STACK</h2>
        <p className="text-lg mt-3" style={{color: '#5c4037'}}>Calculate stacks and physical damage from life consumption mechanics</p>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* Inputs Section */}
        <section className="md:col-span-5 bg-white border-4 p-6" style={{borderColor: '#1c1b1b', boxShadow: '8px 8px 0px 0px rgba(28, 27, 27, 1)'}}>
          <div className="flex items-center justify-between mb-4 border-b-4 pb-2" style={{borderColor: '#1c1b1b', color: '#1c1b1b'}}>
            <h3 className="font-bold uppercase tracking-wide text-sm">INPUT PARAMETERS</h3>
          </div>
          <div className="space-y-4">
            {Object.keys(inputs).map((key) => (
              <div key={key}>
                <label className="block font-bold text-xs uppercase mb-2" style={{color: '#5c4037'}}>
                  {key === 'life' ? 'Max Life ที่เรามี' :
                   key === 'lifeCost' ? 'ใช้เลือดต่อสกิล(%)' : 
                   key === 'attackSpeed' ? 'Attack Speed/วินาที' : 
                   key === 'recently' ? 'Recently (วินาที)' :
                   key === 'lifePerStack' ? 'Consume/Stack' :
                   key === 'maxStacks' ? 'Max Stacks' :
                   key === 'minDamage' ? 'Min Damage' :
                   key === 'maxDamage' ? 'Max Damage' :
                   key.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="number"
                  name={key}
                  value={inputs[key]}
                  onChange={handleInputChange}
                  className="w-full border-4 p-3 font-bold outline-none"
                  style={{borderColor: '#1c1b1b', backgroundColor: '#f6f3f2', color: '#1c1b1b'}}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Stats Cards */}
        <section className="md:col-span-7 flex flex-col gap-4">
          {/* Top Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border-4 p-4" style={{backgroundColor: '#d34000', borderColor: '#1c1b1b', color: '#fffbff', boxShadow: '4px 4px 0px 0px #1c1b1b'}}>
              <p className="font-bold text-xs uppercase mb-1 opacity-80">Stacks</p>
              <p className="text-3xl font-bold">{fmt(stacks)}</p>
              <p className="text-xs opacity-70">/ {fmt(inputs.maxStacks)}</p>
            </div>
            <div className="border-4 p-4" style={{backgroundColor: '#f6f3f2', borderColor: '#1c1b1b'}}>
              <p className="font-bold text-xs uppercase mb-1" style={{color: '#1c1b1b'}}>Stack Ratio</p>
              <p className="text-3xl font-bold" style={{color: '#a93100'}}>{(stackRatio * 100).toFixed(1)}%</p>
            </div>
          </div>

          {/* Core Stats */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="bg-white border-4 p-3 text-center" style={{borderColor: '#1c1b1b'}}>
              <p className="font-bold text-xs uppercase" style={{color: '#5c4037'}}>Life/Cast</p>
              <p className="text-2xl font-bold" style={{color: '#1c1b1b'}}>{fmt(lifeEach)}</p>
            </div>
            <div className="bg-white border-4 p-3 text-center" style={{borderColor: '#1c1b1b'}}>
              <p className="font-bold text-xs uppercase" style={{color: '#5c4037'}}>Life Recently</p>
              <p className="text-2xl font-bold" style={{color: '#1c1b1b'}}>{fmt(lifeRecent)}</p>
            </div>
          </div>

          {/* Attack Speed Needed */}
          <div className="bg-white border-4 p-4" style={{borderColor: '#1c1b1b', boxShadow: '4px 4px 0px 0px rgba(28, 27, 27, 1)'}}>
            <p className="font-bold text-xs uppercase mb-2" style={{color: '#5c4037'}}>Attack Speed Needed</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm" style={{color: '#5c4037'}}>Additional ASPD</p>
                <p className="text-2xl font-bold" style={{color: '#a93100'}}>{fmt(neededAspd)}/s</p>
              </div>
              <div className="text-right">
                <p className="text-sm" style={{color: '#5c4037'}}>Percent Increase</p>
                <p className="text-2xl font-bold" style={{color: neededPercent <= 0 ? '#006970' : '#a93100'}}>
                  {neededPercent <= 0 ? "OK" : `+${fmt(neededPercent)}%`}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Stack Progress */}
      <div className="bg-white border-4 p-6 mb-8" style={{borderColor: '#1c1b1b', boxShadow: '8px 8px 0px 0px rgba(28, 27, 27, 1)'}}>
        <h3 className="font-bold text-sm uppercase mb-4" style={{color: '#1c1b1b'}}>Stack Progression</h3>
        <div className="w-full border-2 bg-white overflow-hidden" style={{borderColor: '#e6beb2', height: '40px'}}>
          <div 
            className="h-full transition-all duration-500 flex items-center justify-end pr-3"
            style={{
              width: `${Math.max(0, Math.min(100, stackRatio * 100))}%`,
              backgroundColor: rawStacks >= inputs.maxStacks ? '#006970' : '#7000ff'
            }}
          >
            <span className="font-bold text-xs text-white">{(stackRatio * 100).toFixed(0)}%</span>
          </div>
        </div>
        <p className="mt-3 text-sm font-bold" style={{color: rawStacks >= inputs.maxStacks ? '#006970' : '#a93100'}}>
          {rawStacks >= inputs.maxStacks ? "✓ Max Stacks Reached" : `↑ Need ${fmt(inputs.maxStacks - stacks)} more stacks`}
        </p>
      </div>

      {/* Damage Output */}
      <section className="mb-8">
        <h3 className="font-bold text-sm uppercase mb-4 pb-3 border-b-4" style={{borderColor: '#1c1b1b', color: '#1c1b1b'}}>Physical Damage Output</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border-4 p-6 text-center" style={{borderColor: '#1c1b1b', boxShadow: '4px 4px 0px 0px #1c1b1b'}}>
            <p className="font-bold text-xs uppercase mb-2" style={{color: '#5c4037'}}>Minimum</p>
            <p className="text-4xl font-bold" style={{color: '#1c1b1b'}}>{fmt(totalMin)}</p>
          </div>
          <div className="bg-white border-4 p-6 text-center" style={{borderColor: '#1c1b1b', boxShadow: '4px 4px 0px 0px #1c1b1b'}}>
            <p className="font-bold text-xs uppercase mb-2" style={{color: '#5c4037'}}>Average</p>
            <p className="text-4xl font-bold" style={{color: '#a93100'}}>{fmt(totalAvg)}</p>
          </div>
          <div className="bg-white border-4 p-6 text-center" style={{borderColor: '#1c1b1b', boxShadow: '4px 4px 0px 0px #1c1b1b'}}>
            <p className="font-bold text-xs uppercase mb-2" style={{color: '#5c4037'}}>Maximum</p>
            <p className="text-4xl font-bold" style={{color: '#006970'}}>{fmt(totalMax)}</p>
          </div>
        </div>
      </section>

      {/* Note */}
      <div className="bg-white border-4 p-6" style={{borderColor: '#1c1b1b', boxShadow: '12px 12px 0px 0px #7000ff'}}>
        <div className="flex gap-4">
          <div className="text-3xl" style={{color: '#7000ff'}}>ℹ️</div>
          <div>
            <h4 className="font-bold text-sm uppercase mb-2" style={{color: '#1c1b1b'}}>Important Note</h4>
            <p className="text-sm" style={{color: '#5c4037'}}>If your health drops during combat, the actual stack value will be lower since damage calculation uses <span className="font-bold" style={{color: '#a93100'}}>current life</span> instead of max life.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lifestack
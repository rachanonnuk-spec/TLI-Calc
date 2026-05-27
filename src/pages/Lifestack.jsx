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
    <div id="LifeStack" className="p-8 max-w-4xl mx-auto bg-gray-50 rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Life Stack Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {Object.keys(inputs).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 capitalize">
              {key === 'life' ? 'Max Life ที่เรามี' :
               key === 'lifeCost' ? 'ใช้เลือดต่อสกิล(%)' : 
               key === 'attackSpeed' ? 'Attack Speed/วินาที' : 
               key === 'recently' ? 'Recently (ใส่เลข 4 เพราะ Recently = 4 วินาที)' :
               key === 'lifePerStack' ? 'Consume Life ต่อ 1 Stack' :
               key === 'minDamage' ? "Added Min Damage (จากถุงมือ Blade Dancer's Finger)" :
               key === 'maxDamage' ? "Added Max Damage (จากถุงมือ Blade Dancer's Finger)" :
               key.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type="number"
              name={key}
              value={inputs[key]}
              onChange={handleInputChange}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-gray-500 text-sm">Life Consume ต่อครั้ง</p>
            <p className="text-lg font-bold">{fmt(lifeEach)}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Life Consume Recently</p>
            <p className="text-lg font-bold">{fmt(lifeRecent)}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Stacks</p>
            <p className="text-lg font-bold">{fmt(stacks)} / {fmt(inputs.maxStacks)}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Attack speed ที่ต้องการอีก</p>
            <p className="text-lg font-bold">{fmt(neededAspd)} /s</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">ต้องการAttack Speed อีก (%)</p>
            <p className="text-lg font-bold text-blue-600">
              {neededPercent <= 0 ? "พอแล้ว" : `+${fmt(neededPercent)}%`}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Avg Damage</p>
            <p className="text-lg font-bold text-green-600">{fmt(totalAvg)}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${rawStacks >= inputs.maxStacks ? 'bg-green-500' : 'bg-amber-500'}`}
              style={{ width: `${Math.max(0, Math.min(100, stackRatio * 100))}%` }}
            ></div>
          </div>
          <p className={`mt-2 text-sm font-bold ${rawStacks >= inputs.maxStacks ? 'text-green-600' : 'text-amber-600'}`}>
            {rawStacks >= inputs.maxStacks ? "เต็มสแต็กแล้ว" : `ยังไม่เต็ม ขาดอีก ${fmt(inputs.maxStacks - stacks)} stacks`}
          </p>
        </div>
      </div>

      <section className="mt-10 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Added Physical Damage จากสแต็ก</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm text-center">
            <span className="block text-gray-500 text-sm mb-1">ต่ำสุด</span>
            <strong className="text-2xl text-gray-800">{fmt(totalMin)}</strong>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm text-center">
            <span className="block text-gray-500 text-sm mb-1">สูงสุด</span>
            <strong className="text-2xl text-gray-800">{fmt(totalMax)}</strong>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm text-center">
            <span className="block text-gray-500 text-sm mb-1">เฉลี่ย</span>
            <strong className="text-2xl text-blue-600">{fmt(totalAvg)}</strong>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-400 italic text-center">หมายเหตุ: ถ้าเลือดไม่ได้เต็มตลอด ค่า stack จริงจะต่ำลง เพราะไอเทมคิดจาก current life ตอนใช้สกิล</p>
      </section>
    </div>
  )
}

export default Lifestack
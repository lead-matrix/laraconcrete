import React, { useState } from 'react';
import {
  Calculator,
  Plus,
  Trash2,
  ShieldCheck,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Printer
} from 'lucide-react';
import { useTenant } from '../core/tenantContext';
import type { EstimateLineItem } from '../core/types';

export const EstimatorModule: React.FC = () => {
  const { currentTenant } = useTenant();

  const [estimateNumber, setEstimateNumber] = useState('EST-1049');
  const [customerName, setCustomerName] = useState('Robert Vance (Vance Logistics)');
  const [customerEmail, setCustomerEmail] = useState('rvance@vancecold.com');
  const [projectTitle, setProjectTitle] = useState('4,500 SQ FT Commercial Foundation Slab');
  const [depositPct, setDepositPct] = useState(30);

  // Profit Margin Protection Sliders
  const [overheadPct, setOverheadPct] = useState(15); // 15% overhead
  const [targetMarginPct, setTargetMarginPct] = useState(38); // 38% target gross margin

  // Line Items State
  const [lineItems, setLineItems] = useState<EstimateLineItem[]>([
    {
      id: 'item-1',
      description: '4,000 PSI High-Strength Ready Mix Concrete',
      category: 'Materials',
      quantity: 65,
      unit: 'cu yd',
      unitCost: 165,
      totalCost: 10725
    },
    {
      id: 'item-2',
      description: '#4 Grade 60 Rebar Grid (18" O.C.)',
      category: 'Materials',
      quantity: 4500,
      unit: 'sq ft',
      unitCost: 1.25,
      totalCost: 5625
    },
    {
      id: 'item-3',
      description: 'Senior Finishing Crew & Pour Operation',
      category: 'Labor',
      quantity: 48,
      unit: 'hours',
      unitCost: 85,
      totalCost: 4080
    },
    {
      id: 'item-4',
      description: 'Heavy Equipment Pump Truck & Excavator Rental',
      category: 'Equipment',
      quantity: 2,
      unit: 'flat rate',
      unitCost: 1850,
      totalCost: 3700
    }
  ]);

  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<EstimateLineItem['category']>('Materials');
  const [newItemQty, setNewItemQty] = useState(100);
  const [newItemUnit, setNewItemUnit] = useState<EstimateLineItem['unit']>('sq ft');
  const [newItemUnitCost, setNewItemUnitCost] = useState(2.5);

  const handleAddItem = () => {
    if (!newItemDesc) return;
    const newItem: EstimateLineItem = {
      id: `item-${Date.now()}`,
      description: newItemDesc,
      category: newItemCategory,
      quantity: newItemQty,
      unit: newItemUnit,
      unitCost: newItemUnitCost,
      totalCost: newItemQty * newItemUnitCost
    };
    setLineItems([...lineItems, newItem]);
    setNewItemDesc('');
  };

  const removeItem = (id: string) => {
    setLineItems(lineItems.filter((i) => i.id !== id));
  };

  // Calculations
  const directCostTotal = lineItems.reduce((acc, item) => acc + item.totalCost, 0);
  const overheadMultiplier = 1 + overheadPct / 100;
  const costWithOverhead = directCostTotal * overheadMultiplier;

  // Formula: Price = CostWithOverhead / (1 - (TargetMargin % / 100))
  const marginDecimal = targetMarginPct / 100;
  const calculatedPrice = marginDecimal < 1 ? costWithOverhead / (1 - marginDecimal) : costWithOverhead;
  const netProfitDollars = calculatedPrice - costWithOverhead;
  const depositDollars = calculatedPrice * (depositPct / 100);

  const isMarginBelowLock = targetMarginPct < 30;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
            <Calculator className="w-4 h-4" />
            <span>Smart Estimator Engine • {currentTenant.name}</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Direct-Cost & Profit Margin Estimator
          </h1>
          <p className="text-xs text-slate-400">
            Eliminate underpriced bids with real-time direct costing, overhead multipliers, and margin lock safeguards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="btn-cos-secondary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-blue-400" />
            <span>Export Proposal PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Line Items & Live Financial Guard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Project Info & Line Item Builder */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Details Box */}
          <div className="p-6 rounded-2xl bg-[#0f172a] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" /> Estimate Metadata
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  Estimate #
                </label>
                <input
                  type="text"
                  value={estimateNumber}
                  onChange={(e) => setEstimateNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  Customer Email
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="p-6 rounded-2xl bg-[#0f172a] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-400" /> Direct Line Item Costs
              </h3>
              <span className="text-xs font-mono text-emerald-400">
                Direct Total: ${directCostTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono text-[10px] uppercase">
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3 text-right">Qty</th>
                    <th className="py-2.5 px-3 text-right">Unit Cost</th>
                    <th className="py-2.5 px-3 text-right">Total Cost</th>
                    <th className="py-2.5 px-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {lineItems.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3 font-medium">{item.description}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-slate-300">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="py-3 px-3 text-right font-mono">
                        ${item.unitCost.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-white">
                        ${item.totalCost.toFixed(2)}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add New Line Item Form */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="text-[11px] font-semibold text-slate-300">Add Line Item</div>
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-2">
                <input
                  type="text"
                  placeholder="Item description..."
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="sm:col-span-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none"
                />
                <select
                  value={newItemCategory}
                  onChange={(e) =>
                    setNewItemCategory(e.target.value as EstimateLineItem['category'])
                  }
                  className="px-2 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none"
                >
                  <option value="Materials">Materials</option>
                  <option value="Labor">Labor</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Subcontractor">Subcontractor</option>
                </select>
                <select
                  value={newItemUnit}
                  onChange={(e) =>
                    setNewItemUnit(e.target.value as EstimateLineItem['unit'])
                  }
                  className="px-2 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none"
                >
                  <option value="sq ft">sq ft</option>
                  <option value="cu yd">cu yd</option>
                  <option value="linear ft">linear ft</option>
                  <option value="hours">hours</option>
                  <option value="flat rate">flat rate</option>
                </select>
                <input
                  type="number"
                  placeholder="Qty"
                  value={newItemQty}
                  onChange={(e) => setNewItemQty(Number(e.target.value))}
                  className="px-2 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white text-right focus:outline-none font-mono"
                />
                <input
                  type="number"
                  placeholder="Unit Cost $"
                  value={newItemUnitCost}
                  onChange={(e) => setNewItemUnitCost(Number(e.target.value))}
                  className="px-2 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white text-right focus:outline-none font-mono"
                />
                <button
                  onClick={handleAddItem}
                  className="btn-cos-primary py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Margin Safeguard Controls & Live Quote Calculation */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#0f172a] border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" /> Margin Protection Safeguards
              </h3>
            </div>

            {/* Overhead Multiplier Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Overhead Allowance</span>
                <span className="font-mono text-blue-400 font-bold">{overheadPct}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={overheadPct}
                onChange={(e) => setOverheadPct(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500">Covers insurance, yard rent, fuel, and fleet wear.</p>
            </div>

            {/* Target Profit Margin Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Target Profit Margin</span>
                <span
                  className={`font-mono font-bold ${
                    isMarginBelowLock ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {targetMarginPct}%
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="55"
                value={targetMarginPct}
                onChange={(e) => setTargetMarginPct(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />

              {isMarginBelowLock && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Warning: Margin is below recommended 30.0% floor.</span>
                </div>
              )}
            </div>

            {/* Deposit Required Pct */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Deposit Required</span>
                <span className="font-mono text-indigo-300 font-bold">{depositPct}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={depositPct}
                onChange={(e) => setDepositPct(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Live Financial Breakdown Summary */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Direct Costs:</span>
                <span>${directCostTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Cost w/ Overhead ({overheadPct}%):</span>
                <span>${costWithOverhead.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Net Gross Margin Dollars:</span>
                <span>+${netProfitDollars.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm font-sans">
                <span className="font-bold text-white">Final Client Quote:</span>
                <span className="font-mono text-xl font-extrabold text-blue-400">
                  ${calculatedPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="pt-2 flex justify-between items-center text-[11px] text-indigo-300">
                <span>Initial Deposit Due ({depositPct}%):</span>
                <span className="font-bold">
                  ${depositDollars.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <button
              onClick={() => alert(`Estimate ${estimateNumber} saved & locked successfully!`)}
              className="w-full btn-cos-primary py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Save & Lock Estimate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

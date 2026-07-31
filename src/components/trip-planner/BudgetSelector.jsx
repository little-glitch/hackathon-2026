import React from 'react';
import { DollarSign, Wallet } from 'lucide-react';

export default function BudgetSelector({ formData, onBudgetTypeChange, onCurrencyChange, onAmountChange }) {
  const budgetTypes = [
    { id: 'Budget', label: 'Budget', desc: 'Backpacker & essential travel' },
    { id: 'Standard', label: 'Standard', desc: 'Balanced comfort & value' },
    { id: 'Luxury', label: 'Luxury', desc: 'Premium stays & private transit' }
  ];

  const currencies = [
    { code: 'INR', symbol: '₹', label: 'INR (₹)' },
    { code: 'USD', symbol: '$', label: 'USD ($)' },
    { code: 'EUR', symbol: '€', label: 'EUR (€)' },
    { code: 'GBP', symbol: '£', label: 'GBP (£)' },
    { code: 'JPY', symbol: '¥', label: 'JPY (¥)' }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 border-b border-black/5 pb-4">
        <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
          <Wallet className="w-4 h-4 text-[#1D2B26]" />
          <span>Section 3 • Budget & Currency</span>
        </div>
        <h2 className="text-2xl font-bold text-[#222926] font-heading">
          Trip Budget Configuration
        </h2>
      </div>

      {/* Budget Type Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {budgetTypes.map((b) => (
          <div
            key={b.id}
            onClick={() => onBudgetTypeChange(b.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
              formData.budgetType === b.id
                ? 'bg-[#1D2B26] text-white border-[#1D2B26] shadow-md'
                : 'bg-slate-50 text-[#222926] border-black/10 hover:border-black/30'
            }`}
          >
            <span className="text-xs font-extrabold uppercase tracking-wider">
              {b.label}
            </span>
            <span className={`text-[11px] font-normal ${
              formData.budgetType === b.id ? 'text-white/80' : 'text-[#666C68]'
            }`}>
              {b.desc}
            </span>
          </div>
        ))}
      </div>

      {/* Currency & Amount Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        {/* Currency Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
            Currency (Default INR)
          </label>
          <select
            value={formData.currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-bold text-[#222926] focus:outline-none focus:border-[#1D2B26]"
          >
            {currencies.map(c => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Budget Amount */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
            Estimated Budget Amount ({formData.currency})
          </label>
          <div className="relative">
            <DollarSign className="w-4 h-4 text-[#666C68] absolute left-4 top-3.5" />
            <input
              type="number"
              min="0"
              step="500"
              name="budgetAmount"
              value={formData.budgetAmount}
              onChange={onAmountChange}
              placeholder="e.g. 25000"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

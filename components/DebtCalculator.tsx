
import React, { useState } from 'react';
import { Typography } from './Typography.tsx';
import { Button } from './Button.tsx';
import { Calculator, AlertTriangle, CheckCircle } from 'lucide-react';

export const DebtCalculator: React.FC = () => {
  const [income, setIncome] = useState<string>('');
  const [debts, setDebts] = useState<string>('');
  const [expenses, setExpenses] = useState<string>('');
  const [result, setResult] = useState<'normal' | 'risk' | 'critical' | null>(null);

  const calculate = () => {
    const inc = parseFloat(income);
    const dbt = parseFloat(debts);
    const exp = parseFloat(expenses);
    if (isNaN(inc) || isNaN(dbt) || isNaN(exp)) return;

    const disposable = inc - exp;
    const debtRatio = dbt / inc;

    if (disposable < inc * 0.3 || debtRatio > 0.5) setResult('critical');
    else if (debtRatio > 0.3) setResult('risk');
    else setResult('normal');
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-brand-secondary/20 rounded-xl flex items-center justify-center text-brand-secondary">
          <Calculator size={24} />
        </div>
        <Typography variant="h4" font="serif" className="text-brand-primary">Simulador de Mínimo Existencial</Typography>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Renda Mensal (R$)</label>
          <input type="number" className="w-full bg-slate-50 border-none rounded-xl p-4 outline-none" value={income} onChange={e => setIncome(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Total de Dívidas (R$)</label>
          <input type="number" className="w-full bg-slate-50 border-none rounded-xl p-4 outline-none" value={debts} onChange={e => setDebts(e.target.value)} />
        </div>
        <Button variant="secondary" fullWidth size="lg" onClick={calculate}>Analisar Caso</Button>
      </div>

      {result && (
        <div className={`mt-8 p-6 rounded-2xl ${result === 'critical' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          <Typography variant="small" className="font-bold">{result === 'critical' ? 'Alerta Crítico' : 'Situação Estável'}</Typography>
        </div>
      )}
    </div>
  );
};

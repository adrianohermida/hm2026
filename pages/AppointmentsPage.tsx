
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  ChevronRight, 
  User as UserIcon, 
  Loader2,
  ChevronLeft,
  Filter,
  Info,
  MessageSquare,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Container } from '../components/atoms/Container.tsx';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';
import { AppointmentsSkeleton, AppointmentsLabels } from '../modules/appointments/appointments-skeleton.tsx';
import { AppointmentsRouter } from '../modules/appointments/appointments-router.ts';
import { Footer } from '../components/organisms/Footer.tsx';
import { Profissional, Slot } from '../types.ts';

export const AppointmentsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  const [selectedProf, setSelectedProf] = useState<Profissional | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
    // HM-V12: Busca profissionais mas auto-seleciona o Dr. Adriano (ID 1 no mock)
    AppointmentsRouter.fetchProfessionals().then(data => {
      const adriano = data.find(p => p.id === '1') || data[0];
      setSelectedProf(adriano);
    });
  }, []);

  useEffect(() => {
    if (selectedDate && selectedProf) {
      setLoading(true);
      AppointmentsRouter.fetchSlots(selectedDate, selectedProf.id).then(data => {
        setAvailableSlots(data);
        setLoading(false);
      });
    }
  }, [selectedDate, selectedProf]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await AppointmentsRouter.submitAppointment({
        ...form,
        date: selectedDate,
        time: selectedSlot?.hora_inicio,
        profId: selectedProf?.id
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert("Ocorreu um erro ao processar seu agendamento.");
    } finally {
      setProcessing(false);
    }
  };

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    const firstDay = date.getDay();
    for (let i = 0; i < firstDay; i++) days.push(null);
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentMonth]);

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#05080F] text-white flex flex-col">
        <div className="flex-1 flex items-center justify-center p-6">
          <Container className="max-w-2xl text-center space-y-12 animate-in fade-in zoom-in duration-1000">
            <div className="w-24 h-24 bg-emerald-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="text-emerald-500" size={48} />
            </div>
            <div className="space-y-4">
              <Typography variant="h2" font="serif" className="text-4xl font-extrabold">{AppointmentsLabels.success.title}</Typography>
              <Typography variant="body" className="text-white/60 text-lg leading-relaxed">
                Obrigado por confiar na Hermida Maia Advocacia. Sua consulta para o dia <strong>{new Date(selectedDate).toLocaleDateString('pt-BR')}</strong> às <strong>{selectedSlot?.hora_inicio}</strong> foi pré-agendada. Nossa equipe entrará em contato em breve via WhatsApp.
              </Typography>
            </div>
            <Button variant="secondary" size="lg" onClick={onBack} icon={<ArrowLeft size={20}/>} className="h-16 px-12 rounded-2xl shadow-xl">
              Voltar para Início
            </Button>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-secondary/30 flex flex-col">
      <section className="pt-40 pb-32 relative overflow-hidden bg-[#05080F] flex-1">
        {/* Atmosfera visual suave */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[150px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[150px] -ml-32 -mb-32" />

        <Container className="relative z-10 grid lg:grid-cols-12 gap-20 items-start">
          
          {/* LADO ESQUERDO: CONTEXTO */}
          <div className="lg:col-span-5 space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-brand-secondary/10 border border-brand-secondary/20 px-6 py-2 rounded-full">
                <CalendarIcon size={16} className="text-brand-secondary" />
                <Typography variant="caption" className="text-brand-secondary font-black tracking-widest">{AppointmentsLabels.hero.badge}</Typography>
              </div>
              <Typography variant="h1" font="serif" className="text-white text-4xl md:text-7xl leading-[1.1] tracking-tight">
                {AppointmentsLabels.hero.title.split(' Especialista')[0]} <span className="text-brand-secondary italic">Dr. Adriano</span>
              </Typography>
              <Typography variant="body" className="text-white/40 text-xl leading-relaxed font-light">
                Agende agora uma análise estratégica com o Dr. Adriano Hermida Maia para tratar superendividamento ou revisão de juros abusivos.
              </Typography>
            </div>

            <div className="space-y-8">
              {AppointmentsLabels.benefits.map((item, i) => (
                <div key={i} className="flex gap-6 group transition-all">
                  <div className="bg-white/5 p-4 rounded-2xl h-fit border border-white/5 group-hover:border-brand-secondary/40 transition-all shadow-inner">
                    {React.cloneElement(item.icon as React.ReactElement<any>, { className: "text-brand-secondary" })}
                  </div>
                  <div>
                    <Typography variant="small" className="font-black text-white uppercase text-[11px] mb-1 tracking-widest">{item.title}</Typography>
                    <Typography variant="caption" className="text-white/30 text-sm normal-case font-medium">{item.desc}</Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LADO DIREITO: ORQUESTRADOR DE AGENDAMENTO */}
          <div className="lg:col-span-7 bg-white/[0.03] backdrop-blur-3xl p-10 md:p-14 rounded-[4rem] border border-white/10 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-1000">
            
            {/* Progress Bar HM-V12 */}
            <div className="flex items-center gap-6 mb-16 px-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all border-2 ${step >= 1 ? "bg-brand-secondary text-brand-primary border-brand-secondary" : "bg-white/5 text-white/40 border-white/5"}`}>1</div>
              <div className={`h-1 flex-1 rounded-full transition-all duration-700 ${step >= 2 ? "bg-brand-secondary shadow-[0_0_10px_rgba(197,160,89,0.5)]" : "bg-white/10"}`} />
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all border-2 ${step >= 2 ? "bg-brand-secondary text-brand-primary border-brand-secondary" : "bg-white/5 text-white/40 border-white/5"}`}>2</div>
            </div>

            {step === 1 ? (
              <div className="space-y-12 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                  <Typography variant="h3" font="serif" className="text-white text-2xl uppercase tracking-tight">{AppointmentsLabels.steps.one}</Typography>
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase text-white/20 tracking-widest bg-white/5 px-3 py-1 rounded-lg">
                    <Info size={12} /> Horário de Brasília
                  </div>
                </div>
                
                {/* Calendário Interativo */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                    <button onClick={prevMonth} className="p-3 hover:bg-white/5 rounded-xl transition-all"><ChevronLeft size={24} className="text-brand-secondary"/></button>
                    <Typography variant="small" className="font-black uppercase tracking-widest text-brand-secondary">
                      {currentMonth.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                    </Typography>
                    <button onClick={nextMonth} className="p-3 hover:bg-white/5 rounded-xl transition-all"><ChevronRight size={24} className="text-brand-secondary"/></button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-3 text-center">
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(d => (
                      <div key={d} className="text-[9px] font-black text-white/20 uppercase tracking-widest">{d}</div>
                    ))}
                    {daysInMonth.map((date, idx) => {
                      if (!date) return <div key={`empty-${idx}`} className="aspect-square" />;
                      const dateStr = date.toISOString().split('T')[0];
                      const isSelected = selectedDate === dateStr;
                      const past = isPast(date);
                      return (
                        <button
                          key={dateStr}
                          disabled={past}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-xs font-black transition-all relative border ${isSelected ? "bg-brand-secondary text-brand-primary border-brand-secondary shadow-lg shadow-brand-secondary/20 scale-110 z-10" : past ? "text-white/5 cursor-not-allowed border-transparent" : "bg-white/5 border-white/5 hover:border-brand-secondary/50 text-white/60"}`}
                        >
                          {date.getDate()}
                          {isToday(date) && !isSelected && <div className="absolute bottom-2 w-1 h-1 bg-brand-secondary rounded-full shadow-[0_0_8px_rgba(197,160,89,1)]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Seleção de Slot */}
                {selectedDate && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Typography variant="caption" className="text-brand-secondary font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                       <Clock size={14} /> Horários Disponíveis
                    </Typography>
                    {loading ? (
                      <div className="flex justify-center py-12">
                        <Loader2 className="animate-spin text-brand-secondary" size={32} />
                      </div>
                    ) : availableSlots.length > 0 ? (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-4 rounded-xl border text-[11px] font-black uppercase tracking-widest transition-all ${selectedSlot?.id === slot.id ? "bg-brand-secondary text-brand-primary border-brand-secondary shadow-xl scale-105" : "bg-white/5 border-white/10 hover:border-brand-secondary/40 text-white/60"}`}
                          >
                            {slot.hora_inicio}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-10 bg-rose-500/5 border border-rose-500/20 rounded-[2.5rem] text-center">
                        <Typography variant="small" className="text-rose-400 font-bold uppercase tracking-widest">Nenhum horário disponível para esta data.</Typography>
                        <Typography variant="caption" className="text-rose-400/40 normal-case block mt-2">Tente outro dia.</Typography>
                      </div>
                    )}
                  </div>
                )}

                <Button
                  disabled={!selectedSlot}
                  onClick={() => setStep(2)}
                  variant="secondary"
                  fullWidth
                  className="h-24 rounded-[2rem] shadow-2xl text-xl disabled:grayscale disabled:opacity-20 transition-all hover:scale-105"
                  icon={<ChevronRight size={28} />}
                >
                  Continuar Agendamento
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="flex items-center justify-between">
                  <Typography variant="h3" font="serif" className="text-white text-2xl uppercase tracking-tight">{AppointmentsLabels.steps.two}</Typography>
                  <button onClick={() => setStep(1)} className="text-brand-secondary text-[9px] font-black uppercase tracking-widest hover:underline flex items-center gap-2">
                    <ArrowLeft size={14} /> Alterar Horário
                  </button>
                </div>

                <div className="bg-brand-secondary/10 p-8 rounded-[2.5rem] border border-brand-secondary/20 flex items-center gap-6 shadow-inner">
                  <div className="bg-brand-secondary text-brand-primary p-4 rounded-2xl shadow-xl">
                    <CalendarIcon size={32} />
                  </div>
                  <div>
                    <Typography variant="caption" className="text-brand-secondary font-black uppercase tracking-[0.2em] mb-1 block text-[10px]">Confirmação de Reserva</Typography>
                    <Typography variant="small" className="text-white text-base font-bold">
                      {selectedProf?.nome} • {new Date(selectedDate).toLocaleDateString('pt-BR')} às {selectedSlot?.hora_inicio}
                    </Typography>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase text-white/20 ml-4 tracking-[0.3em]">Nome Completo</label>
                       <input type="text" required placeholder="Ex: Maria Silva" className="w-full bg-white/5 border-none rounded-2xl p-5 outline-none focus:ring-4 focus:ring-brand-secondary/10 font-bold text-white shadow-inner" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase text-white/20 ml-4 tracking-[0.3em]">Seu melhor e-mail</label>
                       <input type="email" required placeholder="exemplo@contato.com" className="w-full bg-white/5 border-none rounded-2xl p-5 outline-none focus:ring-4 focus:ring-brand-secondary/10 font-bold text-white shadow-inner" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase text-white/20 ml-4 tracking-[0.3em]">WhatsApp (com DDD)</label>
                     <input type="tel" required placeholder="(00) 00000-0000" className="w-full bg-white/5 border-none rounded-2xl p-5 outline-none focus:ring-4 focus:ring-brand-secondary/10 font-bold text-white shadow-inner" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase text-white/20 ml-4 tracking-[0.3em]">Resumo da Dúvida (Opcional)</label>
                     <textarea rows={3} placeholder="Como podemos auxiliar no seu caso hoje?" className="w-full bg-white/5 border-none rounded-[2rem] p-8 outline-none focus:ring-4 focus:ring-brand-secondary/10 font-bold text-white shadow-inner resize-none leading-relaxed" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                  </div>
                </div>

                <Button 
                  variant="secondary" 
                  fullWidth 
                  disabled={processing}
                  className="h-24 rounded-[2rem] text-xl shadow-2xl shadow-brand-secondary/20"
                  icon={processing ? <RefreshCw className="animate-spin" size={28}/> : <Sparkles size={28}/>}
                >
                  {processing ? AppointmentsLabels.form.loading : AppointmentsLabels.form.submit}
                </Button>
              </form>
            )}

            <Typography variant="caption" className="text-center text-[10px] text-white/10 mt-12 block normal-case font-medium leading-relaxed italic">
              {AppointmentsLabels.form.disclaimer}
            </Typography>
          </div>
        </Container>
      </section>
      <Footer />
    </div>
  );
};

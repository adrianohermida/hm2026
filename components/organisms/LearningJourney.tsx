
import React, { useState } from 'react';
import { Play, Check, Clock, ShieldCheck } from 'lucide-react';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';

interface VideoStep {
  id: number;
  title: string;
  duration: string;
  videoId: string;
}

const VIDEO_STEPS: VideoStep[] = [
  { id: 1, title: "O que é o Superendividamento?", duration: "3:15 MINUTOS", videoId: "Q0PSv2Lc8Qk" },
  { id: 2, title: "Quem pode usar esta Lei?", duration: "4:20 MINUTOS", videoId: "d7dW08nWAcY" },
  { id: 3, title: "Como funciona a negociação?", duration: "5:45 MINUTOS", videoId: "xUbtNefpFs8" },
  { id: 4, title: "O Plano de Pagamento na prática", duration: "4:10 MINUTOS", videoId: "GEtGj05jxTw" },
];

export const LearningJourney: React.FC = () => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepClick = (index: number) => {
    setActiveStepIdx(index);
    if (!completedSteps.includes(index)) {
      setCompletedSteps(prev => [...prev, index]);
    }
    // Suave scroll para o topo do player em mobile
    if (window.innerWidth < 1024) {
      document.getElementById('video-player-viewport')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const progress = (completedSteps.length / VIDEO_STEPS.length) * 100;
  const isFinished = completedSteps.length === VIDEO_STEPS.length;

  return (
    <div className="bg-brand-primary rounded-[2.5rem] md:rounded-[4rem] p-4 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-3xl -mr-32 -mt-32" />
      
      <div className="flex flex-col lg:flex-row gap-8 md:gap-16 relative z-10">
        
        {/* Lado Esquerdo: Player High-End */}
        <div className="flex-1" id="video-player-viewport">
          <div className="relative aspect-video rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-black shadow-2xl border border-brand-secondary/20 group ring-1 ring-white/5">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${VIDEO_STEPS[activeStepIdx].videoId}?rel=0&modestbranding=1&controls=1&showinfo=0`}
              title={VIDEO_STEPS[activeStepIdx].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-8 md:mt-10 px-2">
            <Typography variant="h3" font="serif" className="text-white mb-3 text-xl md:text-3xl leading-tight">
              <span className="text-brand-secondary font-black mr-2 tracking-tighter">{VIDEO_STEPS[activeStepIdx].id}.</span> 
              {VIDEO_STEPS[activeStepIdx].title}
            </Typography>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-brand-secondary/70">
                <Clock size={14} className="md:size-16" />
                <Typography variant="caption" className="text-[10px] font-black tracking-widest">{VIDEO_STEPS[activeStepIdx].duration}</Typography>
              </div>
              <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
              <Typography variant="caption" className="text-brand-secondary font-black tracking-[0.4em] text-[10px] uppercase">
                Mentoria Digital
              </Typography>
            </div>
          </div>
        </div>

        {/* Lado Direito: Playlist Elite */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6">
          <div className="flex items-center justify-between px-2">
            <Typography variant="caption" className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Módulos da Jornada</Typography>
            <Typography variant="caption" className="text-brand-secondary text-[11px] font-black">{completedSteps.length}/{VIDEO_STEPS.length}</Typography>
          </div>
          
          {/* Barra de Progresso High-Tech */}
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-brand-secondary transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(197,160,89,0.4)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Lista de Módulos */}
          <div className="space-y-4">
            {VIDEO_STEPS.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              const isDone = completedSteps.includes(idx);

              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(idx)}
                  className={`w-full flex items-center gap-5 p-5 rounded-[1.8rem] transition-all text-left group border ${
                    isActive 
                      ? 'bg-brand-secondary/15 border-brand-secondary/40 shadow-xl scale-[1.02]' 
                      : 'bg-white/[0.03] border-white/5 hover:bg-white/5'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                    isDone ? 'bg-brand-secondary text-brand-primary' : 'bg-white/10 text-white/30'
                  } ${isActive ? 'shadow-lg rotate-3' : ''}`}>
                    {isDone ? <Check size={24} strokeWidth={4} /> : <Typography variant="small" className="font-black text-xs">{step.id}</Typography>}
                  </div>
                  <div className="flex-1">
                    <Typography variant="small" className={`font-black block mb-0.5 transition-colors text-xs md:text-sm uppercase tracking-tight ${isActive ? 'text-brand-secondary' : 'text-slate-300 group-hover:text-white'}`}>
                      {step.title}
                    </Typography>
                    <Typography variant="caption" className="text-white/20 font-black tracking-widest text-[9px] uppercase">
                      {step.duration}
                    </Typography>
                  </div>
                  {isActive && <div className="w-2 h-2 bg-brand-secondary rounded-full animate-ping" />}
                </button>
              );
            })}
          </div>

          {isFinished && (
            <div className="mt-6 p-8 bg-gradient-to-br from-brand-secondary to-brand-secondaryLight rounded-[2.5rem] animate-in fade-in zoom-in-95 duration-700 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-brand-primary" size={24} />
                <Typography variant="small" className="text-brand-primary font-black uppercase tracking-widest text-[11px]">Certificação de Conclusão</Typography>
              </div>
              <Typography variant="body" font="serif" className="text-brand-primary text-xs md:text-sm mb-8 leading-relaxed font-bold">
                Trilha educativa concluída. Você está pronto para a análise técnica de redução de passivos.
              </Typography>
              <Button 
                variant="primary" 
                fullWidth 
                className="bg-brand-primary text-brand-secondary hover:bg-brand-primaryLight border-none py-5 text-[11px] font-black tracking-[0.3em] shadow-2xl"
                onClick={() => document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' })}
              >
                MONTAR MEU PLANO
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


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
  };

  const progress = (completedSteps.length / VIDEO_STEPS.length) * 100;
  const isFinished = completedSteps.length === VIDEO_STEPS.length;

  return (
    <div className="bg-brand-primary rounded-[3rem] p-6 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-3xl -mr-32 -mt-32" />
      
      <div className="flex flex-col lg:flex-row gap-12 relative z-10">
        
        {/* Lado Esquerdo: Player Premium */}
        <div className="flex-1">
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-brand-secondary/20 group">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_STEPS[activeStepIdx].videoId}?autoplay=0&rel=0&modestbranding=1&color=white&enablejsapi=1&origin=${window.location.origin}`}
              title={VIDEO_STEPS[activeStepIdx].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            {/* Overlay sutil de branding */}
            <div className="absolute top-4 left-4 bg-brand-primary/80 backdrop-blur-md px-4 py-2 rounded-full border border-brand-secondary/30 flex items-center gap-2 pointer-events-none">
              <div className="w-2 h-2 bg-brand-secondary rounded-full animate-pulse" />
              <Typography variant="caption" className="text-white text-[10px] tracking-tighter">
                Módulo {VIDEO_STEPS[activeStepIdx].id}
              </Typography>
            </div>
          </div>
          <div className="mt-8">
            <Typography variant="h3" font="serif" className="text-white mb-3">
              <span className="text-brand-secondary">{VIDEO_STEPS[activeStepIdx].id}.</span> {VIDEO_STEPS[activeStepIdx].title}
            </Typography>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-brand-secondary/70">
                <Clock size={16} />
                <Typography variant="caption" className="text-[10px]">{VIDEO_STEPS[activeStepIdx].duration}</Typography>
              </div>
              <div className="h-4 w-[1px] bg-white/10" />
              <Typography variant="caption" className="text-brand-secondary font-bold tracking-widest text-[10px]">
                DR. ADRIANO HERMIDA MAIA
              </Typography>
            </div>
          </div>
        </div>

        {/* Lado Direito: Playlist Branding Gold */}
        <div className="w-full lg:w-[420px] flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Typography variant="caption" className="text-white/40">JORNADA DE LIBERTAÇÃO</Typography>
            <Typography variant="caption" className="text-brand-secondary">{completedSteps.length}/{VIDEO_STEPS.length}</Typography>
          </div>
          
          {/* Barra de Progresso Gold */}
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-brand-secondary transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(197,160,89,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Playlist Estilizada */}
          <div className="space-y-3">
            {VIDEO_STEPS.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              const isDone = completedSteps.includes(idx);

              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(idx)}
                  className={`w-full flex items-center gap-5 p-5 rounded-2xl transition-all text-left group border ${
                    isActive 
                      ? 'bg-brand-secondary/10 border-brand-secondary/40 shadow-xl' 
                      : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isDone ? 'bg-brand-secondary text-brand-primary' : 'bg-white/10 text-white/30'
                  } ${isActive ? 'scale-110 shadow-lg' : ''}`}>
                    {isDone ? <Check size={24} strokeWidth={3} /> : <Typography variant="small" className="font-bold">{step.id}</Typography>}
                  </div>
                  <div className="flex-1">
                    <Typography variant="small" className={`font-bold block mb-1 transition-colors ${isActive ? 'text-brand-secondary' : 'text-slate-300 group-hover:text-white'}`}>
                      {step.title}
                    </Typography>
                    <Typography variant="caption" className="text-white/30 font-normal lowercase">
                      {step.duration}
                    </Typography>
                  </div>
                  {isActive && <div className="w-2 h-2 bg-brand-secondary rounded-full animate-ping" />}
                </button>
              );
            })}
          </div>

          {isFinished && (
            <div className="mt-4 p-8 bg-gradient-to-br from-brand-secondary to-brand-secondaryLight rounded-3xl animate-in fade-in zoom-in duration-500 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-brand-primary" />
                <Typography variant="small" className="text-brand-primary font-bold uppercase tracking-wider">Conhecimento é Poder</Typography>
              </div>
              <Typography variant="body" font="serif" className="text-brand-primary text-sm mb-6 leading-relaxed">
                Você concluiu a trilha educacional. O próximo passo é a análise técnica detalhada da sua situação bancária.
              </Typography>
              <Button 
                variant="primary" 
                fullWidth 
                className="bg-brand-primary text-brand-secondary hover:bg-brand-primaryLight border-none py-4 text-sm font-bold shadow-xl"
                onClick={() => document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' })}
              >
                MONTAR MEU PLANO AGORA
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

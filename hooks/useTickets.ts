
import { useState, useEffect, useCallback } from 'react';
import { HelpDeskRouter } from '../modules/helpdesk/helpdesk-router.ts';
import { agentTicketAnalyst } from '../services/geminiService.ts';
import { Ticket, TicketThread, SituacaoTicket } from '../types.ts';

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketAtivo, setTicketAtivo] = useState<Ticket | null>(null);
  const [threads, setThreads] = useState<TicketThread[]>([]);
  const [contatos, setContatos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [analisandoIA, setAnalisandoIA] = useState(false);
  const [filtroBusca, setFiltroBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');

  const loadData = useCallback(async () => {
    setLoading(true);
    const [t, c] = await Promise.all([
      HelpDeskRouter.fetchAll(),
      HelpDeskRouter.fetchContacts()
    ]);
    setTickets(t);
    setContatos(c);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const selecionarTicket = async (ticket: Ticket | null) => {
    setTicketAtivo(ticket);
    if (ticket) {
      const data = await HelpDeskRouter.fetchThreads(ticket.id);
      setThreads(data);
    }
  };

  const criarNovoAtendimento = async (payload: any) => {
    const novo = await HelpDeskRouter.createTicket(payload);
    await loadData();
    selecionarTicket(novo);
    return novo;
  };

  const editarAtendimento = async (id: string, updates: any) => {
    await HelpDeskRouter.updateTicket(id, updates);
    if (ticketAtivo?.id === id) setTicketAtivo({ ...ticketAtivo, ...updates });
    loadData();
  };

  const enviarMensagem = async (mensagem: string, ehInterna: boolean) => {
    if (!ticketAtivo) return;
    setEnviando(true);
    try {
      await HelpDeskRouter.sendThread({
        ticket_id: ticketAtivo.id,
        mensagem,
        autor_tipo: 'advogado',
        autor_nome: 'Equipe Hermida Maia',
        eh_interno: ehInterna,
        criado_em: new Date().toISOString()
      });
      const updated = await HelpDeskRouter.fetchThreads(ticketAtivo.id);
      setThreads(updated);
    } finally {
      setEnviando(false);
    }
  };

  const analisarComIA = async () => {
    if (!ticketAtivo) return null;
    setAnalisandoIA(true);
    try {
      return await agentTicketAnalyst(ticketAtivo, threads, []);
    } finally {
      setAnalisandoIA(false);
    }
  };

  const filteredTickets = tickets.filter(t => {
    const matchBusca = t.assunto?.toLowerCase().includes(filtroBusca.toLowerCase()) || t.protocolo?.toLowerCase().includes(filtroBusca.toLowerCase());
    const matchStatus = filtroStatus === 'todos' || 
                       (filtroStatus === 'urgentes' && t.prioridade === 'urgente') ||
                       (filtroStatus === 'meus' && t.situacao !== 'concluido');
    return matchBusca && matchStatus;
  });

  return {
    tickets: filteredTickets,
    ticketAtivo,
    threads,
    contatos,
    loading,
    enviando,
    analisandoIA,
    filtroBusca,
    setFiltroBusca,
    filtroStatus,
    setFiltroStatus,
    selecionarTicket,
    criarNovoAtendimento,
    editarAtendimento,
    enviarMensagem,
    atualizarStatus: (s: SituacaoTicket) => HelpDeskRouter.updateStatus(ticketAtivo!.id, s).then(loadData),
    analisarComIA,
    refresh: loadData
  };
};
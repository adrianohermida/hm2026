
import React, { useState } from 'react';
import { governanceService } from '../services/supabaseService.ts';
import { formatContactEmail } from '../services/geminiService.ts';

export const useContact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', subject: 'Superendividamento', message: '' });
  const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('PROCESSING');
    try {
      const emailBody = await formatContactEmail(formState);
      await governanceService.submitContactLead(formState, emailBody || '');
      setStatus('SUCCESS');
      setFormState({ name: '', email: '', phone: '', subject: 'Superendividamento', message: '' });
      setTimeout(() => setStatus('IDLE'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('ERROR');
    }
  };

  return { formState, setFormState, status, setStatus, submitForm };
};

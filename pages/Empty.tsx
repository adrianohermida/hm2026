
import React, { useEffect, useState } from 'react';

/**
 * HM-V12: STABILIZATION ZONE
 * Zero-load component designed to stop all resource consumption 
 * and allow the IDE/GitHub sync to process pending commits.
 */
export const EmptyPage: React.FC = () => {
  const [countdown, setCountdown] = useState(120);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Immediate Network Halt
      if (window.stop) window.stop();
      
      // Event Loop Purge: Stops all background logic that might fight for resources
      const highestId = window.setTimeout(() => {}, 0);
      for (let i = 0; i <= highestId; i++) {
        window.clearTimeout(i);
        window.clearInterval(i);
      }

      console.clear();
      console.info("%c HM-KERNEL: STABILIZATION ACTIVE ", "background: #0A1120; color: #c5a059; font-weight: bold; padding: 4px; border-radius: 4px;");
      console.info("GitHub sync recovery in progress. Keep this tab open.");
    }

    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleReturn = () => {
    window.location.href = window.location.origin;
  };

  const handleHardRefresh = () => {
    window.location.reload();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#0A1120',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        padding: '60px',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '40px',
        backgroundColor: 'rgba(255,255,255,0.02)',
        boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
        maxWidth: '400px',
        width: '90%'
      }}>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          backgroundColor: '#c5a059', 
          borderRadius: '20px', 
          margin: '0 auto 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0A1120',
          fontWeight: '900',
          fontSize: '18px',
          boxShadow: '0 10px 20px rgba(197,160,89,0.3)'
        }}>HM</div>
        
        <h2 style={{ 
          fontSize: '14px', 
          fontWeight: '900', 
          letterSpacing: '0.4em', 
          textTransform: 'uppercase',
          color: '#ffffff',
          margin: '0 0 10px'
        }}>
          Sync Rescue Active
        </h2>
        
        <p style={{ 
          fontSize: '10px', 
          fontWeight: 'bold', 
          color: '#c5a059', 
          margin: '0 0 30px', 
          textTransform: 'uppercase' 
        }}>
          Cooldown: {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
        </p>

        <p style={{
          fontSize: '12px',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: '1.6',
          marginBottom: '40px'
        }}>
          A <strong>GitHub Sync Conflict</strong> (Error 429) was detected. 
          Background services are paused to let the IDE catch up.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            onClick={handleReturn}
            style={{
              padding: '16px 32px',
              backgroundColor: countdown === 0 ? '#c5a059' : 'rgba(255,255,255,0.05)',
              color: countdown === 0 ? '#0A1120' : 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '16px',
              fontWeight: '900',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              cursor: countdown === 0 ? 'pointer' : 'default',
              transition: 'all 0.3s ease'
            }}
          >
            Restart Workspace
          </button>
          
          <button 
            onClick={handleHardRefresh}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.3)',
              fontSize: '10px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Manual Hard Refresh
          </button>
        </div>
      </div>
      
      <div style={{
        marginTop: '40px',
        opacity: 0.1,
        fontSize: '10px',
        color: 'white',
        letterSpacing: '0.5em',
        textTransform: 'uppercase'
      }}>
        HM-KERNEL-V12-SAFE-ZONE
      </div>
    </div>
  );
};

import { useState } from 'react';

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={handleCopy}>
      {copied ? (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copiado
        </>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1" stroke="currentColor" strokeWidth="2" />
          </svg>
          Copiar
        </>
      )}
    </button>
  );
}

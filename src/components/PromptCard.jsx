import { useState } from 'react';
import CopyButton from './CopyButton';

export default function PromptCard({ number, title, prompt }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card">
      <div className="card-head" onClick={() => setOpen(!open)}>
        {number != null && <span className="card-number">{String(number).padStart(2, '0')}</span>}
        <span className="card-title">{title}</span>
        <span onClick={(e) => e.stopPropagation()}>
          <CopyButton text={prompt} />
        </span>
        <svg
          className={`card-chevron${open ? ' open' : ''}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {open && <pre className="card-prompt">{prompt}</pre>}
    </div>
  );
}

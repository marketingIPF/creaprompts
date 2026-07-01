import CopyButton from './CopyButton';

export default function PromptCard({ number, title, prompt }) {
  return (
    <div className="card">
      <div className="card-head">
        {number != null && <span className="card-number">{String(number).padStart(2, '0')}</span>}
        <span className="card-title">{title}</span>
        <CopyButton text={prompt} />
      </div>
      <pre className="card-prompt">{prompt}</pre>
    </div>
  );
}

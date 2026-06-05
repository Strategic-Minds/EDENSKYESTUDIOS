'use client';

import { FormEvent, useState } from 'react';

type ChatResult = {
  reply?: string;
  error?: string;
  blocked?: boolean;
  ready?: boolean;
  gate?: {
    risk?: string;
    recommendation?: string;
    matchedGate?: string;
  };
  receipt?: {
    source?: string;
  };
  next?: string;
};

const quickPrompts = [
  'What should Eden do next to get the app working?',
  'Create a safe test content plan for Eden Closet.',
  'Analyze the approval queue and recommend the next action.',
  'Try a Shopify mutation test and show the gate.'
];

export default function EdenChatPanel() {
  const [message, setMessage] = useState(quickPrompts[0]);
  const [result, setResult] = useState<ChatResult | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function sendMessage(event?: FormEvent<HTMLFormElement>, override?: string) {
    event?.preventDefault();
    const nextMessage = (override ?? message).trim();
    if (!nextMessage) return;

    setLoading(true);
    setResult(null);
    setStatusCode(null);

    try {
      const response = await fetch('/api/eden/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: nextMessage,
          requestedAction: nextMessage
        })
      });
      const payload = (await response.json()) as ChatResult;
      setStatusCode(response.status);
      setResult(payload);
    } catch (error) {
      setStatusCode(0);
      setResult({ error: error instanceof Error ? error.message : 'Unknown chat error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="chatPanel" aria-label="Eden governed chat test panel">
      <div className="chatHeader">
        <div>
          <p className="kicker">Eden GPT Runtime</p>
          <h2>Talk to Eden in governed test mode.</h2>
          <p>Safe analysis, drafting, and recommendations work now. Protected actions return an approval gate.</p>
        </div>
        <span className="pill good">Test Active</span>
      </div>

      <div className="quickPrompts">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => {
              setMessage(prompt);
              void sendMessage(undefined, prompt);
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      <form className="chatForm" onSubmit={sendMessage}>
        <label htmlFor="eden-chat-input">Ask Eden</label>
        <textarea
          id="eden-chat-input"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={4}
        />
        <button className="primary" type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Send Test'}
        </button>
      </form>

      {result && (
        <article className="chatResult">
          <div className="topline">
            <h3>{result.blocked ? 'Approval Gate Triggered' : 'Eden Response'}</h3>
            <span className={`pill ${result.blocked ? 'bad' : statusCode && statusCode >= 400 ? 'warn' : 'good'}`}>
              {statusCode === 0 ? 'Network' : statusCode ?? 'Ready'}
            </span>
          </div>
          <p>{result.reply ?? result.error ?? result.next ?? 'No response text returned yet.'}</p>
          {result.gate?.recommendation && <p className="resultNote">Recommendation: {result.gate.recommendation}</p>}
          {result.gate?.matchedGate && <p className="resultNote">Gate: {result.gate.matchedGate}</p>}
          {result.receipt?.source && <p className="resultNote">Receipt: {result.receipt.source}</p>}
        </article>
      )}
    </section>
  );
}

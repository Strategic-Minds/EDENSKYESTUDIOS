'use client';

import { useMemo, useState } from 'react';

type ApiKind = 'discover' | 'plan' | 'schedule-draft' | 'image-prompts';
type GateColor = 'green' | 'yellow' | 'red';

type ApprovedOption = {
  id: string;
  label: string;
  group: string;
};

type BatchResponse = {
  success: boolean;
  blocked: boolean;
  batch?: {
    id: string;
    kind: ApiKind;
    modelId: string;
    modelName: string;
    topic: string;
    channels: string[];
    days: number;
    manifestSlots: string[];
    mode: string;
    liveMutation: boolean;
    artifacts: Array<{ id: string; title: string; status: GateColor; detail: string }>;
    qaQueue: Array<{ id: string; label: string; color: GateColor; detail: string }>;
    approvalQueue: Array<{ id: string; label: string; color: GateColor; required: boolean }>;
    blockedActions: string[];
  };
  error?: string;
};

const routes: Array<{ kind: ApiKind; label: string; helper: string }> = [
  { kind: 'discover', label: 'Discover', helper: 'Find content angles, visual gaps, and approved model opportunities.' },
  { kind: 'plan', label: 'Plan', helper: 'Create a campaign plan from the selected roster record.' },
  { kind: 'schedule-draft', label: 'Schedule Draft', helper: 'Stage calendar/Metricool-ready drafts without live publishing.' },
  { kind: 'image-prompts', label: 'Image Prompts', helper: 'Generate safe prompt batches for Image Stack approval.' }
];

const tone = {
  green: '#31d67b',
  yellow: '#f4c95d',
  red: '#ff5c7a'
};

export function AutomationCommandCenter({ approvedOptions }: { approvedOptions: ApprovedOption[] }) {
  const [kind, setKind] = useState<ApiKind>('plan');
  const [modelId, setModelId] = useState(approvedOptions[0]?.id ?? 'eden-skye');
  const [topic, setTopic] = useState('Luxury editorial content sprint for Eden Skye Studios');
  const [channels, setChannels] = useState('Instagram, TikTok, YouTube Shorts');
  const [days, setDays] = useState(7);
  const [manifestSlots, setManifestSlots] = useState('source-image, campaign-visual, caption-pack');
  const [publicExport, setPublicExport] = useState(false);
  const [exportApproved, setExportApproved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BatchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedRoute = useMemo(() => routes.find((route) => route.kind === kind), [kind]);

  async function submitBatch() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/eden/automation/${kind}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelId,
          topic,
          channels: channels.split(',').map((channel) => channel.trim()).filter(Boolean),
          days,
          manifestSlots: manifestSlots.split(',').map((slot) => slot.trim()).filter(Boolean),
          publicExport,
          exportApproved
        })
      });

      const data = (await response.json()) as BatchResponse;
      setResult(data);
    } catch (batchError) {
      setError(batchError instanceof Error ? batchError.message : 'Batch request failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={panelStyle}>
      <div style={headerStyle}>
        <div>
          <p style={eyebrowStyle}>Live Draft Controls</p>
          <h2 style={headingStyle}>Automation Command Center</h2>
        </div>
        <span style={gatePill('yellow')}>Draft only</span>
      </div>

      <div style={routeGridStyle}>
        {routes.map((route) => (
          <button
            key={route.kind}
            type="button"
            onClick={() => setKind(route.kind)}
            style={route.kind === kind ? activeRouteButtonStyle : routeButtonStyle}
          >
            <strong>{route.label}</strong>
            <span>{route.helper}</span>
          </button>
        ))}
      </div>

      <div style={formGridStyle}>
        <label style={fieldStyle}>
          Approved model or account
          <select value={modelId} onChange={(event) => setModelId(event.target.value)} style={inputStyle}>
            {approvedOptions.map((option) => (
              <option key={`${option.group}-${option.id}`} value={option.id}>
                {option.group} / {option.label}
              </option>
            ))}
          </select>
        </label>

        <label style={fieldStyle}>
          Days
          <input type="number" min={1} max={90} value={days} onChange={(event) => setDays(Number(event.target.value))} style={inputStyle} />
        </label>

        <label style={{ ...fieldStyle, gridColumn: '1 / -1' }}>
          Topic or production intent
          <textarea value={topic} onChange={(event) => setTopic(event.target.value)} rows={3} style={textAreaStyle} />
        </label>

        <label style={fieldStyle}>
          Channels
          <input value={channels} onChange={(event) => setChannels(event.target.value)} style={inputStyle} />
        </label>

        <label style={fieldStyle}>
          Manifest / production slots
          <input value={manifestSlots} onChange={(event) => setManifestSlots(event.target.value)} style={inputStyle} />
        </label>
      </div>

      <div style={gateRowStyle}>
        <label style={checkStyle}>
          <input type="checkbox" checked={publicExport} onChange={(event) => setPublicExport(event.target.checked)} />
          Request publish-ready export
        </label>
        <label style={checkStyle}>
          <input type="checkbox" checked={exportApproved} onChange={(event) => setExportApproved(event.target.checked)} />
          Green gate approved
        </label>
        <button type="button" onClick={submitBatch} disabled={loading} style={submitButtonStyle}>
          {loading ? 'Building batch...' : `Run ${selectedRoute?.label ?? 'Batch'}`}
        </button>
      </div>

      {error ? <p style={{ color: tone.red, marginTop: 14 }}>{error}</p> : null}

      {result?.batch ? (
        <div style={resultGridStyle}>
          <article style={resultCardStyle}>
            <span style={gatePill(result.blocked ? 'red' : 'green')}>{result.blocked ? 'Blocked' : 'Ready'}</span>
            <h3 style={cardTitleStyle}>{result.batch.id}</h3>
            <p style={bodyStyle}>{result.batch.topic}</p>
            <p style={mutedStyle}>{result.batch.modelName} / {result.batch.days} days / {result.batch.mode}</p>
          </article>

          <article style={resultCardStyle}>
            <h3 style={cardTitleStyle}>QA Queue</h3>
            {result.batch.qaQueue.map((gate) => (
              <div key={gate.id} style={rowStyle}>
                <span style={gatePill(gate.color)}>{gate.color}</span>
                <span>{gate.label}</span>
              </div>
            ))}
          </article>

          <article style={resultCardStyle}>
            <h3 style={cardTitleStyle}>Approval Queue</h3>
            {result.batch.approvalQueue.map((gate) => (
              <div key={gate.id} style={rowStyle}>
                <span style={gatePill(gate.color)}>{gate.color}</span>
                <span>{gate.label}</span>
              </div>
            ))}
          </article>

          <article style={resultCardStyle}>
            <h3 style={cardTitleStyle}>Blocked Actions</h3>
            {result.batch.blockedActions.map((action) => (
              <p key={action} style={mutedStyle}>{action}</p>
            ))}
          </article>
        </div>
      ) : null}
    </section>
  );
}

const panelStyle = {
  border: '1px solid rgba(255, 255, 255, 0.14)',
  background: 'rgba(10, 10, 10, 0.92)',
  borderRadius: 8,
  padding: 18,
  marginBottom: 18
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 16,
  alignItems: 'flex-start',
  flexWrap: 'wrap' as const,
  marginBottom: 16
};

const eyebrowStyle = { color: '#d6b56d', fontSize: 12, textTransform: 'uppercase' as const, margin: '0 0 6px', letterSpacing: 0 };
const headingStyle = { fontSize: 24, margin: 0, letterSpacing: 0 };
const cardTitleStyle = { fontSize: 18, margin: '10px 0 8px', letterSpacing: 0 };
const bodyStyle = { color: '#cfc7bb', fontSize: 14, lineHeight: 1.5, margin: '0 0 10px' };
const mutedStyle = { color: '#9f988c', fontSize: 13, lineHeight: 1.5, margin: '0 0 8px' };

const routeGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 10, marginBottom: 16 };
const routeButtonStyle = {
  border: '1px solid rgba(255, 255, 255, 0.13)',
  background: 'rgba(255, 255, 255, 0.04)',
  color: '#f7f4ee',
  borderRadius: 8,
  padding: 14,
  textAlign: 'left' as const,
  display: 'grid',
  gap: 8,
  cursor: 'pointer'
};
const activeRouteButtonStyle = { ...routeButtonStyle, border: '1px solid #d6b56d', background: 'rgba(214, 181, 109, 0.13)' };
const formGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 };
const fieldStyle = { display: 'grid', gap: 8, color: '#d8d1c6', fontSize: 13 };
const inputStyle = { width: '100%', minHeight: 42, borderRadius: 8, border: '1px solid rgba(255, 255, 255, 0.14)', background: '#070707', color: '#f7f4ee', padding: '0 12px' };
const textAreaStyle = { ...inputStyle, minHeight: 92, padding: 12, resize: 'vertical' as const };
const gateRowStyle = { display: 'flex', flexWrap: 'wrap' as const, gap: 12, alignItems: 'center', marginTop: 16 };
const checkStyle = { display: 'inline-flex', gap: 8, alignItems: 'center', color: '#cfc7bb', fontSize: 13 };
const submitButtonStyle = { border: 0, borderRadius: 8, background: '#d6b56d', color: '#050505', minHeight: 42, padding: '0 18px', fontWeight: 900, cursor: 'pointer' };
const resultGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginTop: 16 };
const resultCardStyle = { border: '1px solid rgba(255, 255, 255, 0.12)', background: 'rgba(255, 255, 255, 0.035)', borderRadius: 8, padding: 16 };
const rowStyle = { display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8, color: '#d8d1c6', fontSize: 13 };

function gatePill(color: GateColor) {
  return {
    display: 'inline-flex',
    border: '1px solid',
    borderColor: tone[color],
    color: tone[color],
    borderRadius: 999,
    padding: '4px 9px',
    fontSize: 12,
    textTransform: 'uppercase' as const,
    width: 'fit-content'
  };
}

import Link from 'next/link';

import {
  automationLanes,
  automationQueue,
  imageGenerationPresets,
  schedulingTargets
} from '../automation-data';
import { approvedBasicPortraits } from '../models/approved-basic-portraits';
import { approvedFacelessAccounts } from '../models/approved-faceless-roster';
import { approvedInternationalModels } from '../models/approved-international-roster';
import { approvedMaleModels } from '../models/approved-male-roster';

const toneColor = {
  green: '#31d67b',
  yellow: '#f4c95d',
  red: '#ff5c7a'
};

const surface = 'rgba(255, 255, 255, 0.055)';
const border = 'rgba(255, 255, 255, 0.12)';

const moduleCards = [
  { title: 'Approved Model Picker', tone: 'green', detail: 'Locks batches to approved female, male, international, or faceless records only.' },
  { title: 'Batch Builder', tone: 'green', detail: 'Turns a selected model, topic, days, and channels into a draft production batch.' },
  { title: 'Prompt Builder', tone: 'green', detail: 'Creates image/video/content prompt packets while preserving model and manifest context.' },
  { title: 'QA Queue', tone: 'yellow', detail: 'Scores filename, model ID, source state, prompt safety, manifest slot, and approval readiness.' },
  { title: 'Approval Queue', tone: 'yellow', detail: 'Collects red/yellow/green gates before scheduling, public export, or production handoff.' },
  { title: 'Production Slot Mapper', tone: 'yellow', detail: 'Maps draft outputs to source slots, campaign slots, or faceless calendar days.' },
  { title: 'Content Draft Generator', tone: 'green', detail: 'Builds hooks, captions, CTAs, scripts, and calendar drafts from approved source truth.' },
  { title: 'Cleanup Agent', tone: 'yellow', detail: 'Flags duplicate files, missing receipts, stale placeholders, and unmatched source images.' },
  { title: 'Video Batch Planner', tone: 'yellow', detail: 'Stages HeyGen-ready scripts and avatar briefs without activating live video jobs.' },
  { title: 'Publish-Ready Export', tone: 'red', detail: 'Blocked until every gate is green and explicit approval is recorded.' }
] as const;

const apiCards = [
  { label: 'Discover', route: '/api/eden/automation/discover', tone: 'yellow' },
  { label: 'Plan', route: '/api/eden/automation/plan', tone: 'green' },
  { label: 'Schedule Draft', route: '/api/eden/automation/schedule-draft', tone: 'yellow' },
  { label: 'Image Prompts', route: '/api/eden/automation/image-prompts', tone: 'yellow' }
] as const;

const modelGroups = [
  { label: 'Female', total: approvedBasicPortraits.length, items: approvedBasicPortraits.slice(0, 6).map((item) => item.name) },
  { label: 'Male', total: approvedMaleModels.length, items: approvedMaleModels.slice(0, 6).map((item) => item.name) },
  { label: 'International', total: approvedInternationalModels.length, items: approvedInternationalModels.slice(0, 6).map((item) => `${item.name} / ${item.market}`) },
  { label: 'Faceless', total: approvedFacelessAccounts.length, items: approvedFacelessAccounts.map((item) => item.concept) }
];

const totalApprovedModels = approvedBasicPortraits.length + approvedMaleModels.length + approvedInternationalModels.length + approvedFacelessAccounts.length;
const totalContentDrafts = approvedFacelessAccounts.reduce((count, item) => count + item.contentCalendar.length, 0);

export default function AutomationPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#030303', color: '#f7f4ee', padding: '32px clamp(18px, 4vw, 56px)' }}>
      <section style={{ display: 'grid', gap: 20, marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 780 }}>
            <p style={{ margin: '0 0 8px', color: '#d6b56d', textTransform: 'uppercase', fontSize: 12, letterSpacing: 0 }}>Admin Control Automation Engine v1</p>
            <h1 style={{ margin: 0, fontSize: 'clamp(34px, 5vw, 66px)', lineHeight: 0.95, letterSpacing: 0 }}>Create, plan, QA, and export from one governed console.</h1>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/eden-source-images/library" style={pillLink}>Library</Link>
            <Link href="/eden-source-images/image-stack" style={pillLink}>Image Stack</Link>
            <Link href="/eden-source-images/editor" style={pillLink}>Editor</Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 12 }}>
          {[
            ['Approved records', totalApprovedModels],
            ['Active lanes', automationLanes.length],
            ['Draft content items', totalContentDrafts],
            ['Live mutations', 0]
          ].map(([label, value]) => (
            <div key={label} style={metricCard}>
              <span style={{ color: '#a9a39a', fontSize: 13 }}>{label}</span>
              <strong style={{ fontSize: 34 }}>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={eyebrowStyle}>Workflow</p>
            <h2 style={headingStyle}>Left-to-right operating lanes</h2>
          </div>
          <span style={{ color: '#9f988c', fontSize: 13 }}>Draft now. Approve before live action.</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {automationLanes.map((lane, index) => (
            <article key={lane.id} style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ ...numberBadge, borderColor: toneColor[lane.status], color: toneColor[lane.status] }}>{index + 1}</span>
                <span style={{ ...statusDot, background: toneColor[lane.status] }} />
              </div>
              <h3 style={cardTitleStyle}>{lane.label}</h3>
              <p style={bodyStyle}>{lane.goal}</p>
              <p style={mutedBodyStyle}>{lane.nextAction}</p>
              <small style={{ color: '#8d867a' }}>{lane.automationLevel}</small>
            </article>
          ))}
        </div>
      </section>

      <section style={splitSectionStyle}>
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <p style={eyebrowStyle}>Approved Model Picker</p>
              <h2 style={headingStyle}>Real roster only</h2>
            </div>
            <span style={{ color: toneColor.green }}>Green gate</span>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {modelGroups.map((group) => (
              <article key={group.label} style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                  <h3 style={cardTitleStyle}>{group.label}</h3>
                  <strong>{group.total}</strong>
                </div>
                <p style={bodyStyle}>{group.items.join(', ')}</p>
              </article>
            ))}
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <p style={eyebrowStyle}>Batch Builder</p>
              <h2 style={headingStyle}>Draft APIs</h2>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {apiCards.map((api) => (
              <article key={api.route} style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                  <h3 style={cardTitleStyle}>{api.label}</h3>
                  <span style={{ ...statusPill, color: toneColor[api.tone], borderColor: toneColor[api.tone] }}>POST</span>
                </div>
                <code style={codeStyle}>{api.route}</code>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={eyebrowStyle}>Control Modules</p>
            <h2 style={headingStyle}>Everything the batch must pass through</h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 12 }}>
          {moduleCards.map((module) => (
            <article key={module.title} style={cardStyle}>
              <span style={{ ...statusPill, color: toneColor[module.tone], borderColor: toneColor[module.tone] }}>{module.tone}</span>
              <h3 style={cardTitleStyle}>{module.title}</h3>
              <p style={bodyStyle}>{module.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={splitSectionStyle}>
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <p style={eyebrowStyle}>QA and Approval Queue</p>
              <h2 style={headingStyle}>Current tasks</h2>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {automationQueue.map((item) => (
              <article key={item.id} style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <strong>{item.id}</strong>
                  <span style={{ color: toneColor[item.status] }}>{item.status}</span>
                </div>
                <h3 style={cardTitleStyle}>{item.title}</h3>
                <p style={bodyStyle}>{item.output}</p>
                <small style={{ color: '#8d867a' }}>{item.owner} / {item.approvalRequired ? 'approval required' : 'draft-safe'}</small>
              </article>
            ))}
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <p style={eyebrowStyle}>Prompt and Schedule Builder</p>
              <h2 style={headingStyle}>Preset production paths</h2>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {imageGenerationPresets.map((preset) => (
              <article key={preset.id} style={cardStyle}>
                <span style={{ color: toneColor[preset.status] }}>{preset.status}</span>
                <h3 style={cardTitleStyle}>{preset.label}</h3>
                <p style={bodyStyle}>{preset.promptMode}</p>
                <small style={{ color: '#8d867a' }}>{preset.outputTarget}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={eyebrowStyle}>Content Draft Generator</p>
            <h2 style={headingStyle}>Weekly planning board</h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(185px, 1fr))', gap: 12 }}>
          {schedulingTargets.map((target) => (
            <article key={target.day} style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <strong>{target.day}</strong>
                <span style={{ color: toneColor[target.automationState] }}>{target.automationState}</span>
              </div>
              <h3 style={cardTitleStyle}>{target.focus}</h3>
              <p style={bodyStyle}>{target.plannedOutput}</p>
              <small style={{ color: '#8d867a' }}>{target.channel}</small>
            </article>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={eyebrowStyle}>Media Persistence Next</p>
            <h2 style={headingStyle}>Site storage blueprint</h2>
          </div>
          <span style={{ color: toneColor.yellow }}>Not applied yet</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
          {['media_portfolios', 'media_assets', 'media_variants', 'media_videos', 'content_drafts', 'approval_receipts'].map((table) => (
            <article key={table} style={cardStyle}>
              <h3 style={cardTitleStyle}>{table}</h3>
              <p style={bodyStyle}>Draft Supabase persistence target for generated, uploaded, QA-scored, and approval-gated media.</p>
            </article>
          ))}
        </div>
        <p style={{ ...mutedBodyStyle, marginTop: 14 }}>Storage buckets planned: eden-images, eden-videos, eden-generated. Creating production tables and buckets remains approval-gated.</p>
      </section>
    </main>
  );
}

const pillLink = {
  color: '#f7f4ee',
  textDecoration: 'none',
  border: `1px solid ${border}`,
  background: surface,
  borderRadius: 999,
  padding: '10px 14px',
  fontSize: 13
};

const metricCard = {
  border: `1px solid ${border}`,
  background: surface,
  borderRadius: 8,
  padding: 18,
  display: 'grid',
  gap: 8
};

const sectionStyle = {
  border: `1px solid ${border}`,
  background: 'rgba(8, 8, 8, 0.86)',
  borderRadius: 8,
  padding: 18,
  marginBottom: 18
};

const splitSectionStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: 18
};

const sectionHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 18,
  marginBottom: 16,
  flexWrap: 'wrap' as const
};

const eyebrowStyle = {
  color: '#d6b56d',
  fontSize: 12,
  textTransform: 'uppercase' as const,
  margin: '0 0 6px',
  letterSpacing: 0
};

const headingStyle = {
  fontSize: 24,
  margin: 0,
  letterSpacing: 0
};

const cardStyle = {
  border: `1px solid ${border}`,
  background: 'rgba(255, 255, 255, 0.035)',
  borderRadius: 8,
  padding: 16,
  minHeight: 118
};

const cardTitleStyle = {
  fontSize: 18,
  margin: '10px 0 8px',
  letterSpacing: 0
};

const bodyStyle = {
  color: '#cfc7bb',
  fontSize: 14,
  lineHeight: 1.5,
  margin: '0 0 10px'
};

const mutedBodyStyle = {
  color: '#9f988c',
  fontSize: 13,
  lineHeight: 1.5,
  margin: 0
};

const numberBadge = {
  width: 34,
  height: 34,
  borderRadius: 999,
  border: '1px solid',
  display: 'grid',
  placeItems: 'center',
  fontWeight: 800
};

const statusDot = {
  width: 12,
  height: 12,
  borderRadius: 999,
  marginTop: 10
};

const statusPill = {
  display: 'inline-flex',
  border: '1px solid',
  borderRadius: 999,
  padding: '4px 9px',
  fontSize: 12,
  textTransform: 'uppercase' as const
};

const codeStyle = {
  display: 'block',
  color: '#d8d1c6',
  fontSize: 12,
  whiteSpace: 'normal' as const,
  wordBreak: 'break-word' as const
};

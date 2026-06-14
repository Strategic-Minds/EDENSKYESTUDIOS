'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import styles from './dashboard.module.css';
import { adminLinks, contentPlan, modelSummary, workflowSteps } from './admin-data';
import { automationLanes, automationQueue, imageGenerationPresets, schedulingTargets } from './automation-data';

export const dynamic = 'force-static';

function toneClass(tone: 'green' | 'yellow' | 'red') {
  if (tone === 'green') return styles.green;
  if (tone === 'red') return styles.red;
  return styles.yellow;
}

function badgeClass(tone: 'green' | 'yellow' | 'red') {
  if (tone === 'green') return styles.greenBadge;
  if (tone === 'red') return styles.redBadge;
  return styles.yellowBadge;
}

export default function EdenSourceImagesDashboard() {
  const [chatOpen, setChatOpen] = useState(false);
  const summary = useMemo(() => modelSummary(), []);
  const approvalsTotal = workflowSteps.find((step) => step.id === 'review')?.count ?? 0;
  const sourceMissing = Math.max(0, summary.sourceImagesNeeded - summary.sourceImagesReady);
  const readyAutomation = automationLanes.filter((lane) => lane.automationLevel === 'ready-for-test').length;
  const gatedAutomation = automationLanes.filter((lane) => lane.automationLevel === 'approval-gated').length;

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <div>
          <p>Eden Skye Studios Admin</p>
          <h1>Automation Command Center</h1>
          <span>Focus: automated discovery, content planning, schedule drafting, and image generation into the approval workflow.</span>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.chatToggle} type="button" onClick={() => setChatOpen(true)}>Open AI Chat</button>
          <Link className={styles.primaryButton} href="/eden-source-images/editor">Open Editor</Link>
        </div>
      </header>

      <section className={styles.workflow} aria-label="Automation workflow">
        {automationLanes.map((lane, index) => (
          <Link key={lane.id} href={lane.id === 'image-generation' ? '/eden-source-images/image-stack' : '/eden-source-images'} className={`${styles.step} ${toneClass(lane.status)}`}>
            <span>{index + 1}</span>
            <strong>{lane.label}</strong>
            <em>{lane.activeCount} active item{lane.activeCount === 1 ? '' : 's'} - {lane.automationLevel.replaceAll('-', ' ')}</em>
          </Link>
        ))}
      </section>

      <section className={styles.summaryGrid} aria-label="Automation summary">
        <div className={styles.metric}><b>{readyAutomation}</b><span>Automation lanes ready to test</span></div>
        <div className={styles.metric}><b>{gatedAutomation}</b><span>Approval-gated lanes</span></div>
        <div className={styles.metric}><b>{automationQueue.length}</b><span>Queued workflow jobs</span></div>
        <div className={styles.metric}><b>{imageGenerationPresets.length}</b><span>Image generation presets</span></div>
        <div className={styles.metric}><b>{sourceMissing}</b><span>Production source images still needed</span></div>
      </section>

      <section className={styles.mainGrid}>
        <div className={styles.panel}>
          <div className={styles.sectionHeader}>
            <div>
              <p>Automation lanes</p>
              <h2>What Eden should automate first</h2>
            </div>
            <Link className={styles.ghostButton} href="/eden-source-images/image-stack">Open image stack</Link>
          </div>
          <div className={styles.linkGrid}>
            {automationLanes.map((lane) => (
              <article className={styles.card} key={lane.id}>
                <span className={`${styles.badge} ${badgeClass(lane.status)}`}>{lane.status}</span>
                <h3>{lane.label}</h3>
                <span>{lane.goal}</span>
                <b style={{ color: '#fff', fontSize: 12 }}>Next: {lane.nextAction}</b>
                <span style={{ color: 'rgba(255,255,255,0.58)', fontSize: 11, lineHeight: 1.45 }}>{lane.guardrail}</span>
              </article>
            ))}
          </div>
        </div>

        <aside className={styles.panel}>
          <div className={styles.sectionHeader}>
            <div>
              <p>Action queue</p>
              <h2>Draft jobs</h2>
            </div>
          </div>
          <div className={styles.approvalList}>
            <ul>
              {automationQueue.map((item) => (
                <li key={item.id}>
                  <span>{item.title}</span>
                  <b>{item.approvalRequired ? 'Approval gated' : item.status}</b>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.sourceNote}>
            <b>Safe automation rule</b>
            <span>Eden can discover, draft, plan, prompt, and stage receipts. Live calendar writes, Metricool scheduling, Drive mutation, Shopify, and publishing stay gated.</span>
          </div>
        </aside>
      </section>

      <section className={styles.panel} style={{ marginTop: 12 }}>
        <div className={styles.sectionHeader}>
          <div>
            <p>Image generation</p>
            <h2>Prompt presets and receipt targets</h2>
          </div>
          <Link className={styles.ghostButton} href="/eden-source-images/editor">Create in editor</Link>
        </div>
        <div className={styles.linkGrid}>
          {imageGenerationPresets.map((preset) => (
            <article className={styles.card} key={preset.id}>
              <span className={`${styles.badge} ${badgeClass(preset.status)}`}>{preset.status}</span>
              <h3>{preset.label}</h3>
              <span>{preset.promptMode}</span>
              <b style={{ color: '#fff', fontSize: 12 }}>{preset.outputTarget}</b>
              <span style={{ color: 'rgba(255,255,255,0.58)', fontSize: 11, lineHeight: 1.45 }}>{preset.approvalGate}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} style={{ marginTop: 12 }}>
        <div className={styles.sectionHeader}>
          <div>
            <p>Schedule drafting</p>
            <h2>Weekly automation rhythm</h2>
          </div>
          <span className={styles.sourceNote}>Draft schedule only. Google Calendar and Metricool writes need explicit approval.</span>
        </div>
        <div className={styles.calendarGrid}>
          {schedulingTargets.map((day) => (
            <article className={`${styles.calendarCard} ${toneClass(day.automationState)}`} key={`${day.day}-${day.focus}`}>
              <p>{day.channel}</p>
              <h3>{day.day}</h3>
              <b>{day.focus}</b>
              <span>{day.plannedOutput}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} style={{ marginTop: 12 }}>
        <div className={styles.sectionHeader}>
          <div>
            <p>Admin pages</p>
            <h2>Supporting control panels</h2>
          </div>
          <Link className={styles.ghostButton} href="/eden-source-images/models">Open inventory</Link>
        </div>
        <div className={styles.linkGrid}>
          {adminLinks.map((link) => (
            <Link className={styles.card} href={link.href} key={link.href}>
              <span className={`${styles.badge} ${badgeClass(link.status)}`}>{link.status}</span>
              <h3>{link.label}</h3>
              <span>{link.helper}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.panel} style={{ marginTop: 12 }}>
        <div className={styles.sectionHeader}>
          <div>
            <p>Existing content plan</p>
            <h2>Manifest and approval calendar</h2>
          </div>
        </div>
        <div className={styles.calendarGrid}>
          {contentPlan.map((day) => (
            <article className={`${styles.calendarCard} ${toneClass(day.status)}`} key={`${day.day}-${day.date}`}>
              <p>{day.date}</p>
              <h3>{day.day}</h3>
              <b>{day.theme}</b>
              <span>{day.channel}</span>
              <footer><span>{day.deliverable}</span></footer>
            </article>
          ))}
        </div>
      </section>

      {chatOpen ? (
        <div className={styles.drawerScrim} role="dialog" aria-label="Eden AI chat drawer">
          <aside className={styles.drawerPanel}>
            <header>
              <div>
                <p>Eden AI</p>
                <h2>Automation Chat</h2>
                <span>Use this for discovery, planning, schedule drafts, image prompts, and receipt routing.</span>
              </div>
              <button className={styles.ghostButton} type="button" onClick={() => setChatOpen(false)}>Close</button>
            </header>
            <div className={styles.drawerMessages}>
              <div className={styles.message}><b>Eden</b><span>Tell me what to discover, plan, schedule, or generate. I will stage the work and keep live actions gated.</span></div>
              <div className={styles.message}><b>System</b><span>Drafting is open. Calendar writes, publishing, Drive mutation, Metricool scheduling, and production writes require verified approval.</span></div>
            </div>
            <div className={styles.drawerActions}>
              <label>
                Message Eden
                <textarea placeholder="Example: discover 10 content ideas, plan 7 posts, and create image prompts for the missing Eden source slots." />
              </label>
              <Link className={styles.primaryButton} href="/eden-source-images/editor">Open full editor</Link>
            </div>
          </aside>
        </div>
      ) : null}
    </main>
  );
}

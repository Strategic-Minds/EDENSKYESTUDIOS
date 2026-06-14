'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import styles from './dashboard.module.css';
import { adminLinks, contentPlan, modelSummary, workflowSteps } from './admin-data';

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

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <div>
          <p>Eden Skye Studios Admin</p>
          <h1>Command Dashboard</h1>
          <span>Start here: workflow, approvals, calendar, inventory, image stack, video stack, and editor access.</span>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.chatToggle} type="button" onClick={() => setChatOpen(true)}>Open AI Chat</button>
          <Link className={styles.primaryButton} href="/eden-source-images/editor">Open Editor</Link>
        </div>
      </header>

      <section className={styles.workflow} aria-label="Admin workflow">
        {workflowSteps.map((step) => (
          <Link key={step.id} href={step.href} className={`${styles.step} ${toneClass(step.tone)}`}>
            <span>{step.number}</span>
            <strong>{step.label}</strong>
            <em>{step.count} active item{step.count === 1 ? '' : 's'}</em>
          </Link>
        ))}
      </section>

      <section className={styles.summaryGrid} aria-label="Dashboard summary">
        <div className={styles.metric}><b>{approvalsTotal}</b><span>Total approvals waiting</span></div>
        <div className={styles.metric}><b>{summary.total}</b><span>Total models in admin manifest</span></div>
        <div className={styles.metric}><b>{summary.sourceImagesReady}/{summary.sourceImagesNeeded}</b><span>Source images ready</span></div>
        <div className={styles.metric}><b>{sourceMissing}</b><span>Source images still needed</span></div>
        <div className={styles.metric}><b>{summary.missing}</b><span>Models with no source image</span></div>
      </section>

      <section className={styles.mainGrid}>
        <div className={styles.panel}>
          <div className={styles.sectionHeader}>
            <div>
              <p>Admin pages</p>
              <h2>Where do you want to work?</h2>
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
        </div>

        <aside className={styles.panel}>
          <div className={styles.sectionHeader}>
            <div>
              <p>Approvals</p>
              <h2>Current gates</h2>
            </div>
          </div>
          <div className={styles.approvalList}>
            <ul>
              <li><span>Image approvals</span><b>{approvalsTotal}</b></li>
              <li><span>Missing source images</span><b>{sourceMissing}</b></li>
              <li><span>Video draft receipts</span><b>0 live / draft-only</b></li>
              <li><span>PR #8 image executor</span><b>Blocked</b></li>
            </ul>
          </div>
          <div className={styles.sourceNote}>
            <b>Source-image rule</b>
            <span>Any model without a usable source image shows an X in inventory until the manifest slot is filled and reviewed.</span>
          </div>
        </aside>
      </section>

      <section className={styles.panel} style={{ marginTop: 12 }}>
        <div className={styles.sectionHeader}>
          <div>
            <p>Google Calendar plan</p>
            <h2>Content plan for each day</h2>
          </div>
          <span className={styles.sourceNote}>Calendar sync is represented in admin now; live Google Calendar mutation still needs explicit approval.</span>
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
                <h2>Pull-out Chat</h2>
                <span>Use this for quick direction. Full image/video creation stays in the editor.</span>
              </div>
              <button className={styles.ghostButton} type="button" onClick={() => setChatOpen(false)}>Close</button>
            </header>
            <div className={styles.drawerMessages}>
              <div className={styles.message}><b>Eden</b><span>Tell me what you want to create, approve, organize, or fix. I will route it to the right admin surface.</span></div>
              <div className={styles.message}><b>System</b><span>Live publishing, Drive mutation, HeyGen generation, and calendar writes remain approval-gated.</span></div>
            </div>
            <div className={styles.drawerActions}>
              <label>
                Message Eden
                <textarea placeholder="Example: create three Eden Skye source-image prompts for the missing F-003 slot." />
              </label>
              <Link className={styles.primaryButton} href="/eden-source-images/editor">Open full editor</Link>
            </div>
          </aside>
        </div>
      ) : null}
    </main>
  );
}

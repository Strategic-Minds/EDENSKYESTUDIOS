import Link from 'next/link';
import { campaignImage } from '../site-data';

export default function AiChatPage() {
  return (
    <main className="chatPage">
      <header className="topNav"><Link className="brand" href="/">ES <span>AI Chat</span></Link><nav><Link href="/models">Models</Link><Link href="/closet">Closet</Link><Link href="/dashboard">Dashboard</Link></nav></header>
      <section className="chatFrame">
        <div className="videoPane" style={{ backgroundImage: `url(${campaignImage})` }}><span>AI video chat with Alexis</span></div>
        <div className="messagePane">
          <p className="kicker">Online now</p>
          <h1>Talk with Eden.</h1>
          {['Hey love. What are we creating today?', 'I want a luxury closet shoot.', 'Perfect. I can draft the look, scene, and approval packet.'].map((line, index) => <p className={index === 1 ? 'bubble mine' : 'bubble'} key={line}>{line}</p>)}
          <div className="composer">Type a message... <button>Send</button></div>
        </div>
      </section>
    </main>
  );
}

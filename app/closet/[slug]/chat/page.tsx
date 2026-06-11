import { Header } from '../../../components';
import { standaloneAssets } from '../../../visual-source-truth';
export default function Chat(){return <main className="eden-site"><Header/><section className="ai-chat-page"><aside><h2>AI Chat with Alexis</h2><p>Draft-safe, non-explicit membership support chat.</p></aside><img src={standaloneAssets.aiChat.src} alt="Generated standalone AI chat portrait"/><section><p>Hey love! What are we styling today?</p><p className="user-msg">Show me the black evening look.</p><input placeholder="Type a message..."/></section></section></main>}

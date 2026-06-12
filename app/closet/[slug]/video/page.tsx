import { Header } from '../../../components';
import { standaloneAssets } from '../../../visual-source-truth';
export default function Video(){return <main className="eden-site"><Header/><section className="video-chat-page"><div><h1>AI Video Chat</h1><p className="pink">with Alexis</p><img src={standaloneAssets.aiVideo.src} alt="Generated standalone AI video chat still"/></div><aside><h2>Chat</h2><p>Draft HeyGen session. No live video release without approval.</p><button className="hot-btn">End Call</button></aside></section></main>}

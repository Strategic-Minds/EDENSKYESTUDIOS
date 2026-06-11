import { Header, MissingAssetNotice } from '../../../components';
const envs=['Modern bedroom','Walk-in closet','Penthouse living room','Beach house','Luxury hotel','Rooftop terrace','Photo studio'];
export default function Viewer(){return <main className="eden-site"><Header/><section className="environment-page"><aside>{envs.map(e=><button key={e}>{e}</button>)}</aside><section className="missing-env"><h1>MISSING_ASSET</h1><p>Standalone environment images are required. No collage crop used.</p></section></section><MissingAssetNotice/></main>}

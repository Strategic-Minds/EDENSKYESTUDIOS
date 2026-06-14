import "../../closet-v2-real.css";
import { ClosetV2RealApp } from "../../ClosetV2RealApp";

const modelSlugs = ["alexis-voss", "eden-skye", "luna-moretti", "sienna-cole"];

export function generateStaticParams() {
  return modelSlugs.map((slug) => ({ slug }));
}

export const metadata = {
  title: "Model Profile | Eden's Closet",
  description: "Open a model profile, private gallery preview, wardrobe selector, and Black Card CTA."
};

export default function ClosetV2ModelProfilePage({ params }: { params: { slug: string } }) {
  return <ClosetV2RealApp view="profile" slug={params.slug} />;
}

import "../closet-v2-real.css";
import { ClosetV2RealApp } from "../ClosetV2RealApp";

export const metadata = {
  title: "Choose a Model | Eden's Closet",
  description: "Select an Eden's Closet model and open a private Black Card PWA experience."
};

export default function ClosetV2ModelsPage() {
  return <ClosetV2RealApp view="models" />;
}

import "../closet-v2-real.css";
import { ClosetV2RealApp } from "../ClosetV2RealApp";

export const metadata = {
  title: "360 Viewer | Eden's Closet",
  description: "Full-body Eden's Closet viewer with 360 angle frames and session controls."
};

export default function ClosetV2ViewerPage() {
  return <ClosetV2RealApp view="viewer" />;
}

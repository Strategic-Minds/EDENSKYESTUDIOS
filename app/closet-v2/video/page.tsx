import "../closet-v2-real.css";
import { ClosetV2RealApp } from "../ClosetV2RealApp";

export const metadata = {
  title: "AI Video Chat | Eden's Closet",
  description: "Black Card Eden's Closet AI video chat room and voice controls."
};

export default function ClosetV2VideoPage() {
  return <ClosetV2RealApp view="video" />;
}

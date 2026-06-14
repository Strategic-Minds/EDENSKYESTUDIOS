import "../closet-v2-real.css";
import { ClosetV2RealApp } from "../ClosetV2RealApp";

export const metadata = {
  title: "AI Chat | Eden's Closet",
  description: "Black Card Eden's Closet AI text and voice chat interface."
};

export default function ClosetV2ChatPage() {
  return <ClosetV2RealApp view="chat" />;
}

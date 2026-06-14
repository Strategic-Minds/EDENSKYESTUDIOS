import "../closet-v2-real.css";
import { ClosetV2RealApp } from "../ClosetV2RealApp";

export const metadata = {
  title: "Member Dashboard | Eden's Closet",
  description: "Black Card member dashboard for saved looks, private chats, video sessions, and access."
};

export default function ClosetV2DashboardPage() {
  return <ClosetV2RealApp view="dashboard" />;
}

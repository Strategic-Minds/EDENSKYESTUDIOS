import "./closet-v2.css";
import "./closet-v2-real.css";
import { ClosetV2RealApp } from "./ClosetV2RealApp";

export const metadata = {
  title: "Eden's Closet V2 | Eden Skye Studios",
  description:
    "A Black Card member PWA for Eden's Closet with ultra-lifelike model preview, wardrobe, environments, AI chat, voice, and video access."
};

export default function ClosetV2Page() {
  return <ClosetV2RealApp view="home" />;
}

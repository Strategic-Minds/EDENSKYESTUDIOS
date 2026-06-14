import "../closet-v2-real.css";
import { ClosetV2RealApp } from "../ClosetV2RealApp";

export const metadata = {
  title: "Virtual Closet | Eden's Closet",
  description: "Style wardrobe, outfit, hair, gesture, and session preferences for Eden's Closet."
};

export default function ClosetV2ClosetPage() {
  return <ClosetV2RealApp view="closet" />;
}

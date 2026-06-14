import "../closet-v2-real.css";
import { ClosetV2RealApp } from "../ClosetV2RealApp";

export const metadata = {
  title: "Environment Selector | Eden's Closet",
  description: "Choose bedroom, closet, penthouse, pool villa, studio, and private lounge environments."
};

export default function ClosetV2EnvironmentsPage() {
  return <ClosetV2RealApp view="environments" />;
}

import ReelsClient from "./ReelsClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/reels");

export default function ReelsPage() {
  return <ReelsClient />;
}

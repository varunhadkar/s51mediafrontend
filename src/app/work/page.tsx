// app/work/page.tsx
import WorkSection from '@/components/WorkSection';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata("/work");

export default function WorkPage() {
  // [PLACEHOLDER] Each project needs its own card/page with: title, format (feature/series/commercial),
  // our role, a 2-sentence summary, and the credit line
  // "Client/production: [NAME]. Studio 51 VFX delivered: [SERVICES]."
  return <WorkSection />;
}

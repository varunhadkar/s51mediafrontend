import type { ReactNode } from "react";

// Readable body-copy block (h2 + paragraphs/lists) in the site's dark style.
export default function CopySection({
  heading,
  children,
}: {
  heading?: string;
  children: ReactNode;
}) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-10 md:py-12">
      {heading && (
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
          {heading}
        </h2>
      )}
      <div className="text-zinc-400 text-base md:text-lg leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-zinc-300">
        {children}
      </div>
    </section>
  );
}

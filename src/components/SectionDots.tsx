"use client";

import { useEffect, useState } from "react";

// Figma: "section dots" (357:167). Sits left of the company sections and marks the one in view.
export function SectionDots({ ids, labels }: { ids: string[]; labels: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(ids.indexOf(entry.target.id));
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return (
    <nav aria-label="Company highlights" className="flex flex-col gap-[14px]">
      {ids.map((id, i) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={labels[i]}
          aria-current={i === active ? "true" : undefined}
          className={`block size-[10px] rounded-full border border-sunset transition-colors ${
            i === active ? "bg-sunset" : "bg-transparent hover:bg-sunset/40"
          }`}
        />
      ))}
    </nav>
  );
}

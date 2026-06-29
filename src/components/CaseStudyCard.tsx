"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

interface CaseStudyCardProps {
  slug: string;
  title: string;
  thumbnail: string;
  thumbnailAlt?: string;
  summary: string;
  tags: string[];
}

export function CaseStudyCard({
  slug,
  title,
  thumbnail,
  thumbnailAlt,
  summary,
  tags,
}: CaseStudyCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? (
        <Link href={`/works/${slug}`} className="group block opacity-0 translate-y-6 animate-[fadeUp_0.5s_ease-out_forwards]">
          <article className="overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={thumbnail}
                alt={thumbnailAlt || `${title} thumbnail`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-accent-orange transition-colors mb-2">
                {title}
              </h3>
              <p className="text-sm text-neutral-dark line-clamp-2 mb-3">
                {summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-neutral-warm/15 text-neutral-dark"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Link>
      ) : (
        <div className="aspect-[4/3] rounded-xl bg-neutral-warm/10 animate-pulse" />
      )}
    </div>
  );
}

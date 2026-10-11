// Figma: "tag" (357:193). Outline pill in sunset, label style.
export function Tag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block rounded-full border border-sunset px-[14px] py-[6px] label text-sunset whitespace-nowrap ${className}`}
    >
      {children}
    </span>
  );
}

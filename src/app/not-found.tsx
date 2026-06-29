import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6">
      <div className="text-center">
        <Image
          src="/ginny-404@2x.png"
          alt="Ginny looking confused"
          width={300}
          height={300}
          className="mx-auto mb-8"
          priority
        />
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
          404
        </h1>
        <p className="text-lg text-neutral-dark mb-8">
          Oops — this page doesn&apos;t exist. Maybe it wandered off.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 bg-accent-orange text-background font-medium rounded-lg hover:bg-accent-orange/90 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/works"
            className="px-8 py-3 border border-neutral-warm/40 text-foreground font-medium rounded-lg hover:border-accent-orange hover:text-accent-orange transition-colors"
          >
            View Works
          </Link>
        </div>
      </div>
    </section>
  );
}

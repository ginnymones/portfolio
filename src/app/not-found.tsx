import { Curve } from "@/components/Curve";
import { Button } from "@/components/ui/Button";

// Not in Figma yet: built from the V2 pieces. The old character is gone until the new illustration is ready.
export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-6 py-16">
      <div className="flex flex-col items-center gap-5 text-center">
        <h1 className="heading-1 text-burnt-sienna">404</h1>
        <Curve variant="fancy" className="h-[10.65px] w-[216px] text-neutral-black" />
        <p className="max-w-[420px] text-warm-gray">Uh-oh, looks like this page blasted off again.</p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
          <Button href="/works">View my work</Button>
          <Button variant="secondary" href="/tools">
            See my tools
          </Button>
        </div>
      </div>
    </section>
  );
}

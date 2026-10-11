// Hand-drawn curve exported from Figma (component "curve"). Paths are the
// original exports with the stroke switched to currentColor so the colour can
// follow the text. Do not redraw.
const CURVES = {
  fancy: {
    viewBox: "0 0 217.3 11.6491",
    d: "M0.500133 9.93897C43.9101 -7.29103 92.6401 10.199 139.35 9.52897C141.87 9.48897 144.28 8.57897 145.04 6.30897C145.92 3.68897 143.65 1.45897 140.97 0.788974C138.29 0.118974 133.46 0.368975 133.12 4.21897C132.69 9.12897 137.54 10.219 142.42 10.859C147.3 11.499 152.14 9.77897 156.88 8.43897C176.46 2.91897 197.8 3.88897 216.8 11.149",
  },
  simple: {
    viewBox: "0 0 219.72 10.864",
    d: "M0.500074 2.51513C6.73007 1.51513 13.0201 0.525129 19.3201 0.815129C24.7901 1.06513 30.1601 2.29513 35.5801 3.10513C45.2401 4.55513 55.0301 4.71513 64.8001 4.87513C94.8701 5.35513 125.01 -2.40487 154.81 1.70513C164.67 3.06513 174.41 5.71513 184.36 5.72513C196.03 5.72513 207.73 2.09513 219.22 4.12513",
  },
} as const;

interface CurveProps {
  variant?: "fancy" | "simple";
  className?: string;
  /**
   * Stroke width in CSS px, kept constant however the curve is stretched.
   * Leave unset to use the exported 1-unit stroke, which scales with the curve.
   */
  strokeWidth?: number;
}

export function Curve({ variant = "fancy", className = "", strokeWidth }: CurveProps) {
  const { viewBox, d } = CURVES[variant];
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      preserveAspectRatio="none"
      fill="none"
      overflow="visible"
      className={`block ${className}`}
    >
      <path
        d={d}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...(strokeWidth ? { strokeWidth, vectorEffect: "non-scaling-stroke" as const } : {})}
      />
    </svg>
  );
}

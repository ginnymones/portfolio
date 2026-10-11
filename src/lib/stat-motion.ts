// Animated image stacks for company stats. Layers are listed bottom to top; each fades out on its own
// CSS keyframe (see "Stat motion" in globals.css). Boxes are in px inside the Figma frame, which is
// scaled to cover the image slot.
// Figma: elev_grewportfolio (486:174, 12s boomerang) and elev_addtocart (493:831, 7s loop), 2026-10-10.

export interface StatMotionLayer {
  src: string;
  /** Box in px inside the frame: left, top, width, height */
  box: [number, number, number, number];
  /** CSS class holding this layer's fade keyframes; omit for the static base layer */
  animationClass?: string;
  /** Figma crop of the image inside its box, in % of the box */
  crop?: { left: number; top: number; width: number; height: number };
}

export interface StatMotionPreset {
  frame: { width: number; height: number };
  background: string;
  layers: StatMotionLayer[];
}

const CART_CROP = { left: -1.08, top: -0.79, width: 101.08, height: 111.57 };

export const STAT_MOTIONS: Record<string, StatMotionPreset> = {
  "elevation-portfolio": {
    frame: { width: 482, height: 208 },
    background: "#dac6a3",
    layers: [
      { src: "/images/home/elevation/portfolio-0.jpg", box: [-17, -38.3, 521, 318] },
      { src: "/images/home/elevation/portfolio-3.jpg", box: [-17, -48.3, 521, 318], animationClass: "stat-motion-pf-d" },
      { src: "/images/home/elevation/portfolio-2.jpg", box: [-17, -38.3, 521, 318], animationClass: "stat-motion-pf-c" },
      { src: "/images/home/elevation/portfolio-1.jpg", box: [-17, -38.3, 521, 318], animationClass: "stat-motion-pf-b" },
      { src: "/images/home/elevation/portfolio-0.jpg", box: [-17, -38.3, 521, 318], animationClass: "stat-motion-pf-a" },
    ],
  },
  "elevation-cart": {
    frame: { width: 482, height: 208 },
    background: "#dac6a3",
    layers: [
      { src: "/images/home/elevation/cart-0.jpg", box: [-16, -39.3, 521, 318], crop: CART_CROP },
      { src: "/images/home/elevation/cart-1.jpg", box: [-19, -24, 528, 322], animationClass: "stat-motion-cart-b" },
      { src: "/images/home/elevation/cart-0.jpg", box: [-16, -39.3, 521, 318], crop: CART_CROP, animationClass: "stat-motion-cart-a" },
    ],
  },
};

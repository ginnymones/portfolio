"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface CharacterProps {
  className?: string;
  variant?: "home" | "mini";
}

export function Character({ className = "", variant }: CharacterProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  const isHome = variant === "home";
  const isMini = variant === "mini" || (variant === undefined && pathname !== "/");

  // Don't render the layout instance on home (it's rendered inline instead)
  const shouldHide = variant === undefined && pathname === "/";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.38; // Eyes are ~38% from top

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxOffset = 3; // Max pixels the pupils move

      const normalizedX = distance > 0 ? (dx / distance) * Math.min(maxOffset, distance / 50) : 0;
      const normalizedY = distance > 0 ? (dy / distance) * Math.min(maxOffset, distance / 50) : 0;

      setEyeOffset({ x: normalizedX, y: normalizedY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const sizeClass = isHome
    ? "w-[240px] h-auto md:w-[320px]"
    : "w-[64px] h-auto md:w-[80px]";

  const positionClass = isMini
    ? "fixed bottom-6 left-6 z-30"
    : "";

  if (shouldHide) return null;

  return (
    <div
      ref={containerRef}
      className={`transition-all duration-500 ease-in-out ${sizeClass} ${positionClass} ${className}`}
    >
      <svg
        viewBox="0 0 377 476"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Hair left */}
        <path d="M98.5 41.1924C130.5 23.1924 157.5 41.6924 167 53.1924C164.5 92.6924 147.4 185.092 99 238.692C50.6 292.292 9.5 250.692 5.00001 222.692C2.50001 211.359 2.20001 186.292 21 176.692C39.8 167.092 49.5 134.359 52 119.192C57.2 77.1924 85.1667 49.6924 98.5 41.1924Z" fill="#4F2F17"/>
        {/* Hair right */}
        <path d="M276 28.6927C216.8 -28.1073 155.333 12.3594 132 39.6927C169.333 96.3593 248.4 215.292 266 237.692C283.6 260.092 326.667 255.692 346 250.692C391.6 230.692 377 195.026 364 179.692C351.2 170.892 343.333 137.359 341 121.692C332.2 81.6924 294 43.0259 276 28.6927Z" fill="#4F2F17"/>
        {/* Hair details */}
        <path d="M310.5 67.1924C314.5 70.5257 323.5 75.1924 327.5 67.1924" stroke="#4F2F17" strokeWidth="5" strokeLinecap="round"/>
        <path d="M353 174.692C357 178.026 366 182.692 370 174.692" stroke="#4F2F17" strokeWidth="5" strokeLinecap="round"/>
        {/* Neck */}
        <rect x="168" y="225.692" width="33" height="60" rx="16" fill="#E8BA97"/>
        {/* Face */}
        <rect x="88" y="81.6924" width="192" height="174" rx="65" fill="#F0C4A2"/>
        {/* Bangs */}
        <path d="M100.444 159.757C136.889 151.115 173.404 103.821 187.106 81.2546C182.573 61.3969 160.778 72.4836 150.447 80.5092C136.573 106.277 101.455 125.142 85.6305 131.353C58.0021 135.183 70.8804 156.315 68.5096 153.018C72.2595 162.314 91.362 161.384 100.444 159.757Z" fill="#4F2F17"/>
        <path d="M86.3418 141.77C123.172 134.958 162.003 89.5465 176.815 67.6922C173.279 47.633 150.957 57.6177 140.238 65.1175C125.095 90.1609 89.0795 107.249 72.9645 112.662C45.1793 115.108 56.9865 136.856 54.7833 133.445C58.0644 142.917 77.1894 142.942 86.3418 141.77Z" fill="#4F2F17"/>
        <path d="M89.5332 114.638C121.313 113.283 159.359 79.7056 174.41 63.0865C173.817 45.7983 153.861 51.5444 143.957 56.5784C128.25 75.84 95.9342 85.9333 81.74 88.5722C58.0844 87.3299 65.4311 107.02 63.9834 103.891C65.6179 112.245 81.6976 114.537 89.5332 114.638Z" fill="#4F2F17"/>
        <path d="M57 130.692C56 140.192 47.7 157.892 44.5 162.692" stroke="#6F4627" strokeWidth="5" strokeLinecap="round"/>
        <path d="M33 174.192C26.5 178.526 13.1 184.592 11.5 174.192" stroke="#4F2F17" strokeWidth="5" strokeLinecap="round"/>
        <path d="M132 41.6929C119 39.0263 71 50.1923 62 117.692" stroke="#6F4627" strokeWidth="5" strokeLinecap="round"/>
        {/* Hair right side strands */}
        <path d="M286.269 159.033C243.133 158.153 190.531 113.768 169.621 91.6857C169.903 68.2247 197.137 75.4151 210.719 81.9429C232.599 107.589 276.724 120.301 296.051 123.452C328.091 121.055 318.722 147.977 320.591 143.689C318.627 155.067 296.891 158.659 286.269 159.033Z" fill="#4F2F17"/>
        <path d="M287.07 136.749C244 139.289 188.045 99.2119 165.452 78.8558C163.874 55.4462 191.592 60.456 205.649 65.8871C229.492 89.7185 274.486 98.8949 294.002 100.504C325.751 95.5755 318.545 123.155 320.068 118.733C319.011 130.231 297.629 135.534 287.07 136.749Z" fill="#4F2F17"/>
        <path d="M277.302 113.857C239.14 116.797 188.87 82.1404 168.505 64.4448C166.732 43.7056 191.398 47.7075 203.953 52.3008C225.482 73.0591 265.537 80.4814 282.873 81.5977C310.956 76.7198 305.004 101.298 306.285 97.3512C305.531 107.567 286.649 112.612 277.302 113.857Z" fill="#4F2F17"/>
        <path d="M216.5 9.19251C225.333 6.69251 249.3 8.49251 274.5 35.6925C282.667 43.3591 300.3 61.1924 305.5 71.1924" stroke="#6F4627" strokeWidth="5" strokeLinecap="round"/>

        {/* Eyes - pupils follow cursor */}
        <g>
          {/* Left eye */}
          <circle cx={142.5 + eyeOffset.x} cy={183.192 + eyeOffset.y} r="7.5" fill="black"/>
          <circle cx={145.5 + eyeOffset.x * 0.5} cy={180.192 + eyeOffset.y * 0.5} r="1.5" fill="white"/>
          {/* Right eye */}
          <circle cx={225.5 + eyeOffset.x} cy={183.192 + eyeOffset.y} r="7.5" fill="black"/>
          <circle cx={228.5 + eyeOffset.x * 0.5} cy={180.192 + eyeOffset.y * 0.5} r="1.5" fill="white"/>
        </g>

        {/* Legs */}
        <rect x="132.97" y="397.692" width="20" height="60" rx="10" fill="#F0C4A2"/>
        <rect x="170" y="439.818" width="36" height="55" rx="18" transform="rotate(90 170 439.818)" fill="#FAFAFA"/>
        <mask id="mask0_char" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="115" y="439" width="55" height="37">
          <rect x="170" y="439.818" width="36" height="55" rx="18" transform="rotate(90 170 439.818)" fill="#FAFAFA"/>
        </mask>
        <g mask="url(#mask0_char)">
          <rect x="115" y="467.818" width="55" height="10" fill="#B7AF9A"/>
          <path d="M138 443.318H148" stroke="#B7AF9A" strokeWidth="2" strokeLinecap="round"/>
          <path d="M138 446.818H148" stroke="#B7AF9A" strokeWidth="2" strokeLinecap="round"/>
        </g>
        <rect x="215.97" y="397.692" width="20" height="60" rx="10" fill="#F0C4A2"/>
        <rect x="253" y="439.818" width="36" height="55" rx="18" transform="rotate(90 253 439.818)" fill="#FAFAFA"/>
        <mask id="mask1_char" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="198" y="439" width="55" height="37">
          <rect x="253" y="439.818" width="36" height="55" rx="18" transform="rotate(90 253 439.818)" fill="#FAFAFA"/>
        </mask>
        <g mask="url(#mask1_char)">
          <rect x="198" y="467.818" width="55" height="10" fill="#B7AF9A"/>
          <path d="M221 443.318H231" stroke="#B7AF9A" strokeWidth="2" strokeLinecap="round"/>
          <path d="M221 446.818H231" stroke="#B7AF9A" strokeWidth="2" strokeLinecap="round"/>
        </g>

        {/* Blush */}
        <g opacity="0.3">
          <ellipse cx="120" cy="198.192" rx="12" ry="7.5" fill="#D48B99"/>
          <ellipse cx="245" cy="198.192" rx="12" ry="7.5" fill="#D48B99"/>
        </g>

        {/* Mouth */}
        <path d="M138 207.692C153.167 214.359 192.7 223.692 229.5 207.692" stroke="black" strokeWidth="5" strokeLinecap="round"/>

        {/* Ears */}
        <rect x="79" y="168.692" width="10" height="30" rx="5" fill="#D9AB88"/>
        <rect x="280" y="168.692" width="10" height="30" rx="5" fill="#D9AB88"/>

        {/* Body/torso */}
        <rect x="100" y="309.692" width="168" height="99" rx="30" fill="#AF8769"/>
        <rect x="100" y="309.692" width="168" height="72" rx="10" fill="#A57A58"/>
        <path d="M183.5 387.692L196.057 408.692H170.943L183.5 387.692Z" fill="#906C50"/>

        {/* Arms */}
        <rect x="72.636" y="302.608" width="20" height="60" rx="10" transform="rotate(50.2403 72.636 302.608)" fill="#F0C4A2"/>
        <rect x="35.3618" y="321.912" width="38" height="46" rx="19" transform="rotate(50.2403 35.3618 321.912)" fill="#F0C4A2"/>
        <rect width="20" height="60" rx="10" transform="matrix(-0.639569 0.768734 0.768734 0.639569 294.548 300.608)" fill="#F0C4A2"/>
        <rect width="38" height="46" rx="19" transform="matrix(-0.639569 0.768734 0.768734 0.639569 331.822 319.912)" fill="#F0C4A2"/>

        {/* Shirt */}
        <path d="M88.0001 289.692C88.0001 273.124 101.432 259.692 118 259.692H250C266.569 259.692 280 273.124 280 289.692V347.692C280 364.261 266.569 377.692 250 377.692H118C101.432 377.692 88.0001 364.261 88.0001 347.692V289.692Z" fill="#FAFAFA"/>
        <path d="M109.023 261.295L104.235 341.693L37.002 297.348L109.023 261.295Z" fill="#FAFAFA"/>
        <path d="M259.817 261.295L264.605 341.693L331.838 297.348L259.817 261.295Z" fill="#FAFAFA"/>
        <mask id="mask2_char" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="37" y="259" width="295" height="119">
          <path d="M88.0001 289.692C88.0001 273.124 101.432 259.692 118 259.692H250C266.569 259.692 280 273.124 280 289.692V347.692C280 364.261 266.569 377.692 250 377.692H118C101.432 377.692 88.0001 364.261 88.0001 347.692V289.692Z" fill="#7C2D2D"/>
          <path d="M109.023 261.295L104.235 341.693L37.002 297.348L109.023 261.295Z" fill="#7C2D2D"/>
          <path d="M259.817 261.295L264.605 341.693L331.838 297.348L259.817 261.295Z" fill="#7C2D2D"/>
        </mask>
        <g mask="url(#mask2_char)">
          <rect x="37" y="259.692" width="295" height="26" fill="#F3C041"/>
          <rect x="37" y="305.692" width="295" height="26" fill="#F3C041"/>
          <rect x="37" y="351.692" width="295" height="26" fill="#F3C041"/>
          <path d="M89.5 330.692L90.5 308.692" stroke="#E6AD1E" strokeWidth="2" strokeLinecap="round"/>
          <path d="M279.5 330.692L278.5 308.692" stroke="#E6AD1E" strokeWidth="2" strokeLinecap="round"/>
        </g>

        {/* Glasses */}
        <path d="M136.365 76.4641C153.784 76.928 167.139 89.1603 166.762 103.29C166.386 117.419 152.4 128.923 134.98 128.459C117.561 127.995 104.207 115.763 104.583 101.634C104.96 87.5043 118.946 76.0002 136.365 76.4641Z" fill="#FAFAFA" fillOpacity="0.3" stroke="#CE691B" strokeWidth="3"/>
        <path d="M230.059 78.9592C247.478 79.4231 260.832 91.6554 260.456 105.785C260.079 119.914 246.093 131.418 228.674 130.954C211.255 130.49 197.9 118.258 198.277 104.129C198.653 89.9994 212.639 78.4953 230.059 78.9592Z" fill="#FAFAFA" fillOpacity="0.3" stroke="#CE691B" strokeWidth="3"/>
        <path d="M167.25 103.053C173.268 100.325 186.58 96.6367 197.802 103.866" stroke="#CE691B" strokeWidth="3" strokeLinecap="round"/>
        <path d="M104.707 103.118C99.0601 101.572 87.8761 102.553 88.3163 118.848L88.9629 142.78" stroke="#CE691B" strokeWidth="3" strokeLinecap="round"/>
        <path d="M261.654 103.079C267.21 101.231 278.431 101.607 278.871 117.901L279.517 141.834" stroke="#CE691B" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

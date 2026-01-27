import { cn } from "@/lib/utils";
import { Shield, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

interface TrustScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function getTrustScoreInfo(score: number) {
  if (score >= 85) return { label: "Excellent", color: "text-emerald-500", bg: "bg-emerald-500/10", Icon: ShieldCheck };
  if (score >= 70) return { label: "Good", color: "text-green-500", bg: "bg-green-500/10", Icon: ShieldCheck };
  if (score >= 50) return { label: "Average", color: "text-yellow-500", bg: "bg-yellow-500/10", Icon: Shield };
  if (score >= 30) return { label: "Poor", color: "text-orange-500", bg: "bg-orange-500/10", Icon: ShieldAlert };
  return { label: "Risky", color: "text-red-500", bg: "bg-red-500/10", Icon: ShieldX };
}

export function TrustScoreBadge({ score, size = "md", showLabel = true, className }: TrustScoreBadgeProps) {
  const { label, color, bg, Icon } = getTrustScoreInfo(score);
  
  const sizeClasses = {
    sm: "text-sm px-2 py-1 gap-1.5",
    md: "text-base px-3 py-1.5 gap-2",
    lg: "text-lg px-4 py-2 gap-2.5",
  };

  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full font-semibold",
        sizeClasses[size],
        bg,
        color,
        className
      )}
      data-testid="badge-trust-score"
    >
      <Icon className={iconSizes[size]} />
      <span>{score}</span>
      {showLabel && <span className="text-muted-foreground font-normal">/ 100</span>}
    </div>
  );
}

export function TrustScoreCircle({ score, size = 80 }: { score: number; size?: number }) {
  const { color, Icon } = getTrustScoreInfo(score);
  const strokeWidth = size / 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={color}
          style={{ transition: "stroke-dashoffset 0.5s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Icon className={cn("h-4 w-4 mb-0.5", color)} />
        <span className={cn("font-bold text-lg", color)}>{score}</span>
      </div>
    </div>
  );
}

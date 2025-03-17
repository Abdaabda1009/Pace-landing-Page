import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export const LoadingSpinner = ({
  size = 24,
  color = "text-blue-500",
}: LoadingSpinnerProps) => {
  return (
    <Loader2
      className={`animate-spin ${color}`}
      style={{ width: size, height: size }}
    />
  );
};

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  variant?: "header" | "footer";
  className?: string;
}

export function BrandLogo({ variant = "header", className }: BrandLogoProps) {
  const isHeader = variant === "header";

  return (
    <Link href="/" className={cn("group flex shrink-0 items-center", className)}>
      <Image
        src="/logo.png"
        alt="Capital Solar Energy"
        width={215}
        height={67}
        className={cn(
          "h-auto w-auto object-contain transition-opacity duration-200 group-hover:opacity-90",
          isHeader ? "max-h-9 w-auto sm:max-h-10" : "max-h-12 sm:max-h-14"
        )}
        priority={isHeader}
      />
    </Link>
  );
}

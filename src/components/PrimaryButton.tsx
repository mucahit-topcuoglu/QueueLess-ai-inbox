import Link from "next/link";

type PrimaryButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const variants = {
  primary: "bg-emerald-400 text-neutral-950 hover:bg-emerald-300",
  secondary: "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50",
  dark: "border border-white/15 bg-white/5 text-white hover:bg-white/10"
};

export function PrimaryButton({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick
}: PrimaryButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-black transition ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

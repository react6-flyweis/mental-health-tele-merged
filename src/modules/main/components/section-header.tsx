import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

type Align = "left" | "center";

const sectionHeaderVariants = cva("", {
  variants: {
    align: {
      center: "text-center",
      left: "text-left",
    },
  },
  defaultVariants: {
    align: "center",
  },
});

const headingVariants = cva(
  "flex flex-wrap gap-2 text-3xl md:text-4xl font-semibold leading-tight",
  {
    variants: {
      align: {
        center: "justify-center",
        left: "justify-start",
      },
    },
    defaultVariants: {
      align: "center",
    },
  },
);

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  description?: string;
  align?: Align;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  as: Heading = "h2",
  className,
  children,
  ...props
}: SectionHeaderProps) {
  return (
    <div className={cn(sectionHeaderVariants({ align }), className)} {...props}>
      <Heading className={cn(headingVariants({ align }))}>
        <span className="text-primary">{title}</span>
        {subtitle && <span className="text-slate-900">{subtitle}</span>}
      </Heading>
      {description && (
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

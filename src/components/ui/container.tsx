import { cn } from "@/lib/utils";

type MaxWidth =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "full";

const maxWidthMap: Record<MaxWidth, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Constrain inner content to a max width (applied with mx-auto) */
  maxWidth?: MaxWidth;
  /** Render as a different HTML element */
  as?: React.ElementType;
}

export function Container({
  maxWidth = "6xl",
  as: Comp = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Comp
      className={cn(
        "container mx-auto px-4 md:px-6",
        maxWidth && `${maxWidthMap[maxWidth]} mx-auto`,
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

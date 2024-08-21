import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (<div className={cn("animate-pulse rounded-lg bg-slate-400", className)} {...props} />);
}

export { Skeleton }

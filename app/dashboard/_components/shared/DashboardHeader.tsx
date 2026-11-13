export default function DashboardHeader({
  name,
  title,
  description,
  accountLabel,
  className = "",
}: {
  name: string;
  title: string;
  description: string;
  accountLabel: string;
  className?: string;
}) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <header className={`flex items-center justify-between gap-4 border-b px-5 py-5 sm:px-8 lg:px-10 ${className}`}>
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden text-[11px] font-semibold text-muted-foreground sm:block">
          {accountLabel}
        </span>
        <span
          aria-label={name}
          className="flex size-11 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary"
        >
          {initials}
        </span>
      </div>
    </header>
  );
}

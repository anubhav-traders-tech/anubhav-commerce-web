type BadgeVariant = 'success' | 'error' | 'warning' | 'info'

type BadgeProps = {
  label: string
  variant: BadgeVariant
}

export function Badge({ label, variant }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    success: 'bg-status-success text-text-inverse',
    error: 'bg-status-error text-text-inverse',
    warning: 'bg-status-warning text-text-inverse',
    info: 'bg-status-info text-text-inverse',
  }

  return (
    <span
      className={`px-sm py-xs rounded-full text-small font-body ${variants[variant]}`}
    >
      {label}
    </span>
  )
}

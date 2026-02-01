type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'sm' | 'md'

type ButtonProps = {
  label: string
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  onClick?: () => void
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center transition rounded-md font-button text-button focus:outline-none'

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-primary text-text-inverse hover:bg-primary/90',
    secondary:
      'bg-secondary text-text-inverse hover:bg-secondary/90',
  }

  const sizes: Record<ButtonSize, string> = {
    sm: 'px-sm py-xs',
    md: 'px-md py-sm',
  }

  const disabledStyles = 'opacity-50 cursor-not-allowed'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        base,
        variants[variant],
        sizes[size],
        disabled ? disabledStyles : '',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

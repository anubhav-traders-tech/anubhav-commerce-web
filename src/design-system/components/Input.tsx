type InputState = 'normal' | 'error'

type InputProps = {
  placeholder?: string
  disabled?: boolean
  state?: InputState
}

export function Input({
  placeholder,
  disabled = false,
  state = 'normal',
}: InputProps) {
  const base =
    'w-full px-md py-sm rounded-md text-body font-body bg-background-page border focus:outline-none'

  const states: Record<InputState, string> = {
    normal:
      'border-border focus:border-primary',
    error:
      'border-status-error text-status-error focus:border-status-error',
  }

  const disabledStyles =
    'opacity-50 cursor-not-allowed bg-background-subtle'

  return (
    <input
      type="text"
      placeholder={placeholder}
      disabled={disabled}
      className={[
        base,
        states[state],
        disabled ? disabledStyles : '',
      ].join(' ')}
    />
  )
}

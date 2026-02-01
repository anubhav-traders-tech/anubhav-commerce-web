import type { ReactNode } from 'react'

type ModalProps = {
  open: boolean
  title: string
  children: ReactNode
}

export function Modal({ open, title, children }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-md">
      <div className="bg-background-page rounded-md p-lg w-full max-w-md">
        <h2 className="text-h2 font-heading text-text-heading mb-md">
          {title}
        </h2>
        {children}
      </div>
    </div>
  )
}

import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
}

export function Card({ children }: CardProps) {
  return (
    <div className="bg-background-card border border-border rounded-md p-md">
      {children}
    </div>
  )
}

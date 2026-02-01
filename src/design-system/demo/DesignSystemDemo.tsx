import { Button, Input, Card, Badge, Loader, Modal } from '../components'
import { useState } from 'react'

export function DesignSystemDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-md space-y-lg bg-background-page">
      {/* Typography */}
      <div>
        <h1 className="text-h1 font-heading text-text-heading">H1 Heading</h1>
        <h2 className="text-h2 font-heading">H2 Heading</h2>
        <h3 className="text-h3 font-heading">H3 Heading</h3>
        <p className="text-body">Body text</p>
        <p className="text-small">Small text</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-sm">
        <Button label="Primary" />
        <Button label="Secondary" variant="secondary" />
        <Button label="Disabled" disabled />
      </div>

      {/* Inputs */}
      <div className="space-y-sm max-w-sm">
        <Input placeholder="Normal input" />
        <Input placeholder="Error input" state="error" />
        <Input placeholder="Disabled input" disabled />
      </div>

      {/* Card */}
      <Card>
        <p className="text-body">This is a card component</p>
      </Card>

      {/* Badges */}
      <div className="flex gap-sm">
        <Badge label="In Stock" variant="success" />
        <Badge label="Out of Stock" variant="error" />
        <Badge label="GST" variant="info" />
      </div>

      {/* Loader */}
      <Loader />

      {/* Modal */}
      <Button label="Open Modal" onClick={() => setOpen(true)} />
      <Modal open={open} title="Demo Modal">
        <p className="text-body mb-md">Modal content</p>
        <Button label="Close" onClick={() => setOpen(false)} />
      </Modal>
    </div>
  )
}

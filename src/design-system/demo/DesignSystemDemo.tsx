import { Button } from '../components'

export function DesignSystemDemo() {
  return (
    <div className="p-md space-y-md bg-background-page">
      <h1 className="text-h1 font-heading text-text-heading">
        Button Variants
      </h1>

      <div className="flex gap-sm">
        <Button label="Primary" />
        <Button label="Secondary" variant="secondary" />
        <Button label="Disabled" disabled />
      </div>

      <div className="flex gap-sm">
        <Button label="Small" size="sm" />
        <Button label="Medium" size="md" />
      </div>
    </div>
  )
}

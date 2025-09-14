import { useState } from 'react';

export default function StyleGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary p-8">
      {/* Typography */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-primary">Typography</h2>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary">Heading 1</h1>
          <h2 className="text-3xl font-bold text-primary">Heading 2</h2>
          <h3 className="text-2xl font-bold text-primary">Heading 3</h3>
          <p className="text-lg text-primary">Regular paragraph text</p>
          <p className="text-sm text-primary-dark">Small text with muted color</p>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-primary">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="rounded-lg bg-primary px-4 py-2 text-secondary hover:bg-primary-dark">
            Primary Button
          </button>
          <button className="rounded-lg border border-primary bg-secondary px-4 py-2 text-primary hover:bg-secondary-light">
            Secondary Button
          </button>
          <button className="rounded-lg bg-accent px-4 py-2 text-secondary hover:bg-accent-dark">
            Accent Button
          </button>
          <button disabled className="rounded-lg bg-primary px-4 py-2 text-secondary opacity-50">
            Disabled Button
          </button>
        </div>
      </section>

      {/* Cards */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-primary">Cards</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-secondary p-6 shadow-lg ring-1 ring-primary/10">
            <h3 className="mb-2 text-xl font-semibold text-primary">Basic Card</h3>
            <p className="text-primary-dark">Card content goes here.</p>
          </div>
          <div className="rounded-lg bg-secondary-light p-6 shadow-lg ring-1 ring-primary/10">
            <h3 className="mb-2 text-xl font-semibold text-primary">Highlighted Card</h3>
            <p className="text-primary-dark">Card with lighter background.</p>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-primary">Form Elements</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-primary">Input Field</label>
            <input
              type="text"
              className="w-full rounded-lg bg-secondary-light p-2 text-primary placeholder-primary-dark/50 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter text here"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-primary">Select Menu</label>
            <select className="w-full rounded-lg bg-secondary-light p-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-primary bg-secondary-light text-primary focus:ring-2 focus:ring-primary"
            />
            <label className="ml-2 text-sm text-primary">Checkbox</label>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-primary">Alerts</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-primary bg-primary/10 p-4 text-primary">
            <h3 className="font-semibold">Primary Alert</h3>
            <p className="mt-1 text-sm">This is a primary alert message.</p>
          </div>
          <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-500">
            <h3 className="font-semibold">Error Alert</h3>
            <p className="mt-1 text-sm">This is an error alert message.</p>
          </div>
          <div className="rounded-lg border border-green-500 bg-green-500/10 p-4 text-green-500">
            <h3 className="font-semibold">Success Alert</h3>
            <p className="mt-1 text-sm">This is a success alert message.</p>
          </div>
        </div>
      </section>

      {/* Modal Example */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-primary">Modal</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-lg bg-primary px-4 py-2 text-secondary hover:bg-primary-dark"
        >
          Open Modal
        </button>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-secondary p-6 shadow-xl">
              <h3 className="mb-4 text-xl font-bold text-primary">Modal Title</h3>
              <p className="mb-4 text-primary-dark">This is an example modal dialog.</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded bg-secondary-light px-4 py-2 text-primary hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded bg-primary px-4 py-2 text-secondary hover:bg-primary-dark"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
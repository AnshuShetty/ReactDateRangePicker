# Custom Date Range Picker

This repository contains a single React component: the Custom Date Range Picker.

- Component: CustomDateRangePicker.tsx ([CustomDateRangePicker.tsx](CustomDateRangePicker.tsx))

## Purpose

This code implements the 1st component as designed in the Figma file (the date-range picker UI). It is a standalone React/TypeScript component intended to be integrated into an existing React project.

> Note: This implementation currently does not include a dark mode. You can customize styles to add dark mode support.

## Requirements

- A React project (v16.8+ recommended for hooks) using TypeScript or JavaScript.
- Node.js and npm or Yarn.

Optional (depending on implementation inside the component):

- If the component uses a date utility library (e.g., `date-fns`, `moment`) you may need to install it. Inspect `CustomDateRangePicker.tsx` to confirm.

## Installation

1. Copy the file `CustomDateRangePicker.tsx` into your React project's component folder (for example `src/components/`).

2. Install peer dependencies if needed. Common commands:

Using npm:

```bash
npm install react react-dom
# install TypeScript types if needed
npm install -D typescript @types/react @types/react-dom
```

Using Yarn:

```bash
yarn add react react-dom
yarn add -D typescript @types/react @types/react-dom
```

If `CustomDateRangePicker.tsx` uses any date utility library (check import lines) install that too, for example:

```bash
npm install date-fns
# or
yarn add date-fns
```

## Usage (example)

Drop the component into your project and import it where you need the date-range picker.

Example in a TypeScript React app:

```tsx
import React, { useState } from "react";
import CustomDateRangePicker from "./components/CustomDateRangePicker";

function App() {
  const [range, setRange] = useState({ start: null, end: null });

  return (
    <div style={{ padding: 24 }}>
      <h2>Select Date Range</h2>
      <CustomDateRangePicker
        value={range}
        onChange={(newRange) => setRange(newRange)}
      />
      <pre>{JSON.stringify(range, null, 2)}</pre>
    </div>
  );
}

export default App;
```

Adjust the import path depending on where you place the file.

## Props & Integration notes

- Inspect `CustomDateRangePicker.tsx` for the exact prop names and types. Typical props used by date-range components:
  - `value` (object with `start` and `end` Date or string)
  - `onChange` (callback called with new range)
  - `minDate`, `maxDate`, `locale`, etc.

If you need prop types adapted to your app, modify the component to match your project's typing or data flow.

## Styling & Dark Mode

- The component currently does not implement dark mode.
- To add dark mode, update the component's CSS/inline styles or wrap it with a theme provider. Example approaches:
  - Add conditional CSS classes based on a `theme` prop.
  - Use CSS variables and switch values for dark mode.
  - Integrate with your app's existing theme/context.

## Troubleshooting

- If you see TypeScript errors, ensure your project has the appropriate `tsconfig.json` and `@types/*` packages.
- If dates behave unexpectedly, check timezones and the date library used in the component.

## Next steps / Recommendations

- Confirm which date utility (if any) the component uses and install it.
- Add prop-type documentation inside the component or convert to a more explicit API if needed.
- Implement a dark-mode variant using CSS variables or your theme provider.

---

If you want, I can:

- Inspect `CustomDateRangePicker.tsx` and update this README with exact prop names and required dependencies.
- Add a small demo page inside this repo showing the component in isolation.

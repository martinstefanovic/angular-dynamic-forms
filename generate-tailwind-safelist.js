const fs = require('fs');

// Tailwind breakpoints
const breakpoints = ['', 'sm:', 'md:', 'lg:', 'xl:', '2xl:'];

// Define Tailwind grid class ranges
const gridCols = Array.from({ length: 12 }, (_, i) => `grid-cols-${i + 1}`);
const gridRows = Array.from({ length: 12 }, (_, i) => `grid-rows-${i + 1}`);
const colSpan = Array.from({ length: 12 }, (_, i) => `col-span-${i + 1}`);
const rowSpan = Array.from({ length: 12 }, (_, i) => `row-span-${i + 1}`);
const gap = Array.from({ length: 12 }, (_, i) => `gap-${i + 1} gap-x-${i + 1} gap-y-${i + 1}`);
const placeItems = ['place-items-start', 'place-items-center', 'place-items-end', 'place-items-stretch'];
const placeContent = [
  'place-content-start',
  'place-content-center',
  'place-content-end',
  'place-content-between',
  'place-content-around',
  'place-content-evenly',
  'place-content-stretch',
];
const placeSelf = ['place-self-auto', 'place-self-start', 'place-self-center', 'place-self-end', 'place-self-stretch'];

// Function to generate responsive classes with `ui-` prefix
function generateResponsiveClasses(classes) {
  return classes.flatMap((cls) => breakpoints.map((bp) => `${bp}ui-${cls}`));
}

// Generate responsive grid classes
const allGridClasses = [
  ...generateResponsiveClasses(gridCols),
  ...generateResponsiveClasses(gridRows),
  ...generateResponsiveClasses(colSpan),
  ...generateResponsiveClasses(rowSpan),
  ...generateResponsiveClasses(gap),
  ...generateResponsiveClasses(placeItems),
  ...generateResponsiveClasses(placeContent),
  ...generateResponsiveClasses(placeSelf),
].join('\n');

// Write to a text file
fs.writeFileSync('tailwind-safelist.txt', allGridClasses);

console.log('✅ Tailwind responsive grid classes with ui- prefix generated in tailwind-safelist.txt');

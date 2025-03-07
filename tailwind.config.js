module.exports = {
  prefix: 'ui-',
  content: [
    './projects/**/*.{html,ts}', // ✅ Ensures Tailwind scans all Angular templates and components
    './projects/ngx-dynamic-forms/**/*.{html,ts}', // ✅ Ensures Tailwind scans the workspace projects
    './tailwind-safelist.txt',
  ],
  purge: [
    './projects/ngx-dynamic-forms/**/*.{html,ts}', // ✅ Ensures Tailwind scans the workspace projects
    './tailwind-safelist.txt',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

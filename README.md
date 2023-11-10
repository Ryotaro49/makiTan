# z06-react

React 入門

## Vanilla JS

```sh
$ npm run start-vanilla-js
```

## React

React (TypeScript) のテンプレートを展開

```sh
$ npm create vite@latest react-ts --template react-ts
Need to install the following packages:
create-vite@4.4.1
Ok to proceed? (y) y
✔ Select a framework: › React
✔ Select a variant: › TypeScript

$ cd react-ts
$ npm install
$ npm run dev
```

package.json を編集してポートを 8096 に変更

```diff
   "scripts": {
-    "dev": "vite",
+    "dev": "vite --port 8096",
```

### tailwindcss のインストール

https://tailwindcss.com/docs/guides/vite

```sh
$ rm App.css
$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
```

`tailwind.config.js`

```diff
/** @type {import('tailwindcss').Config} */
module.exports = {
- content: [],
+ content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

`index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### ESLint, Prettier の設定

```sh
$ npm install -D prettier eslint-config-prettier prettier-plugin-tailwindcss
```

`.eslintrc.cjs`

```diff
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
+   "prettier",
  ],
```

`.prettierrc`

```json
{
  "plugins": [
    "prettier-plugin-tailwindcss"
  ]
}
```

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

<h1 align="center">react-mobile-ui</h1>

<p align="center">📱 A mobile component library based on the <strong>React</strong> framework

<p align="center">
  <a href="https://taoyage.github.io/react-mobile-ui">document</a>
</p>

## ✨ Feature

-   💎 A set of high-quality React components out of the box.
-   💪 Written in TypeScript, providing a complete type definition.
-   📝 Provide complete documentation.
-   😎 Support on-demand import and Tree Shaking.
-   ⚡️ Support Vite and Webpack.
-   🌵 Modern browsers.
-   🌝 Support SSR.

### Installation

```javascript
$ npm install @taoyage/react-mobile-ui --save
or
$ pnpm install @taoyage/react-mobile-ui
or
$ yarn install @taoyage/react-mobile-ui
```

#### Code Snippet

```jsx
import ReactDOM from 'react-dom/client';
import { Button } from '@taoyage/react-mobile-ui';

function App() {
  return <Button>Default Button</Button>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
```

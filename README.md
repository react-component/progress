<div align="center">
  <h1>@rc-component/progress</h1>
  <p><sub><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /> Part of the Ant Design ecosystem.</sub></p>
  <p>📊 Lightweight React line and circle progress indicators with SVG rendering.</p>

  <p>
    <a href="https://www.npmjs.com/package/@rc-component/progress"><img src="https://img.shields.io/npm/v/@rc-component/progress.svg?style=flat-square" alt="npm version" /></a>
    <a href="https://npmjs.org/package/@rc-component/progress"><img src="https://img.shields.io/npm/dm/@rc-component/progress.svg?style=flat-square" alt="npm downloads" /></a>
    <a href="https://github.com/react-component/progress/actions"><img src="https://github.com/react-component/progress/actions/workflows/react-component-ci.yml/badge.svg" alt="CI" /></a>
    <a href="https://codecov.io/gh/react-component/progress"><img src="https://img.shields.io/codecov/c/github/react-component/progress/master.svg?style=flat-square" alt="Codecov" /></a>
    <a href="https://bundlephobia.com/package/@rc-component/progress"><img src="https://badgen.net/bundlephobia/minzip/@rc-component/progress" alt="Bundle size" /></a>
    <a href="https://github.com/umijs/dumi"><img src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square" alt="dumi" /></a>
  </p>
</div>

<p align="center">English | <a href="./README.zh-CN.md">简体中文</a></p>


## Highlights

- `Line` and `Circle` progress components rendered with SVG.
- Single value, segmented value, gradient color, and indeterminate loading states.
- Semantic `classNames` and `styles` slots for root, rail, and track customization.
- TypeScript definitions for the shared progress props.

## Install

```bash
npm install @rc-component/progress
```

## Usage

```tsx | pure
import { Circle, Line } from '@rc-component/progress';
export default () => (
  <>
    <Line percent={42} strokeWidth={4} strokeColor="#1677ff" />
    <Circle percent={75} strokeWidth={6} strokeColor="#52c41a" />
  </>
);
```

```tsx | pure
import { Circle } from '@rc-component/progress';
export default () => (
  <Circle
    percent={[30, 20, 10]}
    strokeWidth={6}
    strokeColor={['#1677ff', '#52c41a', '#faad14']}
    railWidth={6}
  />
);
```

## Examples

Run the local dumi site:

```bash
npm install
npm start
```

Then open `http://localhost:8000`.

## API

`Line` and `Circle` share the same base props.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | string | - | Additional class name for the root node. |
| `classNames` | Partial<Record<'root' \| 'rail' \| 'track', string>> | - | Semantic class names for internal slots. |
| `gapDegree` | number | - | Gap degree for circle progress. |
| `gapPosition` | `'top'` \| `'right'` \| `'bottom'` \| `'left'` | `'bottom'` | Gap position for circle progress. |
| `id` | string | - | Root element id. |
| `loading` | boolean | false | Render an indeterminate loading animation. |
| `onClick` | React.MouseEventHandler | - | Click handler for the root SVG. |
| `percent` | number \| number[] | 0 | Progress percent. Arrays render multiple tracks. |
| `prefixCls` | string | `'rc-progress'` | Prefix class name. |
| `railColor` | string | `'#D9D9D9'` | Rail color. |
| `railWidth` | number | 1 | Rail stroke width. |
| `steps` | number \| { count: number; gap: number } | - | Render progress as discrete steps. |
| `strokeColor` | string \| Record<string, string \| boolean> \| Array<string \| Record<string, string \| boolean>> | `'#2db7f5'` | Track color, gradient object, or per-track colors. |
| `strokeLinecap` | `'round'` \| `'butt'` \| `'square'` | `'round'` | Stroke line cap. |
| `strokeWidth` | number | 1 | Track stroke width. |
| `style` | React.CSSProperties | - | Root style. |
| `styles` | Partial<Record<'root' \| 'rail' \| 'track', React.CSSProperties>> | - | Semantic styles for internal slots. |
| `transition` | string | - | CSS transition for track updates. |

## Development

```bash
npm install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

## Release

```bash
npm run prepublishOnly
```

The release flow is handled by `@rc-component/np` through the `rc-np` command after the package build.

## License

@rc-component/progress is released under the [MIT](./LICENSE.md) license.

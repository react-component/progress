<div align="center">
  <h1>@rc-component/progress</h1>
  <p><sub><a href="https://ant.design"><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /></a> Part of the Ant Design ecosystem.</sub></p>
  <p>📊 Lightweight React line and circle progress indicators with SVG rendering.</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/progress"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/progress.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/progress"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/progress.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/progress/actions/workflows/react-component-ci.yml"><img alt="build status" src="https://github.com/react-component/progress/actions/workflows/react-component-ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/progress"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/progress/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/progress"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@rc-component/progress?style=flat-square"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
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

The SVG is decorative by default. When using it as the progress indicator itself, provide progress semantics and an accessible name with standard SVG/ARIA props:

```tsx | pure
<Line
  percent={42}
  role="progressbar"
  aria-label="Upload progress"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={42}
/>
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

Standard SVG attributes, including `role` and `aria-*`, are forwarded to the root SVG.

## Development

```bash
npm install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

The dumi site runs at `http://localhost:8000` by default.

## Release

```bash
npm run prepublishOnly
```

The release flow is handled by `@rc-component/np` through the `rc-np` command after the package build.

## License

@rc-component/progress is released under the [MIT](./LICENSE) license.

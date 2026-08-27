<div align="center">
  <h1>@rc-component/progress</h1>
  <p><sub><a href="https://ant.design"><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /></a> Ant Design 生态的一部分。</sub></p>
  <p>📊 React 进度条组件，支持线型、圆形和自定义进度展示。</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/progress"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/progress.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/progress"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/progress.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/progress/actions/workflows/react-component-ci.yml"><img alt="build status" src="https://github.com/react-component/progress/actions/workflows/react-component-ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/progress"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/progress/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/progress"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@rc-component/progress?style=flat-square"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
  </p>
</div>

<p align="center"><a href="./README.md">English</a> | 简体中文</p>

## 特性

- `Line` 和 `Circle` 使用 SVG 渲染的进度组件。
- 单值、分段值、渐变颜色和不确定的加载状态。
- 用于根、导轨和轨道定制的语义 `classNames` 和 `styles` 插槽。
- 为共享进度属性提供 TypeScript 类型定义。

## 安装

```bash
npm install @rc-component/progress
```

## 使用

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

SVG 默认作为装饰元素。当 SVG 本身作为进度指示器时，可通过标准 SVG／ARIA 属性提供进度语义和无障碍名称：

```tsx | pure
<Line
  percent={42}
  role="progressbar"
  aria-label="上传进度"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={42}
/>
```

## 示例

运行本地 dumi 站点：

```bash
npm install
npm start
```

然后打开 `http://localhost:8000`。

## API

`Line` 和 `Circle` 共享相同的基础属性。

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `className` | string | - | 根节点的附加 className。 |
| `classNames` | Partial<Record<'root' \| 'rail' \| 'track', string>> | - | 内部插槽的语义化 className。 |
| `gapDegree` | number | - | 环形进度缺口角度。 |
| `gapPosition` | `'top'` \| `'right'` \| `'bottom'` \| `'left'` | `'bottom'` | 循环进度的间隙位置。 |
| `id` | string | - | 根元素 ID。 |
| `loading` | boolean | false | 渲染不确定的加载动画。 |
| `onClick` | React.MouseEventHandler | - | 单击根 SVG 的处理程序。 |
| `percent` | number \| number[] | 0 | 进度百分比。数组会渲染多条轨道。 |
| `prefixCls` | string | `'rc-progress'` | 前缀 className。 |
| `railColor` | string | `'#D9D9D9'` | 导轨颜色。 |
| `railWidth` | number | 1 | 导轨行程宽度。 |
| `steps` | number \| { count: number; gap: number } | - | 以离散步骤渲染进度。 |
| `strokeColor` | string \| Record<string, string \| boolean> \| Array<string \| Record<string, string \| boolean>> | `'#2db7f5'` | 轨道颜色、渐变对象或每条轨道的颜色。 |
| `strokeLinecap` | `'round'` \| `'butt'` \| `'square'` | `'round'` | 描边端点样式。 |
| `strokeWidth` | number | 1 | 轨道描边宽度。 |
| `style` | React.CSSProperties | - | 根样式。 |
| `styles` | Partial<Record<'root' \| 'rail' \| 'track', React.CSSProperties>> | - | 内部插槽的语义化样式。 |
| `transition` | string | - | 用于跟踪更新的 CSS 过渡。 |

标准 SVG 属性（包括 `role` 和 `aria-*`）会透传到根 SVG。

## 本地开发

```bash
npm install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

dumi 站点默认运行在 `http://localhost:8000`。

## 发布

```bash
npm run prepublishOnly
```

包构建完成后，发布流程由 `@rc-component/np` 通过 `rc-np` 命令处理。

## 许可证

@rc-component/progress 基于 [MIT](./LICENSE) 许可证发布。

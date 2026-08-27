export type SemanticName = 'root' | 'rail' | 'track';

export interface ProgressProps extends Omit<
  React.SVGAttributes<SVGSVGElement>,
  'strokeWidth' | 'strokeLinecap'
> {
  id?: string;
  /** Component geometry width, rather than the root SVG stroke-width attribute. */
  strokeWidth?: number;
  railWidth?: number;
  className?: string;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
  percent?: number | number[];
  strokeColor?: StrokeColorType;
  railColor?: string;
  /** Component path line cap, rather than the root SVG stroke-linecap attribute. */
  strokeLinecap?: StrokeLinecapType;
  prefixCls?: string;
  style?: React.CSSProperties;
  gapDegree?: number;
  gapPosition?: GapPositionType;
  transition?: string;
  onClick?: React.MouseEventHandler;
  steps?: number | { count: number; gap: number };
  loading?: boolean;
}

export type StrokeColorObject = Record<string, string | boolean>;

export type BaseStrokeColorType = string | StrokeColorObject;

export type StrokeColorType = BaseStrokeColorType | BaseStrokeColorType[];

export type GapPositionType = 'top' | 'right' | 'bottom' | 'left';

export type StrokeLinecapType = 'round' | 'butt' | 'square';

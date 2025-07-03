export interface LoadingProps {
  size?: number;
  color?: string;
  type?:
    | "spinner"
    | "hourglass"
    | "dotspinner"
    | "ellipsis"
    | "ring"
    | "roller"
    | "grid"
    | "circle"
    | "ripple";
    position?: 'center'  
}

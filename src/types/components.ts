import type { AltProps } from "./index";
import type { RouteLocationRaw } from "vue-router";
// Button Props
// export interface ButtonProps extends AltProps {
//   // variant?: "primary" | "secondary" | "text";
//   // size?: "small" | "medium" | "large";
//   disabled?: boolean;
//   loading?: boolean;
//   to?: string | RouteLocationRaw;
// }

// Input Props
export interface InputProps extends AltProps {
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  state?: "default" | "error" | "success";
  label?: string;
}

// Select Props
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends AltProps {
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
}

// Icon Props
export interface IconProps extends AltProps {
  name: string;
  size?: string | number;
  color?: string;
}

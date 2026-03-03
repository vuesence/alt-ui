export interface PropMetadata {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

export interface SlotMetadata {
  name: string;
  description: string;
  props?: string;
}

export interface EventMetadata {
  name: string;
  payload: string;
  description: string;
}

export interface CssClassMetadata {
  name: string;
  description: string;
}

export interface CssVarMetadata {
  name: string;
  description: string;
}

export interface ComponentMetadata {
  name: string;
  description: string;
  filePath: string;
  category: string;
  props: PropMetadata[];
  events: EventMetadata[];
  slots: SlotMetadata[];
  cssClasses: CssClassMetadata[];
  cssVars: CssVarMetadata[];
  examples: string[];
  dependencies: string[];
  expose: string[];
}

export interface TokenMetadata {
  name: string;
  value: string;
  description?: string;
}

export interface TokenCategory {
  name: string;
  file: string;
  tokens: TokenMetadata[];
}

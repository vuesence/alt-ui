/**
 * Theme Provider
 * Manages theme selection and application
 */

// Types for theme management
export type ThemeName = 'light' | 'dark' | 'system' | 'custom' | string;

// Interface for ThemeProvider
export interface ThemeProviderOptions {
  defaultTheme?: ThemeName;
  storageKey?: string;
  root?: HTMLElement;
}

// Default options
const defaultOptions: ThemeProviderOptions = {
  defaultTheme: 'system',
  storageKey: 'alt-ui-theme',
  root: typeof document !== 'undefined' ? document.documentElement : undefined
};

export class ThemeProvider {
  options: ThemeProviderOptions;
  currentTheme: ThemeName;

  constructor(options: ThemeProviderOptions = {}) {
    this.options = { ...defaultOptions, ...options };
    this.currentTheme = this.getInitialTheme();
    this.applyTheme(this.currentTheme);
    
    if (typeof window !== 'undefined') {
      this.setupSystemThemeListener();
    }
  }

  /**
   * Get the initial theme from localStorage or default
   */
  private getInitialTheme(): ThemeName {
    if (typeof window === 'undefined') return this.options.defaultTheme!;
    
    const storedTheme = localStorage.getItem(this.options.storageKey!);
    
    if (storedTheme) {
      return storedTheme as ThemeName;
    }
    
    if (this.options.defaultTheme === 'system') {
      return this.getSystemTheme();
    }
    
    return this.options.defaultTheme!;
  }

  /**
   * Get the system theme preference
   */
  private getSystemTheme(): ThemeName {
    if (typeof window === 'undefined') return 'light';
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  /**
   * Listen for system theme changes
   */
  private setupSystemThemeListener(): void {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (this.currentTheme === 'system') {
          this.applyTheme('system');
        }
      });
  }

  /**
   * Apply a theme
   */
  public applyTheme(theme: ThemeName): void {
    if (!this.options.root) return;
    
    // Remove all existing theme data attributes
    this.options.root.removeAttribute('data-theme');
    
    // Apply the new theme
    if (theme === 'system') {
      const systemTheme = this.getSystemTheme();
      this.options.root.setAttribute('data-theme', systemTheme);
    } else {
      this.options.root.setAttribute('data-theme', theme);
    }
    
    // Store the theme preference
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.options.storageKey!, theme);
    }
    
    this.currentTheme = theme;
  }

  /**
   * Get the current theme
   */
  public getTheme(): ThemeName {
    return this.currentTheme;
  }

  /**
   * Get the actual theme (resolves 'system' to actual theme)
   */
  public getResolvedTheme(): ThemeName {
    if (this.currentTheme === 'system') {
      return this.getSystemTheme();
    }
    
    return this.currentTheme;
  }
}

// Export a singleton instance for easier usage
export const themeProvider = new ThemeProvider();

// Export default for tree-shaking
export default ThemeProvider; 
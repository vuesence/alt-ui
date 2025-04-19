/**
 * Theme Toggle Component
 * A simple component to toggle between themes
 */

import { themeProvider, type ThemeName } from '../ThemeProvider';

export interface ThemeToggleOptions {
  element?: HTMLElement;
  themes?: ThemeName[];
}

const defaultOptions: ThemeToggleOptions = {
  themes: ['light', 'dark', 'system']
};

export class ThemeToggle {
  options: ThemeToggleOptions;
  element: HTMLElement | null = null;

  constructor(options: ThemeToggleOptions = {}) {
    this.options = { ...defaultOptions, ...options };
    this.element = this.options.element || null;
    
    if (this.element) {
      this.setupToggle();
    }
  }

  /**
   * Set up the theme toggle element
   */
  private setupToggle(): void {
    if (!this.element) return;
    
    // Create the toggle menu if it's a container
    if (this.element.tagName !== 'BUTTON' && this.element.tagName !== 'SELECT') {
      this.createToggleMenu();
    } else if (this.element.tagName === 'SELECT') {
      this.setupSelectToggle();
    } else {
      this.setupButtonToggle();
    }
  }

  /**
   * Create a dropdown menu toggle
   */
  private createToggleMenu(): void {
    if (!this.element) return;
    
    // Clear existing content
    this.element.innerHTML = '';
    
    // Create label
    const label = document.createElement('div');
    label.className = 'theme-toggle-label';
    label.textContent = 'Theme:';
    this.element.appendChild(label);
    
    // Create select dropdown
    const select = document.createElement('select');
    select.className = 'theme-toggle-select';
    
    // Add options
    this.options.themes!.forEach(theme => {
      const option = document.createElement('option');
      option.value = theme;
      option.textContent = this.formatThemeName(theme);
      option.selected = themeProvider.getTheme() === theme;
      select.appendChild(option);
    });
    
    // Add change event
    select.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      themeProvider.applyTheme(target.value as ThemeName);
    });
    
    this.element.appendChild(select);
  }

  /**
   * Set up a select element toggle
   */
  private setupSelectToggle(): void {
    if (!this.element || this.element.tagName !== 'SELECT') return;
    
    const select = this.element as HTMLSelectElement;
    
    // Clear existing options
    select.innerHTML = '';
    
    // Add options
    this.options.themes!.forEach(theme => {
      const option = document.createElement('option');
      option.value = theme;
      option.textContent = this.formatThemeName(theme);
      option.selected = themeProvider.getTheme() === theme;
      select.appendChild(option);
    });
    
    // Add change event
    select.addEventListener('change', () => {
      themeProvider.applyTheme(select.value as ThemeName);
    });
  }

  /**
   * Set up a button toggle (cycles through themes)
   */
  private setupButtonToggle(): void {
    if (!this.element || this.element.tagName !== 'BUTTON') return;
    
    const button = this.element as HTMLButtonElement;
    
    // Update button text
    this.updateButtonText(button);
    
    // Add click event
    button.addEventListener('click', () => {
      const currentTheme = themeProvider.getTheme();
      const currentIndex = this.options.themes!.indexOf(currentTheme);
      const nextIndex = (currentIndex + 1) % this.options.themes!.length;
      const nextTheme = this.options.themes![nextIndex];
      
      themeProvider.applyTheme(nextTheme);
      this.updateButtonText(button);
    });
  }

  /**
   * Update button text with current theme
   */
  private updateButtonText(button: HTMLButtonElement): void {
    const currentTheme = themeProvider.getTheme();
    button.textContent = this.formatThemeName(currentTheme);
  }

  /**
   * Format theme name for display
   */
  private formatThemeName(theme: string): string {
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  }
}

export default ThemeToggle; 
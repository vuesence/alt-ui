import MarkdownIt from 'markdown-it';
import { configureDiagramsPlugin as importedConfigureDiagramsPlugin } from 'vitepress-plugin-diagrams';

interface DiagramsPluginOptions {
  diagramsDir?: string;
  publicPath?: string;
}

/**
 * Настраивает плагин диаграмм для MarkdownIt
 * @param md Экземпляр MarkdownIt
 * @param options Настройки плагина
 */
export function configureDiagramsPlugin(
  md: MarkdownIt,
  options: DiagramsPluginOptions = {}
) {
  const { diagramsDir = 'docs/public/diagrams', publicPath = '/diagrams' } = options;

  importedConfigureDiagramsPlugin(md, {
    diagramsDir,
    publicPath,
  });
} 
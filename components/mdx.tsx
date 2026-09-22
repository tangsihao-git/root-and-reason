import type { MDXComponents } from 'mdx/types';
import { DocFigure } from './doc-figure';
import { EquipmentTopology } from './equipment-topology';
export function getMDXComponents(components?: MDXComponents) { return { DocFigure, EquipmentTopology, ...components } satisfies MDXComponents; }

import type { MDXComponents } from 'mdx/types';
import { getMDXComponents } from './components/mdx';

export function useMDXComponents(): MDXComponents {
  return getMDXComponents();
}

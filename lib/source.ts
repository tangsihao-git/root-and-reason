import { documents, navigation } from './generated/docs';
export { documents, navigation };
export function getDocument(slug: string[] = []) { return documents.find(doc => doc.slug === slug.join('/')); }

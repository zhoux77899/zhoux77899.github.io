import type { SiteContent } from './types.ts';

type SiteMetadata = SiteContent['metadata'];

export function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function renderSiteHtml(html: string, metadata: SiteMetadata): string {
  const values: Record<string, string> = {
    __SITE_LANG__: metadata.lang,
    __SITE_TITLE__: metadata.title,
    __SITE_DESCRIPTION__: metadata.description,
    __SITE_AUTHOR__: metadata.author,
    __SITE_KEYWORDS__: metadata.keywords,
    __SITE_SOCIAL_TITLE__: metadata.socialTitle,
    __SITE_SOCIAL_DESCRIPTION__: metadata.socialDescription,
    __SITE_URL__: metadata.url,
    __SITE_IMAGE__: metadata.image,
  };

  return html.replace(/__SITE_[A-Z_]+__/g, token => {
    const value = values[token];
    if (value === undefined) throw new Error(`Unknown site metadata token: ${token}`);
    return escapeHtml(value);
  });
}

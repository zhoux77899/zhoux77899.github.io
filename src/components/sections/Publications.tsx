import { Fragment } from 'react';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Section } from '@/components/layout/Section';
import { content, orcidUrl, publications } from '@/content';
import '@/styles/publications.css';

export function Publications() {
  return (
    <Section id="publications">
      <SectionHeader
        titleId="publications-title"
        title={content.sections.publications.title}
        description={content.sections.publications.description}
      />
      <ol className="publication-list" aria-label={content.sections.publications.listLabel}>
        {publications.map((publication, index) => (
          <li key={publication.doi}>
            <AnimatedSection delay={index * 0.06} duration={0.5}>
              <article className="publication-row" aria-labelledby={`publication-${publication.year}`}>
                <p className="publication-year">{publication.year}</p>
                <div className="publication-copy">
                  <h3 id={`publication-${publication.year}`}>{publication.title}</h3>
                  <p className="publication-authors">
                    {publication.authors.map((author, authorIndex) => (
                      <Fragment key={author}>
                        {authorIndex > 0 ? content.sections.publications.authorsSeparator : null}
                        {author === content.sections.publications.highlightedAuthor ? <strong>{author}</strong> : author}
                      </Fragment>
                    ))}
                  </p>
                  <p className="publication-journal">
                    <cite>{publication.journal}</cite> {content.sections.publications.citation(publication.volume, publication.issue, publication.pages)}
                  </p>
                  <a className="publication-doi" href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                    {content.sections.publications.doiLabel(publication.doi)}
                  </a>
                </div>
              </article>
            </AnimatedSection>
          </li>
        ))}
      </ol>
      <p className="publication-source">
        {content.sections.publications.source.map((part, index) => part.type === 'text' ? <Fragment key={index}>{part.text}</Fragment>
          : <a key={index} href={orcidUrl} target="_blank" rel="noopener noreferrer">{part.text}</a>)}
      </p>
    </Section>
  );
}

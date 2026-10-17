import { Fragment } from 'react';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Section } from '@/components/layout/Section';
import { orcidUrl, publications } from '@/lib/data';
import '@/styles/publications.css';

export function Publications() {
  return (
    <Section id="publications">
      <SectionHeader
        titleId="publications-title"
        title="Publications"
        description="Research in optical measurement and single-molecule microscopy."
      />
      <ol className="publication-list" aria-label="Research publications">
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
                        {authorIndex > 0 ? ', ' : null}
                        {author === 'Xiang Zhou' ? <strong>{author}</strong> : author}
                      </Fragment>
                    ))}
                  </p>
                  <p className="publication-journal">
                    <cite>{publication.journal}</cite> {publication.volume}({publication.issue}), {publication.pages}
                  </p>
                  <a className="publication-doi" href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                    DOI: {publication.doi}
                  </a>
                </div>
              </article>
            </AnimatedSection>
          </li>
        ))}
      </ol>
      <p className="publication-source">
        See my <a href={orcidUrl} target="_blank" rel="noopener noreferrer">ORCID record</a> for publication details.
      </p>
    </Section>
  );
}

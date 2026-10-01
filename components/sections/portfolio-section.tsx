'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { categories, services } from '@/data/portfolio';
import { ServiceArtwork } from '@/components/service-artwork';

const PAGE_SIZE = 6;

export function PortfolioSection() {
  const [filter, setFilter] = useState('All Categories');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const filteredServices = services.filter(
    (service) => filter === 'All Categories' || service.category === filter,
  );
  const visibleServices = filteredServices.slice(0, visibleCount);

  // Category change par pehli 6 services se dobara shuru karein.
  function handleFilter(category: string) {
    setFilter(category);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <section
      id="projects"
      className="work section-pad services-gallery"
      aria-labelledby="services-title"
    >
      <div className="services-heading reveal">
        <div>
          <span className="eyebrow">DESIGNED WITH PURPOSE</span>
          <h2 id="services-title">
            All Services<span>.</span>
          </h2>
        </div>
        <p>
          Different disciplines.
          <br />
          The same attention to detail.
        </p>
      </div>
      <div className="service-filters" aria-label="Filter services">
        {['All Categories', ...categories].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleFilter(category)}
            aria-pressed={filter === category}
            aria-controls="service-grid"
            className={filter === category ? 'active' : ''}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="service-grid" id="service-grid">
        {visibleServices.map((service) => (
          <Link
            key={service.code}
            href={`/services/${service.slug}`}
            prefetch={false}
            className="service-card reveal"
            aria-label={`Explore ${service.name}`}
          >
            <div className="service-card-art">
              <ServiceArtwork
                publicId={service.heroId}
                title={`${service.name} design preview`}
              />
              <span className="service-card-action">
                <ArrowUpRight size={24} aria-hidden="true" />
              </span>
            </div>
            <div className="service-card-caption">
              <div>
                <span className="eyebrow">{service.category}</span>
                <h3>{service.name}</h3>
              </div>
              <ArrowUpRight size={20} aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>
      <div className="services-bottom">
        <p role="status" aria-live="polite">
          Showing {visibleServices.length} of {filteredServices.length} services
        </p>
        {visibleServices.length < filteredServices.length && (
          <button
            className="button button-outline"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          >
            Load More <Plus size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
}

import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { type Service, services } from '@/data/portfolio';
import { contact } from '@/data/contact';
import { ServiceGallery } from '@/components/service-gallery';
import { SiteHeader } from '@/components/sections/site-header';
import { SiteFooter } from '@/components/sections/site-footer';

export function ServiceDetail({ service }: { service: Service }) {
  const index = services.findIndex((item) => item.code === service.code);
  const nextService = services[(index + 1) % services.length];
  const relatedServices = services.filter((item) => item.category === service.category);

  return (
    <main id="home" className="service-detail-page">
      <SiteHeader homeLinks />
      <section
        id="main-content"
        tabIndex={-1}
        className="service-detail-intro section-pad"
      >
        <Link href="/#projects" className="service-back">
          <ArrowLeft size={16} /> All Services
        </Link>
        <div className="service-detail-heading page-intro">
          <div>
            <span className="eyebrow">{service.category}</span>
            <h1>
              {service.name}
              <span>.</span>
            </h1>
          </div>
          <div>
            <p>{service.description}</p>
            <a
              href={contact.upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Let’s discuss your project <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <nav className="service-sibling-tabs" aria-label={`${service.category} services`}>
          {relatedServices.map((item) => (
            <Link
              key={item.code}
              href={`/services/${item.slug}`}
              aria-current={item.slug === service.slug ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </section>
      {/* Key service change par gallery selection aur zoom reset karta hai. */}
      <ServiceGallery key={service.slug} service={service} />
      <div className="service-next section-pad">
        <Link href="/#projects">
          <ArrowLeft size={17} /> Back to all services
        </Link>
        <Link href={`/services/${nextService.slug}`}>
          <span>
            <small>EXPLORE NEXT</small>
            {nextService.name}
          </span>
          <ArrowUpRight size={25} />
        </Link>
      </div>
      <SiteFooter />
    </main>
  );
}

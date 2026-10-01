import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ProfileSnapshot } from '@/components/profile-snapshot';
import { SiteHeader } from '@/components/sections/site-header';
import { SiteFooter } from '@/components/sections/site-footer';
import { about } from '@/data/about';
import { contact } from '@/data/contact';
import AboutImage from '@/public/images/arsal-about.png';

export const metadata: Metadata = {
  title: 'About Arsal — Independent Graphic Designer',
  description:
    'Meet Arsal, a freelance graphic designer with 5+ years of experience in brand identity, packaging, print, marketing creatives and UI/UX design.',
};

// Poora background yahan hai; homepage ka About mobile par chhota rehta hai.
export default function AboutPage() {
  return (
    <main id="home" className="about-page">
      <SiteHeader homeLinks />
      <section
        id="main-content"
        tabIndex={-1}
        className="about-page-hero section-pad"
        aria-labelledby="about-page-title"
      >
        <Link href="/#about" className="about-back-link">
          <ArrowLeft size={16} aria-hidden="true" /> Back to home
        </Link>
        <div className="about-page-hero-grid">
          <div className="about-page-heading reveal">
            <span className="eyebrow">THE PERSON BEHIND THE DESIGN</span>
            <h1 id="about-page-title">
              Good design starts
              <br />
              <em>with understanding.</em>
            </h1>
            <p>{about.introduction}</p>
            <a
              href={contact.upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="about-story-link"
            >
              Let’s work together <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </div>
          <figure className="about-page-portrait reveal">
            <div className="about-page-portrait-image">
              <Image
                src={AboutImage}
                alt="Portrait of Arsal, independent graphic designer"
                sizes="(max-width: 700px) 85vw, (max-width: 1100px) 36vw, 430px"
                preload
              />
              <span className="about-experience-mark">
                <strong>5+</strong> years in design
              </span>
            </div>
            <figcaption>
              <strong>Arsal</strong>
              <span>Independent creative designer</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        className="about-page-background section-pad"
        aria-labelledby="background-title"
      >
        <div className="about-page-story reveal">
          <span className="eyebrow">{about.label}</span>
          <h2 id="background-title">Thoughtful by design.</h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ProfileSnapshot />
      </section>

      <section
        className="about-page-expertise section-pad reveal"
        aria-labelledby="expertise-title"
      >
        <div>
          <span className="eyebrow">FROM THE FIRST IDEA TO THE FINAL DETAIL</span>
          <h2 id="expertise-title">Design that works together.</h2>
        </div>
        <div>
          <div className="about-specialties" aria-label="Design specialties">
            {about.specialties.map((specialty) => (
              <span key={specialty}>{specialty}</span>
            ))}
          </div>
          <Link href="/#projects" className="about-story-link">
            Explore my services <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

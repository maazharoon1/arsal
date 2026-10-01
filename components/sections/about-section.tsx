import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import { about } from '@/data/about';
import { profile } from '@/data/profile';
import { ProfileSnapshot } from '@/components/profile-snapshot';
import AboutImage from '@/public/images/arsal-about.png';

// Homepage par chhota intro; poori story aur profile /about par milti hai.
export function AboutSection() {
  return (
    <section
      id="about"
      className="about-section home-about section-pad"
      aria-labelledby="about-title"
    >
      <div className="about-layout">
        <div className="about-intro reveal">
          <figure className="about-photo">
            <Image
              src={AboutImage}
              alt="Arsal, independent graphic designer"
              width={362}
              height={359}
              sizes="(max-width: 700px) 104px, (max-width: 1100px) 190px, 280px"
            />
            <figcaption>
              <strong>5+</strong>
              <span>
                years of
                <br />
                creative experience
              </span>
            </figcaption>
          </figure>
          <div className="about-introduction">
            <span className="eyebrow">{about.label}</span>
            <h2 id="about-title">
              A little about me.
              <br />
              <em>A lot of intention.</em>
            </h2>
            <span className="short-rule" />
            <p>{about.summary}</p>
            <Link href="/about" className="about-story-link">
              Read my full story <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <ProfileSnapshot />
        <div className="about-home-details reveal">
          <span className="eyebrow">THOUGHTFUL DESIGN. REAL-WORLD IMPACT.</span>
          <p>{about.paragraphs[0]}</p>
          <div className="about-specialties" aria-label="Design specialties">
            {about.specialties.map((specialty) => (
              <span key={specialty}>{specialty}</span>
            ))}
          </div>
        </div>
        {/* Mobile par lambi profile ki jagah sirf do useful highlights. */}
        <div className="about-mobile-facts reveal">
          <span>
            <strong>5+</strong> years of experience
          </span>
          <span>
            <BadgeCheck size={18} aria-hidden="true" />
            <strong>{profile.successScore}</strong> job success
          </span>
        </div>
      </div>
    </section>
  );
}

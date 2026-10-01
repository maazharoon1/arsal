import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

// Hero: background shapes, heading aur transparent portrait ki alag layers hain.
export function HeroSection() {
  return (
    <section
      id="main-content"
      tabIndex={-1}
      className="hero"
      aria-labelledby="hero-heading"
    >
      <div className="hero-shape shape-one" />
      <div className="hero-shape shape-two" />
      <svg className="hero-lines" viewBox="0 0 1400 650" fill="none" aria-hidden="true">
        {Array.from({ length: 19 }, (_, i) => (
          <path
            key={i}
            d={`M 180 ${720 + i * 9} C 500 ${260 + i * 14}, 700 ${570 - i * 12}, 980 ${270 - i * 10} S 1370 ${100 - i * 9}, 1520 ${30 - i * 12}`}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </svg>
      <div className="hero-name" aria-hidden="true">
        ARSAL
      </div>
      <div className="hero-copy">
        <span className="eyebrow">GRAPHIC DESIGNER</span>
        <h1 id="hero-heading">
          <span>Think.</span>
          <span>Create.</span>
          <span>Inspire.</span>
        </h1>
        <span className="short-rule" />
        <p>
          Thoughtful design for brands
          <br />
          with a story.
        </p>
        <a className="button button-dark" href="#projects">
          View My Work <ArrowRight size={18} />
        </a>
      </div>
      <div className="portrait-wrap">
        <Image
          src="/images/arsal.png"
          alt="Arsal, graphic designer, in a navy suit"
          width={1270}
          height={1239}
          priority
          className="hero-portrait"
          sizes="(max-width: 700px) 85vw, 66vw"
        />
      </div>
      <div className="hero-signature">
        Design
        <br />
        for a brighter
        <br />
        tomorrow.
        <span />
      </div>
    </section>
  );
}

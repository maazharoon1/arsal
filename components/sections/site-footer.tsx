import { ArrowRight } from 'lucide-react';
import { contact } from '@/data/contact';

// Contact navigation ab seedha footer par aati hai.
export function SiteFooter() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-invitation reveal">
        <h2>Let’s create something meaningful.</h2>
        <p>
          Need branding, packaging, print, or UI/UX design that looks polished and works
          in the real world? Let’s create something clear, strategic, and beautifully
          done.
        </p>
        <a
          className="footer-contact-button"
          href={contact.upworkUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get in Touch <ArrowRight size={21} aria-hidden="true" />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Arsal</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}

import { ArrowUpRight, BadgeCheck, Globe2, MapPin, Sparkles } from 'lucide-react';
import { profile } from '@/data/profile';
import { contact } from '@/data/contact';

// About ke saath profile details; footer aur yahan same Upwork link use hota hai.
export function ProfileSnapshot() {
  return (
    <aside className="profile-snapshot reveal" aria-labelledby="profile-snapshot-title">
      <div className="snapshot-heading">
        <span className="eyebrow">AT A GLANCE</span>
        <h3 id="profile-snapshot-title">Profile snapshot</h3>
      </div>
      <div className="snapshot-status">
        <span className="snapshot-status-icon">
          <Sparkles size={20} aria-hidden="true" />
        </span>
        <div>
          <strong>{profile.status}</strong>
          <p>{profile.statusDescription}</p>
        </div>
      </div>
      <div className="snapshot-score">
        <div className="snapshot-score-top">
          <strong>{profile.successScore}</strong>
          <BadgeCheck size={32} strokeWidth={1.3} aria-hidden="true" />
        </div>
        <span>Job Success Score</span>
        <p>{profile.successDescription}</p>
      </div>
      <dl className="snapshot-details">
        <div className="snapshot-detail snapshot-rate">
          <dt>HOURLY RATE</dt>
          <dd>
            <strong>{profile.rate}</strong>
            <p>{profile.rateDescription}</p>
          </dd>
        </div>
        <div className="snapshot-detail">
          <dt>
            <MapPin size={15} aria-hidden="true" /> BASED IN
          </dt>
          <dd>
            {profile.location}
            <p>{profile.locationDescription}</p>
          </dd>
        </div>
        <div className="snapshot-detail">
          <dt>
            <Globe2 size={15} aria-hidden="true" /> LANGUAGES
          </dt>
          <dd>
            {profile.languages}
            <p>{profile.languageDescription}</p>
          </dd>
        </div>
      </dl>
      <a
        className="snapshot-link"
        href={contact.upworkUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Upwork Profile <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </aside>
  );
}

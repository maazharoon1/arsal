'use client';

import { useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ImagePlus,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import type { Service } from '@/data/portfolio';
import { ServiceArtwork } from '@/components/service-artwork';
import { useGalleryZoom } from '@/hooks/use-gallery-zoom';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

type GalleryItem = {
  id: string;
  publicId: string | null;
  alt: string;
  placeholder: boolean;
  preview: boolean;
};

// Placeholder tiles sirf layout preview hain; nonexistent Cloudinary IDs fetch nahi hote.
function GalleryPlaceholder({ number, name }: { number: number; name: string }) {
  return (
    <div className={`gallery-placeholder placeholder-variant-${number % 4}`}>
      <div className="placeholder-mark" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="placeholder-caption">
        <span>{name}</span>
        <small>PORTFOLIO COMING SOON</small>
      </div>
      <span className="placeholder-number" aria-hidden="true">
        {String(number).padStart(2, '0')}
      </span>
    </div>
  );
}

export function ServiceGallery({ service }: { service: Service }) {
  const [selected, setSelected] = useState<number | null>(null);
  const { viewport, zoomed, dragging, resetZoom, toggleZoom, transform, handlers } =
    useGalleryZoom();
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const openingTile = useRef(0);
  const isPreview = service.images.length === 0;
  const items: GalleryItem[] = isPreview
    ? Array.from({ length: 9 }, (_, index) => ({
        id: `preview-${index}`,
        publicId: index === 0 ? service.heroId : null,
        alt:
          index === 0
            ? `${service.name} service preview`
            : `${service.name} placeholder ${index + 1}`,
        placeholder: index !== 0,
        preview: true,
      }))
    : service.images.map((image) => ({
        id: image.publicId,
        publicId: image.publicId,
        alt: image.alt,
        placeholder: false,
        preview: false,
      }));
  const current = selected === null ? null : items[selected];

  function changeImage(index: number) {
    setSelected((index + items.length) % items.length);
    resetZoom();
  }

  function artwork(item: GalleryItem, index: number, large = false) {
    return item.placeholder ? (
      <GalleryPlaceholder number={index + 1} name={service.name} />
    ) : (
      <ServiceArtwork publicId={item.publicId} title={item.alt} large={large} />
    );
  }

  return (
    <section
      className="service-gallery section-pad"
      aria-label={`${service.name} portfolio gallery`}
    >
      <div className="gallery-toolbar">
        <span className="eyebrow">{isPreview ? 'GALLERY PREVIEW' : 'SELECTED WORK'}</span>
        <span>
          {isPreview ? 'Portfolio coming soon' : `${items.length} projects`}{' '}
          <span aria-hidden="true">/</span> Click to explore
        </span>
      </div>
      {isPreview && (
        <p className="gallery-preview-note">
          <ImagePlus size={16} aria-hidden="true" /> Service artwork and layout
          placeholders. Full portfolio will be added soon.
        </p>
      )}
      <div className="masonry-gallery">
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => {
              triggers.current[index] = node;
            }}
            className="gallery-tile reveal"
            onClick={() => {
              openingTile.current = index;
              setSelected(index);
              resetZoom();
            }}
            aria-label={`Open ${item.alt}`}
            aria-haspopup="dialog"
          >
            <span className="gallery-tile-art">
              {artwork(item, index)}
              <span className="gallery-expand">
                <ArrowUpRight size={21} />
              </span>
            </span>
            <span className="gallery-tile-caption">
              <span>
                {item.preview
                  ? item.placeholder
                    ? 'Portfolio placeholder'
                    : 'Service preview'
                  : item.alt}
              </span>
              <small>{String(index + 1).padStart(2, '0')}</small>
            </span>
          </button>
        ))}
      </div>

      {/* Ek shared fullscreen dialog: arrows, keyboard, zoom aur focus return. */}
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null);
            resetZoom();
          }
        }}
      >
        <DialogContent
          className="gallery-lightbox"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            triggers.current[openingTile.current]?.focus();
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault();
              changeImage((selected ?? 0) + (event.key === 'ArrowRight' ? 1 : -1));
            }
          }}
        >
          <div className="gallery-lightbox-header">
            <div>
              <DialogTitle>{service.name}</DialogTitle>
              <DialogDescription>
                {current?.preview
                  ? 'Gallery preview · Portfolio coming soon'
                  : current?.alt}
              </DialogDescription>
            </div>
            <div className="gallery-lightbox-tools">
              <span aria-live="polite">
                {(selected ?? 0) + 1} / {items.length}
              </span>
              <button
                onClick={toggleZoom}
                aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
                aria-pressed={zoomed}
              >
                {zoomed ? <ZoomOut size={21} /> : <ZoomIn size={21} />}
              </button>
            </div>
          </div>
          <div className="gallery-lightbox-stage">
            <button
              className="gallery-prev"
              aria-label="Previous image"
              onClick={() => changeImage((selected ?? 0) - 1)}
            >
              <ArrowLeft size={24} />
            </button>
            <div
              className={`gallery-lightbox-viewport ${zoomed ? 'is-zoomed' : ''} ${dragging ? 'is-dragging' : ''}`}
              ref={viewport}
              {...handlers}
              onDragStart={(event) => event.preventDefault()}
            >
              <div className="gallery-lightbox-art" style={{ transform }}>
                {current && artwork(current, selected ?? 0, true)}
              </div>
            </div>
            <button
              className="gallery-next"
              aria-label="Next image"
              onClick={() => changeImage((selected ?? 0) + 1)}
            >
              <ArrowRight size={24} />
            </button>
          </div>
          <div className="gallery-lightbox-footer">
            <span>
              {current?.placeholder ? 'Placeholder — artwork to be added' : current?.alt}
            </span>
            <span>
              {zoomed ? 'Drag to explore · Double-click to fit' : 'Double-click to zoom'}{' '}
              · ← → to browse · Esc to close
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

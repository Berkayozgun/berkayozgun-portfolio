'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  title: string;
}

interface ProjectImageSliderProps {
  images: ProjectImage[];
  isOpen: boolean;
  onClose: () => void;
}

const ProjectImageSlider: React.FC<ProjectImageSliderProps> = (props) => {
  // Each opening mounts a fresh session, resetting navigation without an effect.
  if (!props.isOpen || props.images.length === 0) return null;
  return <ProjectImageSliderSession {...props} />;
};

const ProjectImageSliderSession: React.FC<ProjectImageSliderProps> = ({ images, onClose }) => {
  const reducedMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const openerRef = useRef<HTMLElement | null>(null);
  const currentIndex = Math.min(selectedIndex, images.length - 1);
  const currentImage = images[currentIndex];

  const nextSlide = () => {
    setDirection(1);
    setSelectedIndex((currentIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setSelectedIndex((currentIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setSelectedIndex(index);
  };

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Content
          asChild
          aria-describedby={undefined}
          onOpenAutoFocus={() => {
            openerRef.current = document.activeElement instanceof HTMLElement
              ? document.activeElement
              : null;
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (openerRef.current?.isConnected) openerRef.current.focus();
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              prevSlide();
            } else if (event.key === 'ArrowRight') {
              event.preventDefault();
              nextSlide();
            }
          }}
        >
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <Dialog.Title className="sr-only">Project images</Dialog.Title>
            <div className="relative max-w-6xl w-full h-full flex items-center justify-center p-4">
              {/* Close Button */}
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={(event) => event.stopPropagation()}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </Dialog.Close>

              {/* Main Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    initial={reducedMotion ? false : { x: direction * 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: reducedMotion ? 0 : -direction * 300, opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.3, ease: 'easeInOut' }}
                    className="relative max-w-full max-h-full"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <img
                      src={currentImage.src}
                      alt={currentImage.alt}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white p-4 rounded-lg">
                      <h3 className="text-lg font-semibold">{currentImage.title}</h3>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={(event) => {
                      event.stopPropagation();
                      prevSlide();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={(event) => {
                      event.stopPropagation();
                      nextSlide();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {images.length > 1 && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-2">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      type="button"
                      aria-label={`Go to image ${index + 1}`}
                      aria-current={index === currentIndex ? 'true' : undefined}
                      onClick={(event) => {
                        event.stopPropagation();
                        goToSlide(index);
                      }}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Image Counter */}
              <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProjectImageSlider;

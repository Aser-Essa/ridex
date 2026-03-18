/* FIXES APPLIED:
 * [CRITICAL] Replaced local state/Modal usage with global ModalContext
 * [PERFORMANCE] Replaced <img> tags with next/image, removed dangerous DOM particles
 * [PERFORMANCE] Replaced unsafe GSAP animations with useGSAP
 * [ACCESSIBILITY] Replaced anchor link with Next.js Link
 */
"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import MagneticButton from "./MagneticButton";
import ParticleCanvas from "./ParticleCanvas";
import { useModal } from "@/context/ModalContext";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const videoBlockRef = useRef<HTMLButtonElement>(null);
  const bodyTextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bikeImageRef = useRef<HTMLImageElement>(null);
  const { openModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      if (bikeImageRef.current) {
        const scrolled = window.scrollY;
        gsap.to(bikeImageRef.current, {
          y: -(scrolled * 0.15),
          duration: 0.5,
          ease: "power1.out",
          overwrite: "auto",
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(labelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(
          ".hero-heading-line",
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.2",
        )
        .fromTo(
          videoBlockRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6 },
          "-=0.3",
        )
        .fromTo(
          bodyTextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4",
        )
        .fromTo(ctaRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3")
        .fromTo(
          bikeImageRef.current,
          {
            opacity: 0,
            x: 80,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.0,
            ease: "power3.out",
          },
          0.2,
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden noise flex flex-col md:flex-row"
      style={{ height: "100vh", backgroundColor: "#000000" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 70% at 75% 50%, rgba(232,69,10,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <ParticleCanvas />

      <div className="container mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row relative z-10 items-center justify-between">
        {/* LEFT CONTENT */}
        <div className="w-full md:w-[50%] flex flex-col justify-center relative z-10 pt-32 md:pt-0">
          <div
            ref={labelRef}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--color-accent)",
              letterSpacing: "0.2em",
              marginBottom: "1.5rem",
            }}
          >
            [ PREMIUM ELECTRIC BIKES ]
          </div>

          <div className="flex flex-col gap-1 mb-12">
            {["LIFE IS LIKE", "RIDING A", "BICYCLE —", "KEEP MOVING"].map(
              (line, i) => (
                <div key={i}>
                  <h1 className="hero-heading-line display-heading">
                    {i === 2 ? (
                      <>
                        BICYCLE{" "}
                        <span style={{ color: "var(--color-accent)" }}>—</span>
                      </>
                    ) : (
                      line
                    )}
                  </h1>
                </div>
              ),
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mt-4">
            <button
              ref={videoBlockRef}
              onClick={() => openModal()}
              className="group relative cursor-none border-none p-0 outline-none flex-shrink-0"
              style={{
                width: "180px",
                height: "120px",
                borderRadius: "12px",
                overflow: "hidden",
              }}
              data-cursor="large"
              aria-label="Play promotional video"
            >
              <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
              <Image
                src="/images/rider.jpg"
                alt="Video thumbnail"
                fill
                className="object-cover blur-[2px] scale-105 group-hover:scale-100 transition-transform duration-500 pointer-events-none"
                sizes="180px"
                priority
              />
              <div
                className="absolute inset-0 m-auto flex items-center justify-center z-20 transition-all duration-300 group-hover:scale-110 pointer-events-none"
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-accent)",
                  boxShadow: "0 0 30px var(--color-accent-glow)",
                }}
              >
                <svg
                  width="18"
                  height="22"
                  viewBox="0 0 18 22"
                  fill="none"
                  className="ml-1"
                >
                  <path d="M17 11L1 20.2376L1 1.76237L17 11Z" fill="white" />
                </svg>
              </div>
            </button>

            <div className="flex flex-col gap-6">
              <p
                ref={bodyTextRef}
                style={{
                  maxWidth: "280px",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                Life is like riding a bicycle — keep moving. To keep balance in
                life, we must always move forward.
              </p>

              <div ref={ctaRef}>
                <MagneticButton>
                  <Link
                    href="#bikes"
                    className="btn-ghost group"
                    data-cursor="large"
                  >
                    START RIDING
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-2">
                      →
                    </span>
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE BIKE IMAGE */}
        <div className="relative md:absolute md:right-0 md:top-0 w-full md:w-[55%] h-[50vh] md:h-full z-10 flex items-center justify-center opacity-70 md:opacity-100 pointer-events-none mt-12 md:mt-0">
          <div
            className="absolute left-0 top-0 bottom-0 w-1/4 z-0"
            style={{
              background:
                "radial-gradient(ellipse at left center, rgba(232,69,10,0.2) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <Image
            ref={bikeImageRef}
            src="/images/bike-hero.png"
            alt="RideX Electric Bike"
            fill
            className="object-contain md:object-right"
            style={{
              transform: "rotate(-5deg) scale(1.05)",
              filter: "drop-shadow(-20px 20px 30px rgba(0,0,0,0.8))",
            }}
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}

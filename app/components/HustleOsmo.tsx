"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { cards } from "../utils";
import BackgroundGuides from "./BackgroundGuides";

const TWO_PI = Math.PI * 2;

export default function HustleOsmo() {
    const [rotation, setRotation] = useState(-Math.PI * 0.55);
    const [vw, setVw] = useState(0);

    useEffect(() => {
        const handle = () => setVw(window.innerWidth);
        handle();
        window.addEventListener("resize", handle);
        return () => window.removeEventListener("resize", handle);
    }, []);

    useEffect(() => {
        const speed = { value: -0.01 };

        gsap.to(speed, {
            value: -0.0005,
            duration: 3,
            ease: "power3.out",
        });

        gsap.to({}, {
            duration: 1,
            repeat: -1,
            ease: "none",
            onUpdate: () => {
                setRotation(r => ((r + speed?.value) % TWO_PI + TWO_PI) % TWO_PI);
            }
        });
    }, []);

    if (!vw) return null;

    const total = cards?.length;

    const CARD_W = 270;
    const CARD_H = 230;

    const radius = 1250;
    const centerX = vw / 2;
    const centerY = 1400;

    const ANGLE_SPREAD = 1.03;
    const ROT_OFFSET = -Math.PI / 2;

    const ARC = Math.PI * 1.35;

    return (
        <section className="relative w-full h-[800px] overflow-hidden">
            {/* CENTERED LINE  */}
            <BackgroundGuides />

            {/* CARD CURVE  */}
            {cards?.map((card, i) => {

                let angle = (i / total) * TWO_PI * ANGLE_SPREAD + rotation + ROT_OFFSET;

                // Normalize to [-PI, PI]
                let norm = ((angle + Math.PI) % TWO_PI) - Math.PI;
                let dist = Math.abs(norm);

                // STRICT CLAMP → prevents cards from popping upward EVER
                if (dist > ARC / 2 + 0.55) return null;

                // Fade only near bottom
                let fadeStart = ARC / 2;
                let fadeEnd = ARC / 2 + 0.45;
                let opacity = 1;

                if (dist > fadeStart) {
                    opacity = 1 - Math.min((dist - fadeStart) / (fadeEnd - fadeStart), 1);
                }

                const x = centerX + Math.cos(angle) * radius - CARD_W / 2;
                const y = centerY + Math.sin(angle) * radius - CARD_H / 2;

                const rotateDeg = (angle * 180) / Math.PI + 90;

                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            zIndex: 5,
                            width: CARD_W,
                            height: CARD_H,
                            opacity,
                            transform: `
                                translate(${x}px, ${y}px)
                                rotate(${rotateDeg}deg)
                            `,
                            willChange: "transform",
                        }}
                    >
                        <div className="w-full p-2 h-full bg-[#201d1d] rounded-lg overflow-hidden shadow-[0_28px_60px_rgba(0,0,0,0.35)]">
                            <div className="w-full h-[85%] bg-neutral-100 overflow-hidden">
                                <img
                                    src={card?.image}
                                    alt={card?.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="h-[15%] flex items-center justify-center text-white text-sm">
                                {card?.title}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* DASHED CURVE  */}
            {(() => {
                const TICK_COUNT = 180;
                const TICK_RADIUS = radius - 0;
                const TICK_LENGTH = 10;
                const TICK_OPACITY = 0.1;

                const ticks = [];

                const angleStart = ROT_OFFSET - ARC / 2 + 0.12;
                const angleEnd = ROT_OFFSET + ARC / 2 - 0.12;

                for (let i = 0; i < TICK_COUNT; i++) {
                    const t = i / (TICK_COUNT - 1);
                    const angle = angleStart + t * (angleEnd - angleStart);

                    const x = centerX + Math.cos(angle) * TICK_RADIUS;
                    const y = centerY + Math.sin(angle) * TICK_RADIUS;

                    const rotateDeg = (angle * 180) / Math.PI + 90;

                    ticks.push(
                        <div
                            key={`tick-${i}`}
                            style={{
                                position: "absolute",
                                width: 1,
                                height: TICK_LENGTH,
                                background: `rgba(0,0,0,${TICK_OPACITY})`,
                                transform: `
                        translate(${x}px, ${y}px)
                        rotate(${rotateDeg}deg)
                    `,
                                transformOrigin: "center top",
                                zIndex: 1,
                                borderRadius: "1px",
                            }}
                        />
                    );
                }

                return ticks;
            })()}

            {/* BOTTOM TEXT   */}
            <div className="absolute bottom-[120px] w-full text-center px-6">
                <h2 className="text-[40px] text-[#201d1d] leading-tight max-w-3xl mx-auto">
                    Osmo is an ever-growing platform with Webflow & HTML resources. Get exclusive access to the elements, techniques and code behind award-winning work.
                </h2>
                <p className="text-[22px] text-black mt-4 opacity-70 max-w-3xl mx-auto">
                    Get exclusive access to the elements, techniques and code behind award-winning work.
                </p>
            </div>
        </section>
    );
}
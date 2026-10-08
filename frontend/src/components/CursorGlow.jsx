import { useEffect, useRef } from "react";

function CursorGlow() {
    const glowRef = useRef(null);

    const mouse = useRef({
        x: 0,
        y: 0
    });

    const current = useRef({
        x: 0,
        y: 0
    });

    const speed = useRef(0);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const dx = event.clientX - mouse.current.x;
            const dy = event.clientY - mouse.current.y;

            speed.current = Math.sqrt(dx * dx + dy * dy);

            mouse.current.x = event.clientX;
            mouse.current.y = event.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        let animationFrame;

        const animate = () => {
            // Smoothly follow the cursor
            current.current.x +=
                (mouse.current.x - current.current.x) * 0.08;

            current.current.y +=
                (mouse.current.y - current.current.y) * 0.08;

            // Gradually slow the effect down
            speed.current *= 0.9;

            // Convert cursor speed into glow size
            const size = Math.min(300 + speed.current * 2, 500);

            if (glowRef.current) {
                glowRef.current.style.width = `${size}px`;
                glowRef.current.style.height = `${size}px`;

                glowRef.current.style.opacity =
                    Math.min(0.15 + speed.current * 0.003, 0.35);

                glowRef.current.style.transform =
                    `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%)`;
            }

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return <div ref={glowRef} className="cursor-glow" />;
}

export default CursorGlow;
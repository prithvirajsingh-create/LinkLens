import { useEffect, useRef } from "react";

function CursorGlow() {
    const beagleRef = useRef(null);
    const pointer = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const position = useRef({ x: window.innerWidth / 2 - 22, y: window.innerHeight / 2 + 14 });
    const lastPointer = useRef({ ...pointer.current });
    const movingTimer = useRef(null);

    useEffect(() => {
        const beagle = beagleRef.current;
        if (!beagle) return;

        const handlePointerMove = (event) => {
            if (event.pointerType === "touch") return;

            pointer.current = { x: event.clientX, y: event.clientY };

            beagle.classList.add("is-moving");
            window.clearTimeout(movingTimer.current);
            movingTimer.current = window.setTimeout(() => {
                beagle.classList.remove("is-moving");
            }, 160);

            lastPointer.current = { x: event.clientX, y: event.clientY };
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        let animationFrame;

        const animate = () => {
            position.current.x += (pointer.current.x - 22 - position.current.x) * 0.12;
            position.current.y += (pointer.current.y + 14 - position.current.y) * 0.12;

            beagle.style.left = `${position.current.x}px`;
            beagle.style.top = `${position.current.y}px`;

            animationFrame = window.requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.cancelAnimationFrame(animationFrame);
            window.clearTimeout(movingTimer.current);
        };
    }, []);

    return (
        <div ref={beagleRef} className="cursor-beagle" aria-hidden="true">
            <div className="beagle-sprite" />
        </div>
    );
}

export default CursorGlow;

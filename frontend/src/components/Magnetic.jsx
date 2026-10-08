import { useRef } from "react";

function Magnetic({ children, strength = 0.15 }) {
    const ref = useRef(null);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();

        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        ref.current.style.transform =
            `translate(${x * strength}px, ${y * strength}px)`;
    };

    const handleMouseLeave = () => {
        ref.current.style.transform = "translate(0, 0)";
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="magnetic"
        >
            {children}
        </div>
    );
}

export default Magnetic;
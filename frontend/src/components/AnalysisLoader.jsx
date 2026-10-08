import { useEffect, useState } from "react";

function AnalysisLoader({ url }) {
    const [step, setStep] = useState(0);

    const steps = [
        "CONNECTING TO WEBSITE",
        "FETCHING HTML",
        "PARSING STRUCTURE",
        "ANALYZING SEO"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((current) =>
                current < steps.length - 1
                    ? current + 1
                    : current
            );
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="analysis-loader">
            <div className="loader-content">
                <p className="eyebrow">
                    LINKLENS / ANALYSIS
                </p>

                <h2>
                    READING
                    <br />
                    <span>THE LINK.</span>
                </h2>

                <p className="loader-url">
                    {url}
                </p>

                <div className="loader-line">
                    <div className="loader-progress" />
                </div>

                <div className="loader-status">
                    <span>{steps[step]}</span>
                    <span>0{step + 1} / 04</span>
                </div>
            </div>
        </section>
    );
}

export default AnalysisLoader;
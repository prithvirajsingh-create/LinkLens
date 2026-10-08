import { useState } from "react";
import CursorGlow from "./components/CursorGlow";
import Magnetic from "./components/Magnetic";
import BackgroundGrid from "./components/BackgroundGrid";
import AnalysisLoader from "./components/AnalysisLoader";

function App() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [view, setView] = useState("seo");
    const [error, setError] = useState("");

    const analyzeWebsite = async (selectedView) => {
        if (!url.trim()) {
            setError("Enter a website URL first.");
            return;
        }

        let targetUrl = url.trim();

        if (
            !targetUrl.startsWith("http://") &&
            !targetUrl.startsWith("https://")
        ) {
            targetUrl = `https://${targetUrl}`;
        }

        setView(selectedView);
        setLoading(true);
        setError("");
        setResults(null);

        try {
            const response = await fetch(
                "http://localhost:3000/api/analyze",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        url: targetUrl
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to analyze website."
                );
            }

            setResults(data);
        } catch (error) {
            console.error("Analysis error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="app">
            <BackgroundGrid />
            <CursorGlow />

            {loading ? (
                <AnalysisLoader url={url} />
            ) : !results ? (
                <section className="hero">
                    <p className="eyebrow">
                        WEB INTELLIGENCE / 01
                    </p>

                    <h1>
                        SEE WHAT'S
                        <br />
                        <span>BEHIND THE LINK.</span>
                    </h1>

                    <p className="subtitle">
                        Inspect the structure and SEO health
                        of any website.
                    </p>

                    <div className="url-box">
                        <input
                            type="text"
                            value={url}
                            onChange={(event) =>
                                setUrl(event.target.value)
                            }
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    analyzeWebsite("seo");
                                }
                            }}
                            placeholder="https://example.com"
                            disabled={loading}
                        />
                    </div>

                    <div className="analysis-options">
                        <Magnetic strength={0.12}>
                            <button
                                className="analysis-option html-option"
                                onClick={() =>
                                    analyzeWebsite("html")
                                }
                            >
                                <span className="option-number">
                                    01
                                </span>

                                <span className="option-content">
                                    <strong>HTML INFO</strong>
                                    <small>
                                        Inspect page structure,
                                        links, assets & metadata
                                    </small>
                                </span>

                                <span className="option-arrow">
                                    ↗
                                </span>
                            </button>
                        </Magnetic>

                        <Magnetic strength={0.12}>
                            <button
                                className="analysis-option seo-option"
                                onClick={() =>
                                    analyzeWebsite("seo")
                                }
                            >
                                <span className="option-number">
                                    02
                                </span>

                                <span className="option-content">
                                    <strong>SEO ANALYSIS</strong>
                                    <small>
                                        Check SEO health, issues
                                        & optimization
                                    </small>
                                </span>

                                <span className="option-arrow">
                                    ↗
                                </span>
                            </button>
                        </Magnetic>
                    </div>

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}
                </section>
            ) : (
                <Results
                    data={results}
                    view={view}
                    setView={setView}
                    onBack={() => setResults(null)}
                />
            )}
        </main>
    );
}

function Results({ data, view, setView, onBack }) {
    return (
        <section className="results-page">
            <div className="results-header">
                <button
                    className="back-button"
                    onClick={onBack}
                >
                    ← Analyze another
                </button>

                <div>
                    <p className="eyebrow">
                        LINKLENS / ANALYSIS
                    </p>

                    <h2>{data.url}</h2>
                </div>
            </div>

            <div className="result-tabs">
                <button
                    className={view === "html" ? "active" : ""}
                    onClick={() => setView("html")}
                >
                    HTML INFO
                </button>

                <button
                    className={view === "seo" ? "active" : ""}
                    onClick={() => setView("seo")}
                >
                    SEO ANALYSIS
                </button>
            </div>

            {view === "seo" ? (
                <SEOAnalysis seo={data.seo} />
            ) : (
                <HTMLInfo htmlInfo={data.htmlInfo} />
            )}
        </section>
    );
}

function SEOAnalysis({ seo }) {
    return (
        <>
            <div className="seo-section">
                <div className="score-card">
                    <p className="card-label">
                        SEO SCORE
                    </p>

                    <div className="score">
                        {seo.score}
                    </div>

                    <p className="rating">
                        {seo.rating}
                    </p>
                </div>

                <div className="performance-card">
                    <p className="card-label">
                        PERFORMANCE
                    </p>

                    <div className="big-value">
                        {seo.performance.responseTime}
                    </div>

                    <p className="muted">
                        Server response time
                    </p>
                </div>

                <div className="issues-card">
                    <p className="card-label">
                        SEO ISSUES
                    </p>

                    <div className="big-value">
                        {seo.issues.length}
                    </div>

                    <p className="muted">
                        Issues detected
                    </p>
                </div>
            </div>

            <div className="section-heading">
                <p className="eyebrow">
                    01 / SEO ANALYZER
                </p>

                <h3>
                    What needs attention?
                </h3>
            </div>

            <div className="issues-list">
                {seo.issues.length === 0 ? (
                    <div className="issue good">
                        No SEO issues detected.
                    </div>
                ) : (
                    seo.issues.map((issue, index) => (
                        <div
                            className={`issue ${issue.severity}`}
                            key={index}
                        >
                            <div>
                                <span className="issue-type">
                                    {issue.severity}
                                </span>

                                <h4>
                                    {issue.message}
                                </h4>
                            </div>

                            <p>
                                {issue.details}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

function HTMLInfo({ htmlInfo }) {
    return (
        <>
            <div className="section-heading html-heading">
                <p className="eyebrow">
                    01 / HTML INFO
                </p>

                <h3>
                    What's inside the page?
                </h3>
            </div>

            <div className="info-grid">
                <InfoCard
                    label="TITLE"
                    value={htmlInfo.title || "Missing"}
                />

                <InfoCard
                    label="META DESCRIPTION"
                    value={
                        htmlInfo.description ||
                        "Missing"
                    }
                />

                <InfoCard
                    label="CANONICAL"
                    value={
                        htmlInfo.canonical ||
                        "Not found"
                    }
                />

                <InfoCard
                    label="LINKS"
                    value={htmlInfo.links.total}
                    detail={`${htmlInfo.links.internal} internal · ${htmlInfo.links.external} external`}
                />

                <InfoCard
                    label="IMAGES"
                    value={htmlInfo.images.total}
                    detail={`${htmlInfo.images.missingAlt} missing alt`}
                />

                <InfoCard
                    label="SCRIPTS"
                    value={htmlInfo.scripts}
                />

                <InfoCard
                    label="STYLESHEETS"
                    value={htmlInfo.stylesheets}
                />

                <InfoCard
                    label="HEADINGS"
                    value={htmlInfo.headings.h1}
                    detail={`${htmlInfo.headings.h2} H2 · ${htmlInfo.headings.h3} H3`}
                />

                <InfoCard
                    label="BROKEN LINKS"
                    value={htmlInfo.links.broken}
                />

                <InfoCard
                    label="REDIRECTED LINKS"
                    value={htmlInfo.links.redirected}
                />
            </div>
        </>
    );
}

function InfoCard({ label, value, detail }) {
    return (
        <div className="info-card">
            <p className="card-label">
                {label}
            </p>

            <div className="info-value">
                {value}
            </div>

            {detail && (
                <p className="muted">
                    {detail}
                </p>
            )}
        </div>
    );
}

export default App;
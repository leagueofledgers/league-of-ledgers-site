import LandingPage from "../components/landing-page";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "League of Ledgers",
      url: "https://www.leagueofledgers.com/",
    },
    {
      "@type": "Organization",
      name: "League of Ledgers",
      url: "https://www.leagueofledgers.com/",
      logo: "https://www.leagueofledgers.com/league-of-ledgers-logo.svg",
      email: "marcus@leagueofledgers.com",
      description:
        "Bookkeeping and financial reporting for HVAC, plumbing, electrical, and home-service contractors.",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <LandingPage />
    </>
  );
}

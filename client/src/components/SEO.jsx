import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description }) => {
  const defaultTitle = "Goel Paints and Hardware Store | Sector 70 Mohali";
  const defaultDesc = "Leading Paint and Hardware shop in Sector 70, Mohali. Authorised Asian Paints & Nerolac dealer. Plumbing, electrical, tools & home delivery available. Call 094175 11727.";

  // Schema.org LocalBusiness JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HardwareStore",
    "name": "Goel Paints and Hardware Store",
    "alternateName": "ਗੋਇਲ ਪੈਂਟਸ ਅਤੇ ਹਾਰਡਵੇਅਰ ਸਟੋਰ",
    "image": "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600",
    "telephone": "+919417511727",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Booth No. 4, Sector 70",
      "addressLocality": "Sahibzada Ajit Singh Nagar (Mohali)",
      "addressRegion": "Punjab",
      "postalCode": "160071",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.6974",
      "longitude": "76.7118"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.1",
      "reviewCount": "60"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:30"
      }
    ],
    "priceRange": "₹₹"
  };

  return (
    <Helmet>
      <title>{title ? `${title} | Goel Paints Mohali` : defaultTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content="paint shop sector 70 mohali, hardware store mohali, asian paints dealer mohali, nerolac paint mohali, dr fixit waterproofing, plumbing supplies mohali" />
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default SEO;

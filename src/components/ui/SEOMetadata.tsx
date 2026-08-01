import React, { useEffect } from 'react';

interface SEOMetadataProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
}

export const SEOMetadata: React.FC<SEOMetadataProps> = ({
  title = 'Lara Concrete LLC | Premier Concrete Contractor | Driveways, Patios & Foundations',
  description = 'Lara Concrete LLC is America\'s premier concrete contractor specializing in 4,000+ PSI rebar-reinforced driveways, stamped patios, garage slabs, foundations, and commercial flatwork.',
  canonicalUrl = 'https://laraconcrete.com'
}) => {
  useEffect(() => {
    document.title = title;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // OpenGraph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);
  }, [title, description]);

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ConcreteContractor'],
    name: 'Lara Concrete LLC',
    image: 'https://laraconcrete.com/social-share.png',
    telePhone: '+1-316-993-0376',
    email: 'estimates@laraconcrete.com',
    url: 'https://laraconcrete.com',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4100 E 21st St',
      addressLocality: 'Wichita',
      addressRegion: 'KS',
      postalCode: '67208',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.7214,
      longitude: -97.2912
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '06:00',
        closes: '19:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '07:00',
        closes: '16:00'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '1247'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
};

import React, { useEffect } from 'react';

interface SEOMetadataProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
}

export const SEOMetadata: React.FC<SEOMetadataProps> = ({
  title = 'ZenBid Pro | Turnkey Concrete Estimating & SaaS Platform (Up For Ownership)',
  description = 'ZenBid Pro is an enterprise turnkey SaaS estimating platform for concrete contractors & flatwork companies. Features interactive 3D visual CAD slab estimation, AI photo vision, client portal, admin CMS, and local SEO city generator. Ready for immediate acquisition & ownership.',
  canonicalUrl = 'https://zenbidpro.com'
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
  }, [title, description, canonicalUrl]);

  // Comprehensive Schema.org LocalBusiness & Service Area for Wichita Metro
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'ConcreteContractor'],
        '@id': 'https://laraconcrete.com/#business',
        name: 'Lara Concrete LLC',
        image: [
          'https://laraconcrete.com/lara-logo.jpg',
          'https://laraconcrete.com/social-share.png'
        ],
        logo: 'https://laraconcrete.com/lara-logo.jpg',
        telephone: '+1-316-993-0376',
        alternatePhone: '+1-316-249-9873',
        email: 'estimates@laraconcrete.com',
        url: 'https://laraconcrete.com',
        priceRange: '$$$',
        hasMap: 'https://maps.google.com/?q=Wichita+KS+Lara+Concrete',
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
          latitude: 37.6872,
          longitude: -97.3301
        },
        areaServed: [
          {
            '@type': 'City',
            name: 'Wichita',
            sameAs: 'https://en.wikipedia.org/wiki/Wichita,_Kansas'
          },
          {
            '@type': 'City',
            name: 'Andover',
            sameAs: 'https://en.wikipedia.org/wiki/Andover,_Kansas'
          },
          { '@type': 'City', name: 'Derby', sameAs: 'https://en.wikipedia.org/wiki/Derby,_Kansas' },
          {
            '@type': 'City',
            name: 'Goddard',
            sameAs: 'https://en.wikipedia.org/wiki/Goddard,_Kansas'
          },
          { '@type': 'City', name: 'Maize', sameAs: 'https://en.wikipedia.org/wiki/Maize,_Kansas' },
          {
            '@type': 'City',
            name: 'Bel Aire',
            sameAs: 'https://en.wikipedia.org/wiki/Bel_Aire,_Kansas'
          },
          {
            '@type': 'City',
            name: 'Haysville',
            sameAs: 'https://en.wikipedia.org/wiki/Haysville,_Kansas'
          },
          {
            '@type': 'City',
            name: 'Valley Center',
            sameAs: 'https://en.wikipedia.org/wiki/Valley_Center,_Kansas'
          },
          {
            '@type': 'City',
            name: 'Park City',
            sameAs: 'https://en.wikipedia.org/wiki/Park_City,_Kansas'
          }
        ],
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
          reviewCount: '1247',
          bestRating: '5',
          worstRating: '1'
        },
        makesOffer: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Residential Concrete Driveway Pouring' }
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Stamped Concrete Patio Installation' }
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Monolithic Slab & House Foundations' }
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Commercial Parking Lot & Loading Dock Slabs' }
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Decorative Acid Stained Concrete Floors' }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
};

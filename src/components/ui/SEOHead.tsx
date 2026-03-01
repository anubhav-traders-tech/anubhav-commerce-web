import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    canonicalUrl?: string;
    type?: string;
    schemaData?: Record<string, any>;
}

export function SEOHead({
    title,
    description,
    canonicalUrl,
    type = 'website',
    schemaData
}: SEOProps) {
    useEffect(() => {
        // Update Title
        document.title = title;

        const updateMeta = (selector: string, attribute: string, value: string) => {
            let element = document.querySelector(selector);
            if (!element) {
                element = document.createElement('meta');
                if (selector.startsWith('meta[name')) {
                    element.setAttribute('name', selector.match(/name="(.*?)"/)![1]);
                } else if (selector.startsWith('meta[property')) {
                    element.setAttribute('property', selector.match(/property="(.*?)"/)![1]);
                }
                document.head.appendChild(element);
            }
            element.setAttribute(attribute, value);
        };

        // Standard Meta
        updateMeta('meta[name="description"]', 'content', description);

        // Open Graph
        updateMeta('meta[property="og:title"]', 'content', title);
        updateMeta('meta[property="og:description"]', 'content', description);
        updateMeta('meta[property="og:type"]', 'content', type);

        // Twitter Cards
        updateMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
        updateMeta('meta[name="twitter:title"]', 'content', title);
        updateMeta('meta[name="twitter:description"]', 'content', description);

        // Canonical URL
        if (canonicalUrl) {
            updateMeta('meta[property="og:url"]', 'content', canonicalUrl);
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) {
                canonical = document.createElement('link');
                canonical.setAttribute('rel', 'canonical');
                document.head.appendChild(canonical);
            }
            canonical.setAttribute('href', canonicalUrl);
        }

        // Structured Data Schema Injection
        if (schemaData) {
            let script = document.querySelector('script[id="json-ld-schema"]');
            if (script) {
                script.remove();
            }
            script = document.createElement('script');
            script.setAttribute('type', 'application/ld+json');
            script.setAttribute('id', 'json-ld-schema');
            script.textContent = JSON.stringify(schemaData);
            document.head.appendChild(script);
        }

    }, [title, description, canonicalUrl, type, schemaData]);

    return null; // This component handles side effects only
}

import React from 'react';
import { UTMLinkGenerator } from '../../components/common/UTMLinkGenerator';
import { useUTMTracking } from '../../hooks/useUTMTracking';

const UTMLinksPage: React.FC = () => {
  const { trackPageView } = useUTMTracking();

  React.useEffect(() => {
    trackPageView('UTM Ссылки');
  }, [trackPageView]);

  return (
    <div className="utm-links-page">
      <UTMLinkGenerator />
    </div>
  );
};

export default UTMLinksPage; 
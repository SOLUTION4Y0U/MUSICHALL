import React, { useState } from 'react';
import { generateSourceLinks, TRAFFIC_SOURCES } from '../../utils/utmTracking';
import './UTMLinkGenerator.css';

interface SourceLink {
  name: string;
  url: string;
  description?: string;
}

export const UTMLinkGenerator: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Генерируем ссылки для всех источников
  const sourceLinks = generateSourceLinks();

  // Конфигурация источников с описаниями
  const sources: SourceLink[] = [
    {
      name: 'Источник 1',
      url: sourceLinks[TRAFFIC_SOURCES.SOURCE_1],
      description: 'Описание первого источника трафика'
    },
    {
      name: 'Источник 2', 
      url: sourceLinks[TRAFFIC_SOURCES.SOURCE_2],
      description: 'Описание второго источника трафика'
    },
    {
      name: 'Источник 3',
      url: sourceLinks[TRAFFIC_SOURCES.SOURCE_3], 
      description: 'Описание третьего источника трафика'
    },
    {
      name: 'Источник 4',
      url: sourceLinks[TRAFFIC_SOURCES.SOURCE_4],
      description: 'Описание четвертого источника трафика'
    },
    {
      name: 'Источник 5',
      url: sourceLinks[TRAFFIC_SOURCES.SOURCE_5],
      description: 'Описание пятого источника трафика'
    },
    {
      name: 'Источник 6',
      url: sourceLinks[TRAFFIC_SOURCES.SOURCE_6],
      description: 'Описание шестого источника трафика'
    }
  ];

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(url);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="utm-link-generator">
      <h2>Ссылки с UTM-метками для отслеживания трафика</h2>
      <p className="description">
        Используйте эти ссылки для размещения на различных источниках. 
        Каждая ссылка содержит уникальные UTM-метки для отслеживания трафика.
      </p>
      
      <div className="sources-grid">
        {sources.map((source, index) => (
          <div key={index} className="source-card">
            <h3>{source.name}</h3>
            {source.description && (
              <p className="source-description">{source.description}</p>
            )}
            <div className="link-container">
              <input
                type="text"
                value={source.url}
                readOnly
                className="link-input"
              />
              <button
                onClick={() => copyToClipboard(source.url)}
                className={`copy-button ${copiedLink === source.url ? 'copied' : ''}`}
              >
                {copiedLink === source.url ? 'Скопировано!' : 'Копировать'}
              </button>
            </div>
            <div className="utm-info">
              <small>
                UTM Source: {source.url.includes('utm_source=') ? 
                  source.url.split('utm_source=')[1].split('&')[0] : 'N/A'}
              </small>
            </div>
          </div>
        ))}
             </div>
     </div>
   );
 }; 
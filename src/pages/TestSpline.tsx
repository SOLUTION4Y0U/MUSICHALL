import React, { useEffect, useState } from 'react';
import type { SplineProps } from '@splinetool/react-spline';

const TestSpline: React.FC = () => {
  const [Spline, setSpline] = useState<React.ComponentType<SplineProps> | null>(null);
  useEffect(() => {
    import('@splinetool/react-spline').then((module) => {
      setSpline(() => module.default);
    });
  }, []);
  const SplineComponent = Spline || (() => <div style={{color: 'red', fontWeight: 'bold'}}>Spline not loaded</div>);

  return (
    <div style={{ minHeight: '50vh', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 1000, height: 500, border: '2px solid lime', borderRadius: 16, background: '#111', marginRight: '700px' }}>
        <SplineComponent
          scene="https://prod.spline.design/VOvM5rREhyEgRYbe/scene.splinecode"
          style={{ width: '100%', height: '100%', marginRight: '700px' }}
        />
      </div>
    </div>
  );
};

export default TestSpline; 
import { useCallback } from 'react';
import Globe, { type GlobeMethods } from 'react-globe.gl';
import { COLORS, ZOOM_LIMITS } from '../constants';

interface GlobeComponentProps {
  globeRef: React.RefObject<GlobeMethods>;
  polygonsData: object[];
  countryColors: Map<string, string>;
  onCountryClick: (polygon: object) => void;
  showTooltip?: boolean;
}

const GlobeComponent = ({ globeRef, polygonsData, countryColors, onCountryClick, showTooltip }: GlobeComponentProps) => {
  const getPolygonColor = useCallback((polygon: any) => {
    const id = polygon.id || polygon.properties.name;
    return countryColors.get(id) || COLORS.DEFAULT;
  }, [countryColors]);

  const handleZoom = useCallback((pov: any) => {
    if (pov.altitude < ZOOM_LIMITS.MIN) {
      globeRef.current?.pointOfView({ altitude: ZOOM_LIMITS.MIN }, 0);
    } else if (pov.altitude > ZOOM_LIMITS.MAX) {
      globeRef.current?.pointOfView({ altitude: ZOOM_LIMITS.MAX }, 0);
    }
  }, [globeRef]);

  const polygonLabel = useCallback(({ properties }: any) => {
    if (!showTooltip) return '';
    const countryName = properties.name || properties.ADMIN || 'País desconocido';
    return `
      <div style="background: rgba(0,0,0,0.8); padding: 8px; border-radius: 4px; color: white;">
        <strong>${countryName}</strong>
      </div>
    `;
  }, [showTooltip]);

  return (
    <Globe
      ref={globeRef}
      width={window.innerWidth}
      height={window.innerHeight}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      backgroundColor="rgba(0,0,0,0)"
      polygonsData={polygonsData}
      polygonCapColor={getPolygonColor}
      polygonSideColor={() => 'rgba(0, 0, 0, 0.9)'}
      polygonStrokeColor={() => COLORS.POLYGON_STROKE}
      polygonAltitude={0.01}
      onPolygonClick={onCountryClick}
      polygonLabel={polygonLabel}
      animateIn={true}
      onZoom={handleZoom}
    />
  );
};

export default GlobeComponent;
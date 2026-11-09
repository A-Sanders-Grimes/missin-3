import ModelGroup from './ModelGroup';

export default function CarCard({ processedData }) {
  if (!processedData) return null;

  return (
    <div className="car-card">
      <h2>Manufacturer: {processedData.brand}</h2>
      <div className="car-summary">
        Unique Sorted Models: <strong>{processedData.totalModelsCount}</strong>
      </div>
      <div className="groups-scroll-area">
        {Object.entries(processedData.groupedByInitial).map(([letter, models]) => (
          <ModelGroup key={letter} letter={letter} models={models} />
        ))}
      </div>
    </div>
  );
}
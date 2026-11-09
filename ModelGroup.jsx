export default function ModelGroup({ letter, models }) {
  return (
    <div className="model-group">
      <div className="group-title">
        Letter {letter} ({models.length})
      </div>
      <div className="badge-container">
        {models.map((model, index) => (
          <span key={`${letter}-${model}-${index}`} className="badge">
            {model}
          </span>
        ))}
      </div>
    </div>
  );
}
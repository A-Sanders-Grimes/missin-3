import { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CarCard from './components/CarCard';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  const [query, setQuery] = useState("");
  const [rawData, setRawData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Bonus: persist recent history or preferences in LocalStorage
  const [searchHistory, setSearchHistory] = useLocalStorage('car_search_history', []);

  // Data processing logic cleanly derived via useMemo
  const processedData = useMemo(() => {
    if (!rawData || !rawData.Results) return null;

    const results = rawData.Results;
    const validNames = results
      .map(item => (item && typeof item.Model_Name === 'string' ? item.Model_Name.trim() : null))
      .filter(name => name !== null && name.length > 0);

    const uniqueSortedModels = [...new Set(validNames)].sort((a, b) => a.localeCompare(b));

    const groupedByInitial = uniqueSortedModels.reduce((acc, model) => {
      const initial = model.charAt(0).toUpperCase();
      if (!acc[initial]) acc[initial] = [];
      acc[initial].push(model);
      return acc;
    }, {});

    return {
      brand: query.toUpperCase(),
      totalModelsCount: uniqueSortedModels.length,
      uniqueSortedModels,
      groupedByInitial,
    };
  }, [rawData, query]);

  const handleSearch = async () => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) {
      setError("Please enter a valid car manufacturer name.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRawData(null);

    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${encodeURIComponent(trimmedQuery)}?format=json`
      );

      if (!response.ok) {
        throw new Error("Server response failed. Please try again later.");
      }

      const data = await response.json();

      if (!data.Results || data.Results.length === 0) {
        throw new Error(`No models found for manufacturer "${trimmedQuery}". Try honda, toyota, or ford.`);
      }

      setRawData(data);
      
      // Update history in LocalStorage (bonus custom hook usage)
      setSearchHistory(prev => Array.from(new Set([trimmedQuery, ...prev])).slice(0, 5));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <SearchBar 
        query={query} 
        setQuery={setQuery} 
        onSearch={handleSearch} 
        isLoading={isLoading} 
      />

      {isLoading && <div id="loadingIndicator">Querying vehicle databases... 🏎️</div>}
      {error && <div id="errorMessage">{error}</div>}

      {!isLoading && !error && processedData && (
        <main id="resultContainer">
          <CarCard processedData={processedData} />
        </main>
      )}

      {!isLoading && !error && !processedData && (
        <main id="resultContainer">
          <div className="placeholder-text">Type a car brand above and hit search to load models.</div>
          {searchHistory.length > 0 && (
            <div style={{ marginTop: '15px', fontSize: '0.8rem', color: '#94a3b8' }}>
              Recent searches: {searchHistory.join(', ')}
            </div>
          )}
        </main>
      )}
    </div>
  );
}
type SortOption = 'price-asc' | 'price-desc' | 'rating-desc';

interface CatalogSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

const CatalogSearch = ({ searchQuery, onSearchChange, sortBy, onSortChange }: CatalogSearchProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-6 bg-brand-dark rounded-xl shadow-lg">
      {/* Поисковая строка с иконкой */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-brand-mid-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Поиск товаров..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-brand-black/50 border border-brand-mid-gray/20 rounded-xl text-brand-light-gray placeholder-brand-mid-gray focus:ring-2 focus:ring-brand-copper focus:border-transparent focus:outline-none transition-all duration-200"
        />
      </div>

      {/* Стилизованный select */}
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="appearance-none pl-4 pr-10 py-3 w-full sm:w-64 bg-brand-black/50 border border-brand-mid-gray/20 rounded-xl text-brand-light-gray focus:ring-2 focus:ring-brand-copper focus:border-transparent focus:outline-none transition-all duration-200"
        >
          <option value="rating-desc">По рейтингу</option>
          <option value="price-asc">Цена: по возрастанию</option>
          <option value="price-desc">Цена: по убыванию</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-brand-mid-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CatalogSearch;
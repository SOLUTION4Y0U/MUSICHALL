import { Category } from '../../../types/product';

interface CategoryListProps {
  categories: Category[];
  selectedCategoryId: string | undefined;
  onCategorySelect: (selectedCategoryId: string | undefined) => void;
}

const CategoryList = ({ categories, selectedCategoryId, onCategorySelect }: CategoryListProps) => {
  const allCategories = [
    { id: undefined, name: 'Все категории' },
    ...categories
  ];

  return (
    <>
            {/* Мобильная версия: 2 ряда с горизонтальной прокруткой */}
      <div className="block md:hidden mb-3">
        <div className="overflow-x-auto no-scrollbar bg-brand-dark/30 rounded-lg p-3">
          <div
            className="grid grid-rows-2 grid-flow-col gap-2"
            style={{
              gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
              minWidth: 'max-content'
            }}
          >
            {allCategories.map((category, index) => (
              <button
                key={category.id || 'all'}
                onClick={() => onCategorySelect(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategoryId === category.id
                    ? 'bg-brand-copper text-brand-black'
                    : 'bg-brand-black text-brand-light-gray border border-brand-mid-gray/30 hover:bg-brand-black hover:border-brand-copper'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Десктопная версия: обычный flex-wrap */}
      <div className="hidden md:flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => onCategorySelect(undefined)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            !selectedCategoryId
              ? 'bg-brand-copper text-brand-black'
              : 'bg-brand-black text-brand-light-gray border border-brand-mid-gray/30 hover:bg-brand-black hover:border-brand-copper'
          }`}
        >
          Все категории
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              selectedCategoryId === category.id
                ? 'bg-brand-copper text-brand-black'
                : 'bg-brand-black text-brand-light-gray border border-brand-mid-gray/30 hover:bg-brand-black hover:border-brand-copper'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default CategoryList;
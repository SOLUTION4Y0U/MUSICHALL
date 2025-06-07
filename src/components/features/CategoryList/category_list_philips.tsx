import { Category } from '../../../types/product';

interface CategoryListProps {
  categories: Category[];
  selectedCategoryId: string | undefined;
  onCategorySelect: (selectedCategoryId: string | undefined) => void;
}

const CategoryListPhilips = ({ categories, selectedCategoryId, onCategorySelect }: CategoryListProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button
        onClick={() => onCategorySelect(undefined)}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
          !selectedCategoryId
            ? 'bg-brand-blue text-brand-black'
            : 'bg-brand-black text-brand-light-gray border border-brand-mid-gray/30 hover:bg-brand-black hover:border-brand-blue'
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
              ? 'bg-brand-blue text-brand-black'
              : 'bg-brand-black text-brand-light-gray border border-brand-mid-gray/30 hover:bg-brand-black hover:border-brand-blue'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryListPhilips;
import { FC } from 'react';
import { Category } from '../../../types/product';
import './CategoryList.css';

interface CategoryListProps {
  categories: Category[];
  selectedCategoryId?: string;
  onSelectCategory: (categoryId: string | undefined) => void;
}

const CategoryList: FC<CategoryListProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory
}) => {
  return (
    <div className="category-list">
      <div
        className={`category-item ${!selectedCategoryId ? 'active' : ''}`}
        onClick={() => onSelectCategory(undefined)}
      >
        <div className="category-content">
          <span>Все категории</span>
        </div>
      </div>

      {categories.map(category => (
        <div
          key={category.id}
          className={`category-item ${selectedCategoryId === category.id ? 'active' : ''}`}
          onClick={() => onSelectCategory(category.id)}
        >
          <div className="category-content">
            {category.image && (
              <div className="category-image">
                <img src={category.image} alt={category.name} />
              </div>
            )}
            <span>{category.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
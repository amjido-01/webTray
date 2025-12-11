import React from 'react'

interface Category {
  id: number;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryIds: number[];
  onCategoryToggle: (categoryId: number) => void;
  onApplyFilter: () => void;
  isLoading?: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategoryIds,
  onCategoryToggle,
  onApplyFilter,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Categories</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          ))}
        </div>
        <button className="w-full bg-gray-300 text-gray-500 font-semibold py-2 px-2 rounded-lg mt-8 cursor-not-allowed">
          Apply Filter
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-sm space-y-2 font-semibold border border-[#EBEBEB] p-2">
      <h2 className="text-[14px] text-[#4D4D4D] ">Categories</h2>
      
      <div className="space-y-3 mb-8">
        {categories.map((category) => (
          <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCategoryIds.includes(category.id)}
              onChange={() => onCategoryToggle(category.id)}
              className="w-4 h-4 text-[#111827] bg-gray-100 border-gray-300 rounded focus:ring-[#111827]"
            />
            <span className="text-gray-700 font-medium">{category.name}</span>
          </label>
        ))}
        
        {categories.length === 0 && (
          <p className="text-gray-500 text-sm">No categories available</p>
        )}
      </div>

      <button
        onClick={onApplyFilter}
        disabled={selectedCategoryIds.length === 0}
        className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors duration-200 ${
          selectedCategoryIds.length === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-[#111827] hover:bg-[#111827] text-white'
        }`}
      >
        Apply Filter
      </button>
    </div>
  )
}

export default CategoryFilter
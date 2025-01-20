import { useEffect, useState } from "react";
import TButton from "../../../../shared/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function CategorySelector({ onCategoryChange, categories }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const topLevelCategories = categories.filter((cat) => cat.parent === null);
    setFilteredCategories([topLevelCategories]);
  }, [categories]);

  const handleCategorySelect = (level, categoryId) => {
    const selectedCategory = categories.find((cat) => cat.id === categoryId);
    const parentId = selectedCategory?.parent?.id || null;
    onCategoryChange(parentId);

    const updatedPath = selectedCategories.slice(0, level);
    if (selectedCategory) {
      updatedPath.push(selectedCategory);
    }
    setSelectedCategories(updatedPath);

    const nextLevelCategories = categories.filter(
      (cat) => cat.parent?.id === categoryId
    );
    setFilteredCategories((prev) => {
      const updated = prev.slice(0, level + 1);
      if (nextLevelCategories.length > 0) {
        updated.push(nextLevelCategories);
      }
      return updated;
    });
  };

  return (
    <div>
      {filteredCategories.map((options, level) => (
        <div key={level} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Level {level + 1}
          </label>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategories[level]?.id || ""}
              onChange={(e) => handleCategorySelect(level, parseInt(e.target.value, 10))}
              className="flex-grow mt-1 p-2 border rounded-md"
            >
              {!selectedCategories[level] && <option value="">Select a category</option>}
              {options.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.title}
                </option>
              ))}
            </select>
            {selectedCategories[level]?.id && (
              <TButton
                className="shrink-0 p-2 w-auto bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                to={`create?pId=${selectedCategories[level - 1]?.id || ""}&gpId=${selectedCategories[level - 2]?.id || ""}`}
                color="green"
              >
                <PlusCircleIcon className="h-6 w-6 mr-2 inline" />
                Create New
              </TButton>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

import { useState, useCallback, useEffect } from "react";

const useCategories = (categories, initialCategoryId, updateFormData) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [finalCategoryId, setFinalCategoryId] = useState(initialCategoryId);

  const initializeSelectedCategories = useCallback(
    (categoryId) => {
      const path = [];
      let currentId = categoryId;

      while (currentId) {
        const category = categories.find((cat) => cat.id === currentId);
        if (category) {
          path.unshift(category);
          currentId = category.parent?.id;
        } else {
          break;
        }
      }

      const levels = path.map((cat, index) =>
        categories.filter((c) => c.parent?.id === path[index - 1]?.id)
      );
      const nextLevelCategory = categories.filter(
        (cat) =>
          cat.parent ? cat.parent?.id === path[path.length - 1]?.id : null
      );

      setSelectedCategories(path);
      setFilteredCategories(() => {
        const updated = [...levels];
        if (nextLevelCategory.length > 0) {
          updated.push(nextLevelCategory);
        }
        return updated;
      });
    },
    [categories]
  );

  const handleCategoryChange = (level, categoryId) => {
    const updatedPath = selectedCategories.slice(0, level);
    const selectedCategory = categories.find((cat) => cat.id === categoryId);

    if (selectedCategory) {
      updatedPath.push(selectedCategory);
    }

    const nextLevelCategories = categories.filter(
      (cat) => cat.parent?.id === categoryId
    );
    setSelectedCategories(updatedPath);

    setFilteredCategories((prev) => {
      const updated = prev.slice(0, level + 1);
      if (nextLevelCategories.length > 0) {
        updated.push(nextLevelCategories);
        setFinalCategoryId(null);
      } else {
        setFinalCategoryId(categoryId);
      }
      return updated;
    });
    if (updateFormData) {
      updateFormData((prevData) => ({
        ...prevData,
        category_id: categoryId,
      }));
    }
  };

  useEffect(() => {
    if (initialCategoryId) {
      initializeSelectedCategories(initialCategoryId);
    } else {
      setFilteredCategories([categories.filter((cat) => cat.parent === null)]);
    }
  }, [categories, initialCategoryId, initializeSelectedCategories]);

  return {
    selectedCategories,
    filteredCategories,
    finalCategoryId,
    handleCategoryChange,
  };
};

export default useCategories;

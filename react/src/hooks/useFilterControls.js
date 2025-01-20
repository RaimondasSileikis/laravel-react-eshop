import { useState } from "react";

export const useFilterControls = ({ defaultSortField = "created_at", defaultSortDirection = "desc" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(defaultSortField);
  const [sortDirection, setSortDirection] = useState(defaultSortDirection);
  const [currentPage, setCurrentPage] = useState(1);

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  return {
    searchQuery,
    setSearchQuery,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    currentPage,
    setCurrentPage,
    handleClearSearch,
  };
};

import { useEffect, useState } from "react";

import { getAllSchemes } from "../services/schemeService";

import SchemeList from "../components/scheme/SchemeList";
import SchemeFilters from "../components/scheme/SchemeFilters";

const SearchSchemes = () => {
  const [allSchemes, setAllSchemes] = useState([]);
  const [schemes, setSchemes] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [income, setIncome] = useState("");

  useEffect(() => {
    loadSchemes();
  }, []);

  // Load all schemes
  const loadSchemes = async () => {
    try {
      const data = await getAllSchemes();

      console.log("RAW SCHEMES:", data);

      const schemesData = data || [];

      setAllSchemes(schemesData);
      setSchemes(schemesData);
    } catch (error) {
      console.error("Error loading schemes:", error);

      setAllSchemes([]);
      setSchemes([]);
    }
  };

  // Save recent searches
  const saveRecentSearch = (query) => {
    let searches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];

    if (!searches.includes(query)) {
      searches.unshift(query);
    }

    searches = searches.slice(0, 5);

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(searches)
    );
  };

  // Apply all filters together
  const applyFilters = () => {
    let filtered = [...allSchemes];

    const searchText = keyword.trim().toLowerCase();

    // Keyword Search
    if (searchText) {
      filtered = filtered.filter(
        (scheme) =>
          scheme.scheme_name?.toLowerCase().includes(searchText) ||
          scheme.category?.toLowerCase().includes(searchText) ||
          scheme.eligibility?.some((item) =>
            item.toLowerCase().includes(searchText)
          ) ||
          scheme.benefits?.some((item) =>
            item.toLowerCase().includes(searchText)
          )
      );
    }

    // Category Filter
    if (category) {
      filtered = filtered.filter(
        (scheme) => scheme.category === category
      );
    }

    // Income Filter
    if (income) {
      const userIncome = Number(income);

      filtered = filtered.filter(
        (scheme) =>
          userIncome >= scheme.min_income &&
          userIncome <= scheme.max_income
      );
    }

    setSchemes(filtered);
  };

  // Search Button
  const handleSearch = () => {
    applyFilters();

    if (keyword.trim()) {
      saveRecentSearch(keyword.trim());
    }
  };

  // Category Change
  const handleCategoryFilter = (value) => {
    setCategory(value);
  };

  // Income Change
  const handleIncomeFilter = (value) => {
    setIncome(value);
  };

  return (
    <div className="search-page">

      {/* HEADER */}
      <div className="page-header">
        <h2>🔎 Search Government Schemes</h2>
        <p style={{ color: "gray" }}>
          Find and filter government welfare schemes based on your needs
        </p>
      </div>

      {/* FILTER SECTION */}
      <div className="filter-section">
        <h4>Apply Filters</h4>

        <SchemeFilters
          keyword={keyword}
          setKeyword={setKeyword}
          category={category}
          setCategory={handleCategoryFilter}
          income={income}
          setIncome={handleIncomeFilter}
          onSearch={handleSearch}
        />
      </div>

      {/* RESULTS SECTION */}
      <div className="results-section">

        {/* RESULTS HEADER (NEW UI STRUCTURE) */}
        <div className="results-header">
          <h4>Available Schemes</h4>
          <p>Showing schemes based on selected filters</p>
        </div>

        <SchemeList schemes={schemes} />
      </div>

    </div>
  );
};

export default SearchSchemes;
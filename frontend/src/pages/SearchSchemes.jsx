import { useEffect, useState } from "react";

import {
  getAllSchemes
} from "../services/schemeService";

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

      const schemesData = Array.isArray(data)
        ? data
        : [];

      setAllSchemes(schemesData);
      setSchemes(schemesData);

    } catch (error) {
      console.error(
        "Error loading schemes:",
        error
      );

      setAllSchemes([]);
      setSchemes([]);
    }
  };

  // Apply all filters together
  const applyFilters = () => {

    let filtered = [...allSchemes];

    // Keyword Search
    if (keyword.trim()) {

      const searchText =
        keyword.toLowerCase();

      filtered = filtered.filter(
        (scheme) =>
          scheme.scheme_name
            ?.toLowerCase()
            .includes(searchText) ||

          scheme.category
            ?.toLowerCase()
            .includes(searchText) ||

          scheme.eligibility?.some(
            (item) =>
              item
                .toLowerCase()
                .includes(searchText)
          ) ||

          scheme.benefits?.some(
            (item) =>
              item
                .toLowerCase()
                .includes(searchText)
          )
      );
    }

    // Category Filter
    if (category) {
      filtered = filtered.filter(
        (scheme) =>
          scheme.category === category
      );
    }

    // Income Filter
    if (income) {

      const userIncome =
        Number(income);

      filtered = filtered.filter(
        (scheme) =>
          userIncome >=
            scheme.min_income &&
          userIncome <=
            scheme.max_income
      );
    }

    setSchemes(filtered);
  };

  // Search Button
  const handleSearch = () => {
    applyFilters();
  };

  // Category Change
  const handleCategoryFilter = (
    value
  ) => {
    setCategory(value);
  };

  // Income Change
  const handleIncomeFilter = (
    value
  ) => {
    setIncome(value);
  };

  return (
    <div className="container">

      <h2>
        Search Government Schemes
      </h2>

      <SchemeFilters
        keyword={keyword}
        setKeyword={setKeyword}
        category={category}
        setCategory={
          handleCategoryFilter
        }
        income={income}
        setIncome={
          handleIncomeFilter
        }
        onSearch={handleSearch}
      />

      <SchemeList
        schemes={schemes}
      />

    </div>
  );
};

export default SearchSchemes;
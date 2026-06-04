const SchemeFilters = ({
  keyword,
  setKeyword,
  category,
  setCategory,
  income,
  setIncome,
  onSearch
}) => {
  return (
    <div className="filters">

      {/* Search Keyword */}
      <div className="filter-group">
        <label>Search Scheme</label>
        <input
          type="text"
          placeholder="Enter scheme name or keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="filter-group">
        <label>Category</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>

          <option value="Agriculture">
            Agriculture
          </option>

          <option value="Education">
            Education
          </option>

          <option value="Healthcare">
            Healthcare
          </option>

          <option value="Housing">
            Housing
          </option>

          <option value="Women">
            Women
          </option>

          <option value="Business">
            Business
          </option>

          <option value="Employment">
            Employment
          </option>

          <option value="Technology">
            Technology
          </option>

          <option value="Insurance">
            Insurance
          </option>

          <option value="Workers">
            Workers
          </option>

          <option value="Banking">
            Banking
          </option>

          <option value="Pension">
            Pension
          </option>
        </select>
      </div>

      {/* Income */}
      <div className="filter-group">
        <label>Income Limit</label>

        <input
          type="number"
          placeholder="Enter annual income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </div>

      {/* Button */}
      <div className="filter-group">
        <label>&nbsp;</label>

        <button onClick={onSearch}>
          Apply Filters
        </button>
      </div>

    </div>
  );
};

export default SchemeFilters;
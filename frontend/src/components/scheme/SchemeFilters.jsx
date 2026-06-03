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

      <input
        type="text"
        placeholder="Search Scheme"
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="">
          All Categories
        </option>

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

      <input
        type="number"
        placeholder="Income"
        value={income}
        onChange={(e) =>
          setIncome(e.target.value)
        }
      />

      <button onClick={onSearch}>
        Apply Filters
      </button>

    </div>
  );
};

export default SchemeFilters;
import SchemeCard from "./SchemeCard";

const SchemeList = ({ schemes = [] }) => {
  return (
    <div>
      {schemes.length > 0 ? (
        schemes.map((scheme) => (
          <SchemeCard
            key={scheme.scheme_name}
            scheme={scheme}
            type="search"
          />
        ))
      ) : (
        <p>No schemes found</p>
      )}
    </div>
  );
};

export default SchemeList;
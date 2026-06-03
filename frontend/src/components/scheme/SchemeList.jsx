import SchemeCard from "./SchemeCard";

const SchemeList = ({ schemes = [] }) => {
  return (
    <div>
      {schemes.length > 0 ? (
        schemes.map((scheme, index) => (
          <SchemeCard
            key={index}
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
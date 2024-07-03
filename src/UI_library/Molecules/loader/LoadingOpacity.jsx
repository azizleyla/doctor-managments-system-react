export default ({ loading, children }) => (
  <div className="loadingContentWrapper">
    {loading && (
      <div className="loadingContentConatiner">
        <div className="animated-background" />
        <LoadingIcon />
        <div className="text">Gözləyin</div>
      </div>
    )}
    {children}
  </div>
);

const LoadingIcon = () => (
  <div className="contentLoaderIcon">
    <div className="inner one" />
    <div className="inner two" />
    <div className="inner three" />
  </div>
);

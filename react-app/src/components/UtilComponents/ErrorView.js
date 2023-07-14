export const ErrorView = ({ error, styling }) => {
  return <p className={`error ${styling ? styling : ''}`}>{error}</p>;
};

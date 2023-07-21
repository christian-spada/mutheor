export const ErrorView = ({ error, styling }) => {
  return (
    <div>
      <i className="fa-solid fa-circle-exclamation error"></i>
      <p className={`error ${styling ? styling : ''}`}>{error}</p>
    </div>
  );
};

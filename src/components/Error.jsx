import { useRouteError } from "react-router-dom";

const Error = () => {
  const ErrorToShow = useRouteError();
  console.log(ErrorToShow);
  const { data, status, statusText } = ErrorToShow;
  return (
    <div>
      <h1>{data}</h1>
      <p>
        {status}-{statusText}
      </p>
    </div>
  );
};
export default Error;

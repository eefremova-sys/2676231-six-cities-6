import { Link } from 'react-router-dom';

function Error(): JSX.Element {
  return (
    <div className='errorPage'>
      <div>
        <h1>404.</h1>
        <h2> Страница не найдена.... </h2>
      </div>

      <Link to = "/"> Go to main page </Link>
    </div>
  );
}

export default Error;

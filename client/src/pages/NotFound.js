import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <section className="grow flex flex-col justify-center items-center dark:bg-gray-800 text-gray-600 dark:text-gray-300 ">
            <div>
                <h3 className="text-3xl my-4">404</h3>
            </div>
            <div>
                <h3 className="text-2xl my-4">
                    Oops – looks like you need some more typing practice! This
                    URL does not exist.
                </h3>
            </div>
            <div>
                <button className="w-full text-center py-3 px-7 my-4 rounded bg-theme-blue text-gray-100 dark:text-gray-300 hover:bg-blue-600 focus:outline-none my-1 transition-all duration-300">
                    <Link to="/">Home</Link>
                </button>
            </div>
        </section>
    );
};

export default NotFound;

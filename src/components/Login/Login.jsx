import backgroundImage from "../../Images/logoimg.jpg";
import useLoginForm from "../../hooks/useLoginForm";
import useAuthentication from "../../hooks/useAuthentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock,faEnvelope,faNewspaper, faKey } from "@fortawesome/free-solid-svg-icons";
const Signin = () => {
  const { data, error, handleChange, setError } = useLoginForm();
  const { authenticate } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = await authenticate(data);
    if (errorMessage) {
      setError(errorMessage);
    }
  };

  return (
    <div className="bg-black dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <section className="hidden bg-cover lg:block lg:w-2/3" style={{ backgroundImage: `url('${backgroundImage}')` }}>
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <article>
              <h1 className="text-4xl font-bold text-white">TechTalk News</h1>
              <p className="max-w-xl mt-3 text-gray-300">
                Welcome to TechTalk, the go-to social network for technology and
                news enthusiasts! Here, you can connect with a passionate
                community that shares your interests and discover the latest
                trends in the digital world.
              </p>
            </article>
          </div>
        </section>

        <aside className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <header className="text-center">
              <h1 className="text-4xl font-bold text-center text-gray-500 dark:text-white">
                TechTalk <FontAwesomeIcon icon={faNewspaper} />
              </h1>
              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Sign in to access your account
              </p>
            </header>

            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm text-gray-300 dark:text-gray-200">
                  <FontAwesomeIcon icon={faEnvelope} style={{color: "#1271ba",}} /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                    onChange={handleChange}
                    value={data.email}
                    required
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-gray-300 dark:text-gray-200">
                    <FontAwesomeIcon icon={faLock} style={{color: "#1271ba",}} /> Password
                    </label>
                    <a href="forgot-password" className="text-sm text-gray-300 focus:text-blue-500 hover:text-blue-500 hover:underline">
                    Forgot password <FontAwesomeIcon icon={faKey} style={{color: "#1271ba",}} /> ?
                    </a>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    onChange={handleChange}
                    value={data.password}
                    required
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  {error && (
                    <div className="w-370px p-15px my-5px text-14px bg-f34646 text-white rounded-5px text-center">
                      {error}
                    </div>
                  )}

                  <button
                    className="w-full px-4 py-2 tracking-wide rounded-lg text-white transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                Don't have an account yet?{" "}
                <a
                  href="/signup"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Sign up
                </a>
                .
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Signin;

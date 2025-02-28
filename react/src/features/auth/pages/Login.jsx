import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../authSlice";
import { mergeGuestCart } from "../../shop/cart";
import { getGuestCart } from "../../../utils/localCart";
import Loader from "../../../shared/loader/Skeleton";

export default function Login() {
  const { loading } = useSelector((store) => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData);
    try {
      const result = await dispatch(loginUser(userData)).unwrap();
      if (result.user.is_admin) {
        navigate('/dashboard');
      } else if (!result.user.is_admin) {
        const guestCartItems = getGuestCart();
        if (guestCartItems.length > 0) {
          dispatch(mergeGuestCart());
        }
        navigate('/');
      }
      if (!result) {
        e.currentTarget.reset();
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {loading ? (
          <Loader type="text" className="w-full h-10" count={1} />
        ) : (
          <>
            <div className="mb-6 p-4 border rounded-md bg-gray-50">
              <label htmlFor="demo" className="block text-sm font-medium leading-6 text-gray-900">
                Demo Accounts
              </label>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <strong>Customer:</strong>
                  <div>Email: <span className="font-mono">user@example.com</span></div>
                  <div>Password: <span className="font-mono">user123</span></div>
                </li>
                <li>
                  <strong>Admin:</strong>
                  <div>Email: <span className="font-mono">admin@example.com</span></div>
                  <div>Password: <span className="font-mono">admin123</span></div>
                </li>
              </ul>
            </div>
            <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </>
        )}
        <p className="mt-10 text-center text-sm text-gray-500">
          No account?{' '}
          <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Create account
          </Link>
        </p>
      </div>
    </div>
  )
}

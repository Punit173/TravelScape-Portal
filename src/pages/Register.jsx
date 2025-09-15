import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import logo from '../assets/Travelscape logo.png';
import { useNavigate } from 'react-router-dom';
import AuthBackground from '../components/AuthBackground';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError("Passwords don't match");
    }

    setError('');
    setLoading(true);

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
      // Redirect will be handled by the auth observer
    } catch (error) {
      setError('Failed to create an account. ' + error.message);
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <>
      <AuthBackground />
      <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-secondary/80 p-8 backdrop-blur-md shadow-2xl ring-1 ring-primary/10">
          <div>
          <img
            className="mx-auto h-12 w-auto"
            src={logo}
            alt="Travelscape"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-primary-dark">
            Join the Authority Portal to manage tourist safety
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md border border-red-500 bg-red-500/10 p-4">
              <div className="text-sm text-red-500">{error}</div>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-primary">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-primary/20 bg-secondary px-3 py-2 text-primary placeholder-primary-dark/50 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-primary/20 bg-secondary px-3 py-2 text-primary placeholder-primary-dark/50 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                placeholder="Create a strong password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-primary">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-primary/20 bg-secondary px-3 py-2 text-primary placeholder-primary-dark/50 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-secondary hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="text-primary-dark">Already have an account? </span>
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary-dark"
            >
              Sign in here
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
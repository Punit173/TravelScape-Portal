import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your inbox for further instructions');
    } catch (error) {
      setError('Failed to reset password: ' + error.message);
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-secondary py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
          Reset Password
        </h2>
        <p className="mt-2 text-center text-sm text-primary-dark">
          Enter your email to receive password reset instructions
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-secondary-light px-4 py-8 shadow-lg ring-1 ring-primary/10 sm:rounded-lg sm:px-10">
          {error && (
            <div className="relative mb-4 rounded-md border border-red-500 bg-red-500/10 px-4 py-3 text-red-500" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {message && (
            <div className="relative mb-4 rounded-md border border-green-500 bg-green-500/10 px-4 py-3 text-green-500" role="alert">
              <span className="block sm:inline">{message}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-primary/20 bg-secondary px-3 py-2 placeholder-primary-dark/50 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-secondary shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Reset Password'}
              </button>
            </div>

            <div className="text-center">
              <Link to="/login" className="text-sm font-medium text-primary hover:text-primary-dark">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
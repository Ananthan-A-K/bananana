import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input.jsx';
import { useAuth } from '../context/useAuth.js';
import api from '../services/api.js';

const initialValues = {
  email: '',
  password: '',
};

function validate(values) {
  const nextErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.email.trim()) {
    nextErrors.email = 'Email is required';
  } else if (!emailRegex.test(values.email)) {
    nextErrors.email = 'Enter a valid email address';
  }

  if (!values.password) {
    nextErrors.password = 'Password is required';
  } else if (values.password.length < 6) {
    nextErrors.password = 'Password must be at least 6 characters';
  }

  return nextErrors;
}

function Login() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const approvalMessage = location.state?.message;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setSubmitError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const { data } = await api.post('/auth/login', values);
      const token = data.token;
      const user = data.user;

      if (!token || !user?.role) {
        throw new Error('Invalid login response');
      }

      login({ token, user });
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard', {
        replace: true,
      });
    } catch (error) {
      setSubmitError(
        error.response?.data?.message || 'Login failed. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-6xl items-center justify-center px-4 py-10 bg-pitch-black">
      <div className="w-full max-w-md rounded-[25px] border border-charcoal-900 bg-charcoal-900/60 p-6 shadow-sm sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-warm-cream uppercase">Login</h1>
          <p className="mt-1.5 text-xs text-ash tracking-wide font-light">
            Access your campus complaint dashboard.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {approvalMessage ? (
            <p className="rounded-lg border border-acid-lime/30 bg-acid-lime/10 px-4 py-3 text-xs font-medium tracking-wide text-acid-lime">
              {approvalMessage}
            </p>
          ) : null}
          <div className="rounded-xl bg-pitch-black/60 border border-pitch-black px-4 py-3 text-[11px] text-warm-cream/80 font-light leading-relaxed">
            <span className="font-bold text-warm-cream uppercase tracking-wider block mb-1">Demo Credentials:</span>
            Student: <code className="text-acid-lime">student@campus.edu</code> / <code className="text-acid-lime">password123</code><br/>
            Admin: <code className="text-acid-lime">admin@campus.edu</code> / <code className="text-acid-lime">password123</code>
          </div>
          
          <Input
            error={errors.email}
            id="login-email"
            label="Email Address"
            name="email"
            onChange={handleChange}
            placeholder="student@campus.edu"
            type="email"
            value={values.email}
          />
          <Input
            error={errors.password}
            id="login-password"
            label="Password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            type="password"
            value={values.password}
          />

          {submitError ? (
            <p className="rounded-lg bg-pitch-black border border-ember-orange/40 px-4 py-3 text-xs text-ember-orange font-medium tracking-wide">
              {submitError}
            </p>
          ) : null}

          <button
            className="w-full rounded-full bg-acid-lime px-4 py-3.5 text-xs font-black tracking-[0.2em] text-pitch-black transition hover:bg-lime-400 disabled:cursor-not-allowed disabled:bg-charcoal-900/60 disabled:text-warm-cream/30 uppercase cursor-pointer"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in ↗'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-ash tracking-wide font-light">
          New to BANANANA?{' '}
          <Link
            className="font-bold text-acid-lime hover:underline uppercase tracking-[0.15em] text-[10px] ml-1.5"
            to="/register"
          >
            Create account
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;

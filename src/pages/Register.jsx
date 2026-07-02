import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input.jsx';
import api from '../services/api.js';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

function validate(values) {
  const nextErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.name.trim()) {
    nextErrors.name = 'Name is required';
  }

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

function Register() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
      const { data } = await api.post('/auth/register', values);
      const user = data.user;

      if (!user?.role) {
        throw new Error('Invalid register response');
      }

      navigate('/login', {
        replace: true,
        state: {
          message:
            data.message ||
            'Account created. An admin must approve it before you can log in.',
        },
      });
    } catch (error) {
      setSubmitError(
        error.response?.data?.message ||
          'Registration failed. Please try again.',
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
          <h1 className="text-2xl font-bold tracking-tight text-warm-cream uppercase">Create account</h1>
          <p className="mt-1.5 text-xs text-ash tracking-wide font-light">
            Register a student account. An admin must approve it before login.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <Input
            error={errors.name}
            id="register-name"
            label="Name"
            name="name"
            onChange={handleChange}
            placeholder="Your full name"
            value={values.name}
          />
          <Input
            error={errors.email}
            id="register-email"
            label="Email Address"
            name="email"
            onChange={handleChange}
            placeholder="name@campus.edu"
            type="email"
            value={values.email}
          />
          <Input
            error={errors.password}
            id="register-password"
            label="Password"
            name="password"
            onChange={handleChange}
            placeholder="Minimum 6 characters"
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
            {isSubmitting ? 'Creating account...' : 'Create account ↗'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-ash tracking-wide font-light">
          Already have an account?{' '}
          <Link
            className="font-bold text-acid-lime hover:underline uppercase tracking-[0.15em] text-[10px] ml-1.5"
            to="/login"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';

function ProtectedRoute({ allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.approvalStatus === 'pending') {
    return <Navigate to="/login" replace state={{ message: 'Your account is waiting for admin approval.' }} />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

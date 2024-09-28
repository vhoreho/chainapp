import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { ROUTES } from "@/constants/routes";
import { useAuthContext } from "@/hooks/context";

/**
 * Protects routes from unauthorized access.
 *
 * If the user is not authenticated (i.e. no token is present),
 * and the current route is not a login or register route, the
 * user will be redirected to the login page. Otherwise, the children
 * component will be rendered.
 *
 * @param children the component to protect
 * @returns the protected component, or null if the user is not authenticated
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthContext();
  const router = useRouter();

  const unprotectedRoutes = useMemo(() => [ROUTES.LOGIN, ROUTES.REGISTER], []);

  useEffect(() => {
    if (!token && !unprotectedRoutes.includes(router.pathname)) {
      router.push(ROUTES.LOGIN);
    }
  }, [token, router, unprotectedRoutes]);

  if (unprotectedRoutes.includes(router.pathname)) {
    return <>{children}</>;
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

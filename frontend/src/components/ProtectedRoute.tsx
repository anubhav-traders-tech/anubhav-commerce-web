import { Navigate } from "react-router-dom";
import React from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = false;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

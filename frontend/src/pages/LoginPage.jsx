import { AuthPageLayout } from "../components/layout/AuthPageLayout";
import { LoginForm } from "../components/auth/LoginForm";

export const LoginPage = () => {
  return (
    <AuthPageLayout side="login">
      <LoginForm />
    </AuthPageLayout>
  );
};

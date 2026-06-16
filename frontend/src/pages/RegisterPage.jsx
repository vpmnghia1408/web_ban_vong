import { AuthPageLayout } from "../components/layout/AuthPageLayout";
import { RegisterForm } from "../components/auth/RegisterForm";

export const RegisterPage = () => {
  return (
    <AuthPageLayout side="register">
      <RegisterForm />
    </AuthPageLayout>
  );
};

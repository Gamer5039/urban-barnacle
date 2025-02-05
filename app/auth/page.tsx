import AuthForm from './AuthForm';

export default function AuthPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </main>
  );
}

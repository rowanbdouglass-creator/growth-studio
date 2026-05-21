import { SignIn } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-sans font-medium text-2xl tracking-tight text-ink mb-1">
            Sign in
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            Internal platform · Growth Studio
          </p>
        </div>
        <div className="flex justify-center">
          <SignIn
            routing="path"
            path="/platform/sign-in"
            signUpUrl="/platform/sign-up"
            fallbackRedirectUrl="/platform"
          />
        </div>
      </div>
    </div>
  );
}

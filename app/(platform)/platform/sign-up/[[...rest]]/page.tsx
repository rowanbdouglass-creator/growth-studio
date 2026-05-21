import { SignUp } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-sans font-medium text-2xl tracking-tight text-ink mb-1">
            Create account
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            Internal platform · Growth Studio
          </p>
        </div>
        <div className="flex justify-center">
          <SignUp
            routing="path"
            path="/platform/sign-up"
            signInUrl="/platform/sign-in"
            fallbackRedirectUrl="/platform"
          />
        </div>
      </div>
    </div>
  );
}

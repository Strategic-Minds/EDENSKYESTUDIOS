import type { ReactNode } from "react";
import { cookies } from "next/headers";

function isSupabaseReady() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

async function hasAdminSession() {
  const jar = await cookies();
  return Boolean(
    jar.get("eden-admin-session")?.value ||
      jar.get("sb-access-token")?.value ||
      jar.get("supabase-auth-token")?.value
  );
}

export async function AdminAuthGate({ children }: { children: ReactNode }) {
  const ready = isSupabaseReady();
  const session = await hasAdminSession();

  if (!ready || !session) {
    return (
      <main className="eden-site">
        <section className="home-hero">
          <div className="hero-copy">
            <p className="pink">Admin Access Required</p>
            <h1>
              Locked.
              <br />
              <span>Supabase Ready.</span>
              <br />
              Session Required.
            </h1>
            <p>
              This admin control plane is hidden by default. Connect Supabase auth and establish a valid admin session to unlock the control surfaces.
            </p>
            <div className="hero-actions">
              <a className="hot-btn" href="/">
                Return Home
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return <>{children}</>;
}

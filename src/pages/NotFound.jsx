import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="flex min-h-[60vh] items-center justify-center py-12"
    >
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="font-heading text-5xl font-bold text-primary">
          404
        </p>

        <h1
          id="not-found-title"
          className="mt-4 text-2xl font-bold"
        >
          Page not found
        </h1>

        <p className="mt-3 text-sm text-muted">
          This page does not exist or may have moved.
        </p>

        <Link
          to="/dashboard"
          className="
            mt-6 inline-flex min-h-11 items-center justify-center
            rounded-xl bg-primary px-5 py-3
            font-semibold text-app
            hover:bg-primary-hover
          "
        >
          Back to dashboard
        </Link>
      </div>
    </section>
  );
}
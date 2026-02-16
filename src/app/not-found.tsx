export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">404</h2>
        <p className="text-xl mb-6">Page not found</p>
        <a href="/" className="text-[var(--c-aqua)] hover:underline">
          Return Home
        </a>
      </div>
    </div>
  );
}

export function MainBackground() {
  return (
    <>
      {/* Animated Background - Purple/Indigo/Blue Gradient Orbs */}
      <div className="absolute inset-0 -z-10 h- full overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-50 via-indigo-50 to-blue-50" />

        {/* Animated orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-br from-purple-300/30 to-indigo-400/30 rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-1/4 right-1/4 w-lg h-128 bg-linear-to-br from-indigo-300/25 to-blue-400/25 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-80 h-80 bg-linear-to-br from-blue-300/30 to-indigo-400/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-linear-to-br from-purple-300/20 to-blue-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-background opacity-40" />
      </div>
    </>
  );
}

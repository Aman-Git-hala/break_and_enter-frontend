import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-24 py-5 bg-[#0f0529]/80 backdrop-blur-md text-white border-b border-white/10">

      <div className="flex items-center gap-2 text-xl font-bold tracking-wide">
        🤖 <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Break_And_Enter</span>
      </div>

      <div className="hidden md:flex gap-8 text-gray-300 font-medium">
        <a href="#home" className="hover:text-white transition hover:underline underline-offset-4 decoration-purple-500">Home</a>
        <a href="#about" className="hover:text-white transition hover:underline underline-offset-4 decoration-purple-500">About</a>
        <a href="#contact" className="hover:text-white transition hover:underline underline-offset-4 decoration-purple-500">Contact</a>
      </div>

      <div className="flex gap-3">
        {/* UPDATED: Single Dashboard Button */}
        <Link
          to="/dashboard"
          className="bg-white/10 border border-white/20 text-white font-semibold px-6 py-2 rounded-full hover:bg-white hover:text-purple-900 transition backdrop-blur-sm"
        >
          Go to Dashboard
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
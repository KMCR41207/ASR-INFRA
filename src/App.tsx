import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router";
import { useState } from "react";
import { Toaster } from "sonner";
import { Menu, X, Truck, Phone } from "lucide-react";

// Pages
import { HomePage } from "./app/components/pages/HomePage";
import { AboutPage } from "./app/components/pages/AboutPage";
import { ServicesPage } from "./app/components/pages/ServicesPage";
import { ContactPage } from "./app/components/pages/ContactPage";
import { QuotePage } from "./app/components/pages/QuotePage";
import { UserAuthPage } from "./app/components/pages/UserAuthPage";
import { UserDashboardPage } from "./app/components/pages/UserDashboardPage";
import { MyOffersPage } from "./app/components/pages/MyOffersPage";
import { OfferDetailPage } from "./app/components/pages/OfferDetailPage";
import { AdminLoginPage } from "./app/components/pages/AdminLoginPage";
import { AdminDashboardPage } from "./app/components/pages/AdminDashboardPage";
import { NotFound } from "./app/components/pages/NotFound";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  // Don't show navbar on admin/dashboard pages
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/my-offers") ||
    location.pathname === "/login";

  if (hideNavbar) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-md group-hover:bg-accent transition-colors duration-200">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-primary tracking-tight">ASR</span>
              <span className="text-xl font-bold text-accent ml-1 tracking-tight">INFRA</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                  isActive(link.to)
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1.5 text-sm text-primary/70 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </a>
            <Link
              to="/login"
              className="bg-accent hover:bg-accent/90 text-white text-sm font-semibold px-4 py-2 rounded-md transition-all shadow-sm hover:shadow-md"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md text-foreground/70 hover:text-primary hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-3 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground/70 hover:text-primary hover:bg-primary/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border mt-2">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-accent hover:bg-accent/90 text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const location = useLocation();
  const hideFooter =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/my-offers") ||
    location.pathname === "/login";

  if (hideFooter) return null;

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-accent p-1.5 rounded-md">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-baseline">
                <span className="text-xl font-bold">ASR</span>
                <span className="text-xl font-bold text-accent ml-1">INFRA</span>
              </div>
            </div>
            <p className="text-[#a8c0d6] text-sm leading-relaxed">
              Reliable transportation and supply services across India. Specializing in goods carrier, sand & steel supply.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/services", label: "Services" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
                { to: "/login", label: "Request a Quote" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#a8c0d6] hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-[#a8c0d6] text-sm">
              <li>
                <span className="block font-medium text-white mb-0.5">Phone</span>
                +91 98765 43210
              </li>
              <li>
                <span className="block font-medium text-white mb-0.5">Email</span>
                info@asrinfra.com
              </li>
              <li>
                <span className="block font-medium text-white mb-0.5">Address</span>
                C5M4+W24, Bommakal Rd, Krishna Nagar,
                <br />
                Bommakal, Telangana 505002
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#a8c0d6] text-sm">
          <p>© {new Date().getFullYear()} ASR INFRA. All rights reserved.</p>
          <p>Transportation · Sand Supply · Steel Supply</p>
        </div>
      </div>
    </footer>
  );
}

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<UserAuthPage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/my-offers" element={<MyOffersPage />} />
          <Route path="/my-offers/:id" element={<OfferDetailPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <AppLayout />
    </BrowserRouter>
  );
}

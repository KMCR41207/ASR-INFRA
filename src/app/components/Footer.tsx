import { Link } from "react-router";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <span className="text-2xl font-bold">ASR</span>
              <span className="text-2xl font-bold text-accent ml-1">INFRA</span>
            </div>
            <p className="text-[#a8c0d6] text-sm">
              Reliable transportation and supply services for construction and logistics needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#a8c0d6] hover:text-accent transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#a8c0d6] hover:text-accent transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#a8c0d6] hover:text-accent transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#a8c0d6] hover:text-accent transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/quote" className="text-[#a8c0d6] hover:text-accent transition-colors text-sm">
                  Get Quote
                </Link>
              </li>
              <li className="pt-2">
                <Link 
                  to="/admin/login" 
                  className="inline-block bg-accent/20 hover:bg-accent text-white font-semibold py-1.5 px-3 rounded transition-all text-sm border border-accent"
                >
                  🔐 Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-[#a8c0d6]">
              <li>Goods Transportation</li>
              <li>Trucking Services</li>
              <li>Sand Supply</li>
              <li>Steel Supply</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin size={18} className="text-accent mt-1 flex-shrink-0" />
                <span className="text-[#a8c0d6]">
                  C5M4+W24, Bommakal Rd, Krishna Nagar, Housing Board Colony, Karimnagar, Bommakal, Telangana 505002
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <span className="text-[#a8c0d6]">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <span className="text-[#a8c0d6]">info@asrinfra.com</span>
              </li>
            </ul>
            
            {/* Google Maps Button */}
            <div className="mt-4">
              <a 
                href="https://maps.app.goo.gl/2rSo8xU6HY3yaSQr8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold py-2 px-4 rounded-lg transition-all text-sm"
              >
                📍 Get Directions
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-[#1a3d5c]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#7a9ab5] text-sm">
              © 2026 ASR INFRA. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-[#7a9ab5] hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-[#7a9ab5] hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-[#7a9ab5] hover:text-accent transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-[#7a9ab5] hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

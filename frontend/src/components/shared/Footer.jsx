import { Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo & Description */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Job<span className="text-green-500">Portal</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-400">
              Connecting talented professionals with top companies.
              Discover exciting opportunities, build your career,
              and find your dream job all in one place.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="p-2 bg-slate-800 rounded-full hover:bg-green-500 hover:text-white transition"
              >
                <FaFacebook size={18} />
              </a>

              <a
                href="#"
                className="p-2 bg-slate-800 rounded-full hover:bg-green-500 hover:text-white transition"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="p-2 bg-slate-800 rounded-full hover:bg-green-500 hover:text-white transition"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="#"
                className="p-2 bg-slate-800 rounded-full hover:bg-green-500 hover:text-white transition"
              >
                <FaTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li className="hover:text-green-500 cursor-pointer transition">
                Home
              </li>

              <li className="hover:text-green-500 cursor-pointer transition">
                Browse Jobs
              </li>

              <li className="hover:text-green-500 cursor-pointer transition">
                Companies
              </li>

              <li className="hover:text-green-500 cursor-pointer transition">
                About Us
              </li>

              <li className="hover:text-green-500 cursor-pointer transition">
                Contact
              </li>
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Popular Categories
            </h3>

            <ul className="space-y-3">
              <li>Frontend Developer</li>
              <li>Backend Developer</li>
              <li>Full Stack Developer</li>
              <li>UI/UX Designer</li>
              <li>Data Analyst</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Contact Us
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-green-500" />
                <span>support@jobportal.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-green-500" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-green-500" />
                <span>India</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-sm text-gray-500">
            © 2026 JobPortal. All Rights Reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0 text-sm">
            <span className="hover:text-green-500 cursor-pointer transition">
              Privacy Policy
            </span>

            <span className="hover:text-green-500 cursor-pointer transition">
              Terms & Conditions
            </span>

            <span className="hover:text-green-500 cursor-pointer transition">
              Help Center
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
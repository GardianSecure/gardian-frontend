// LandingPage.jsx
import React, { useState } from "react";

export default function LandingPage() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleScan = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const email = e.target.email.value;
    const siteUrl = e.target.siteUrl.value;

    try {
      const res = await fetch("https://gardian-backend-vukx.onrender.com/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, siteUrl, tier: "Free" }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert("❌ Scan failed. Try again.");
      }
    } catch (err) {
      alert("❌ Error connecting to backend.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-20 px-6">
        <img src="/Logo.jpg" alt="GardianX Logo" className="w-24 h-24 mb-6 rounded-full shadow-lg" />
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">GardianX</h1>
        <p className="text-lg text-gray-600 mb-8">Website security made simple.</p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
        >
          🚀 Start Free Scan
        </button>
      </header>

      {/* Features Section */}
      <section className="grid md:grid-cols-2 gap-8 px-8 py-12 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Free Report</h2>
          <ul className="space-y-3 text-gray-600">
            <li>✔ Instant security vulnerabilities check</li>
            <li>✔ SEO and performance insights</li>
            <li>✔ Simple steps explained in plain language</li>
            <li>✔ Checks for common OWASP Top 10 risks</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-2 border-green-600">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pro Report</h2>
          <ul className="space-y-3 text-gray-600">
            <li>✔ Detailed weekly report with full JSON/PDF</li>
            <li>✔ Includes “What we fixed” section</li>
            <li>✔ Progress tracking & GardianX badge</li>
            <li>✔ Automated daily scans</li>
          </ul>
          <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition">
            Upgrade to Pro
          </button>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="px-8 py-12 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">What GardianX Checks</h2>
        <p className="text-gray-600 mb-6">
          GardianX scans for OWASP Top 10 vulnerabilities, scam site detection, SSL/TLS configuration,
          security headers, SEO signals, and more. Free tier gives simplified reports, while Pro adds
          detailed reports, automated scans, and fixes handled by us.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 text-center py-6 mt-auto">
        <p>&copy; 2026 GardianX. All rights reserved.</p>
        <p className="text-green-400 font-semibold mt-2">✅ GardianX Checked</p>
      </footer>

      {/* Scan Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4">Run a Free Scan</h3>
            <form onSubmit={handleScan} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600"
              />
              <input
                type="url"
                name="siteUrl"
                placeholder="Enter your website URL"
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600"
              />
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                {loading ? "🔍 Scanning..." : "Run Scan"}
              </button>
            </form>
            {success && (
              <p className="text-green-600 font-semibold mt-4 text-center">
                ✅ Scan complete! Report emailed.
              </p>
            )}
            <button
              onClick={() => setShowForm(false)}
              className="mt-6 w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

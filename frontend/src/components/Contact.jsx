import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Github,
  Linkedin,
  Clock,
} from "lucide-react";
import { api } from "../services/api";

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", text: "Please fill in all required fields." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", text: "" });

    try {
      const response = await api.submitContact(formData);
      if (response.success) {
        setStatus({
          type: "success",
          text:
            response.message ||
            "Thank you! Ashish will get back to you shortly.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({
          type: "error",
          text: "Submission failed. Please email directly at rathiashish7079@gmail.com",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        text: "Something went wrong. Please connect via email or phone.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-brand-400 mb-3">
          <MessageSquare size={14} /> Let's Connect
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Get In{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-300 to-purple-400">
            Touch
          </span>
        </h2>
        <p className="mt-4 text-slate-400 text-base sm:text-lg">
          Interested in hiring, technical collaborations, or discussing software
          engineering roles? I'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">
              Contact Information
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Feel free to reach out directly via phone, email, or LinkedIn. I
              typically respond within 24 hours.
            </p>

            <div className="space-y-4 pt-2">
              <a
                href={`mailto:${profile.email || "rathiashish7079@gmail.com"}`}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-brand-500/60 text-slate-300 hover:text-white transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail size={17} />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Email
                  </span>
                  <span className="text-sm font-semibold">
                    {profile.email || "rathiashish7079@gmail.com"}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${profile.phone || "+917037283879"}`}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/60 text-slate-300 hover:text-white transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Phone
                  </span>
                  <span className="text-sm font-semibold">
                    {profile.phone || "+91 7037283879"}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Location
                  </span>
                  <span className="text-sm font-semibold">
                    {profile.location || "Pune, Maharashtra"}
                  </span>
                </div>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="pt-4 border-t border-slate-800 flex items-center gap-2.5 text-xs text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Open to Immediate Opportunities & Relocation</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-2xl space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Job Opportunity / Project Collaboration"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Message *
              </label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition resize-none"
              />
            </div>

            {/* Notification alert */}
            {status.text && (
              <div
                className={`p-4 rounded-xl flex items-start gap-3 text-xs ${
                  status.type === "success"
                    ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800"
                    : "bg-rose-950/80 text-rose-300 border border-rose-800"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                )}
                <span>{status.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-brand-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Message to Ashish</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../../components/common/Logo';
import {
  Building,
  Mail,
  Phone,
  Globe,
  MapPin,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const RegisterInstitutionPage: React.FC = () => {
  const { registerInstitution, navigate } = useApp();

  const [name, setName] = useState('');
  const [type, setType] = useState<'College' | 'University' | 'School' | 'Coaching Institute'>('College');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Pune');
  const [state, setState] = useState('Maharashtra');
  const [country, setCountry] = useState('India');
  const [website, setWebsite] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  const [onboardingSuccess, setOnboardingSuccess] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cityCode = city ? city.substring(0, 3).toUpperCase() : 'MET';
    const generatedId = `EDU-${cityCode}-${Math.floor(100 + Math.random() * 900)}`;

    const newInstData = {
      name,
      type,
      email,
      phone,
      address,
      city,
      state,
      country,
      website: website || `https://${name.toLowerCase().replace(/ /g, '')}.edu`,
      adminName,
      adminEmail
    };

    setOnboardingSuccess({ ...newInstData, code: generatedId });
    registerInstitution(newInstData);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center">
        <div onClick={() => navigate('/')} className="inline-block cursor-pointer">
          <Logo size="lg" />
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Register Your Educational Institution
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Provision an encrypted, multi-tenant academic operating workspace.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50">
          {onboardingSuccess ? (
            <div className="text-center py-8 space-y-5 animate-in fade-in">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">
                  Workspace Provisioned Successfully
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {onboardingSuccess.name}
                </h3>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Institutional Workspace ID:</span>
                  <span className="font-mono font-bold text-blue-700">{onboardingSuccess.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tenant Classification:</span>
                  <span className="font-semibold text-slate-900">{onboardingSuccess.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Master Admin:</span>
                  <span className="font-semibold text-slate-900">{onboardingSuccess.adminName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Administrative Email:</span>
                  <span className="font-semibold text-slate-900">{onboardingSuccess.adminEmail}</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-800 max-w-md mx-auto">
                <ShieldCheck className="w-4 h-4 inline mr-1 text-blue-600" />
                Data isolation active. Your students and faculty will sign in with code <strong>{onboardingSuccess.code}</strong>.
              </div>

              <button
                onClick={() => navigate('/admin/dashboard')}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-500/20 inline-flex items-center gap-2"
              >
                <span>Enter Campus Control Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-xs text-indigo-900 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Multi-Tenant Architecture:</strong> Each institution receives a dedicated identifier (e.g. EDU-PUN-001). Student and faculty records are completely isolated.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Institution Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune Institute of Computer Technology"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Institution Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white font-medium"
                  >
                    <option value="College">College</option>
                    <option value="University">University</option>
                    <option value="School">School (K-12)</option>
                    <option value="Coaching Institute">Coaching Institute</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Official Website
                  </label>
                  <input
                    type="url"
                    placeholder="https://pict.edu"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Institution Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="info@pict.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Phone Contact
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 (020) 2437-1101"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Campus Physical Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Dhankawadi, Pune-Satara Road"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    State &amp; Country
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2.5 bg-slate-50"
                    />
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2.5 bg-slate-50"
                    />
                  </div>
                </div>

                {/* Dean / Admin Details */}
                <div className="sm:col-span-2 pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-900 block mb-2">
                    Designated Institutional Administrator
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Admin / Dean Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. P. T. Kulkarni"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="principal@pict.edu"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Back to Sign In
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
                >
                  <span>Register &amp; Provision Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  UserPlus, 
  Phone, 
  Mail, 
  Share2, 
  Sparkles, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  HeartHandshake, 
  Star, 
  ShieldAlert,
  Radio
} from 'lucide-react';

export default function SafetyCircle() {
  // Pre-populated contacts state (Feature 2, 3, 4, 7)
  const [contacts, setContacts] = useState([
    {
      id: 'c-1',
      name: 'Elena Vance',
      relationship: 'Sister',
      phone: '+1 (555) 234-5678',
      email: 'elena.vance@example.com',
      role: 'Primary Contact',
      shareLiveJourney: true
    },
    {
      id: 'c-2',
      name: 'Marcus Sterling',
      relationship: 'Partner',
      phone: '+1 (555) 876-5432',
      email: 'marcus.s@example.com',
      role: 'Secondary Contact',
      shareLiveJourney: true
    },
    {
      id: 'c-3',
      name: 'Dr. Sarah Connor',
      relationship: 'Close Friend',
      phone: '+1 (555) 345-6789',
      email: 'sarah.c@example.com',
      role: 'Emergency Backup',
      shareLiveJourney: false
    }
  ]);

  // Add Contact Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: 'Family',
    phone: '',
    email: '',
    role: 'Secondary Contact',
    shareLiveJourney: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact(prev => ({ ...prev, [name]: value }));
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) return;

    const contactToAdd = {
      id: `c-${Date.now()}`,
      ...newContact
    };

    setContacts(prev => [contactToAdd, ...prev]);
    setNewContact({
      name: '',
      relationship: 'Family',
      phone: '',
      email: '',
      role: 'Secondary Contact',
      shareLiveJourney: true
    });
    setIsModalOpen(false);
  };

  const handleRemoveContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const handleToggleSharing = (id) => {
    setContacts(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, shareLiveJourney: !c.shareLiveJourney };
      }
      return c;
    }));
  };

  // Metrics (Feature 6)
  const totalContacts = contacts.length;
  const primaryContact = contacts.find(c => c.role === 'Primary Contact')?.name || 'None Assigned';
  const sharingEnabledCount = contacts.filter(c => c.shareLiveJourney).length;

  const getRoleBadgeClasses = (role) => {
    switch (role) {
      case 'Primary Contact':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Secondary Contact':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Emergency Backup':
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-14 sm:gap-20">
      
      {/* SECTION 1: Hero Section (Feature 1) */}
      <section className="reference-hero-container p-8 sm:p-14 lg:p-16">
        <div className="flex flex-col items-start gap-6 text-left max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-white border border-white/30 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>Intelligent Support Network</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-normal text-white font-heading tracking-tight leading-[1.1]">
            Your Trusted Safety Network
          </h1>

          <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
            Manage the people who can support you during your journeys and receive automated live route corridor updates.
          </p>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn-dark-green px-8 py-3.5 text-xs font-extrabold tracking-widest uppercase flex items-center gap-2 mt-2 shadow-xl"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Trusted Contact</span>
          </button>

        </div>
      </section>


      {/* SECTION 2: Contact Summary Metrics Dashboard (Feature 6) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="editorial-white-card p-7 border border-black/5 flex flex-col gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68] flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#1D2B26]" />
            Total Circle Contacts
          </span>
          <span className="text-4xl font-extrabold text-[#1D2B26] font-heading">
            {totalContacts}
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Active Support People
          </span>
        </div>

        <div className="editorial-white-card p-7 border border-black/5 flex flex-col gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68] flex items-center gap-1.5">
            <Star className="w-4 h-4 text-emerald-700" />
            Primary Contact
          </span>
          <span className="text-xl font-bold text-[#1D2B26] font-heading truncate">
            {primaryContact}
          </span>
          <span className="text-[11px] text-emerald-700 font-bold">
            1st Priority Responder
          </span>
        </div>

        <div className="editorial-white-card p-7 border border-black/5 flex flex-col gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68] flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-[#1D2B26]" />
            Live Sync Enabled
          </span>
          <span className="text-4xl font-extrabold text-[#1D2B26] font-heading">
            {sharingEnabledCount} / {totalContacts}
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Receiving Live Corridor Updates
          </span>
        </div>

        <div className="editorial-white-card p-7 border border-black/5 flex flex-col gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#666C68] flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-[#1D2B26]" />
            Network Status
          </span>
          <span className="text-2xl font-bold text-emerald-800 font-heading">
            Ready & Active
          </span>
          <span className="text-[11px] text-emerald-700 font-bold">
            Instant 1-Click SOS Sync
          </span>
        </div>

      </section>


      {/* SECTION 3: AI Notification Priority Recommendation (Feature 5) */}
      <section className="editorial-white-card p-8 sm:p-10 border border-emerald-200 bg-emerald-50/40 shadow-sm flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#1D2B26] text-white flex items-center justify-center shadow-md shrink-0">
          <Sparkles className="w-6 h-6 text-emerald-400" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-950">
              AI Priority Recommendation
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-emerald-100 text-emerald-900 border border-emerald-300">
              Smart Advisor
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-emerald-950 leading-relaxed font-heading">
            "Based on your current travel settings, your primary emergency contact ({primaryContact}) should be notified first during evening travel corridors."
          </p>
          <span className="text-[11px] text-emerald-800 font-medium">
            *HALO advises notification priority but will never automatically dispatch calls without user confirmation.
          </span>
        </div>
      </section>


      {/* SECTION 4: Trusted Contacts Grid (Feature 2, 3, 4) */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/5 pb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
              <Users className="w-4 h-4 text-[#1D2B26]" />
              <span>Safety Circle Members</span>
            </div>
            <h2 className="text-3xl font-normal text-[#222926] font-heading tracking-tight">
              Trusted Contacts List
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#1D2B26] hover:bg-[#14201C] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Contact</span>
          </button>
        </div>

        {/* Contacts Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div 
              key={contact.id}
              className="editorial-white-card p-7 border border-black/5 shadow-md flex flex-col justify-between gap-6 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col gap-4">
                
                {/* Header Badge */}
                <div className="flex items-start justify-between gap-2 border-b border-black/5 pb-4">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-[#222926] font-heading">
                      {contact.name}
                    </h3>
                    <span className="text-xs text-[#666C68] font-medium">
                      {contact.relationship}
                    </span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${getRoleBadgeClasses(contact.role)}`}>
                    {contact.role}
                  </span>
                </div>

                {/* Contact Details */}
                <div className="flex flex-col gap-2.5 text-xs text-[#222926]">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#666C68] shrink-0" />
                    <span className="font-semibold">{contact.phone}</span>
                  </div>

                  {contact.email && (
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#666C68] shrink-0" />
                      <span className="font-normal text-[#666C68] truncate">{contact.email}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom Actions: Toggle Share & Remove */}
              <div className="pt-4 border-t border-black/5 flex items-center justify-between gap-3">
                
                {/* Feature 4: Live Journey Sharing Toggle Switch */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleSharing(contact.id)}
                    className={`w-9 h-5 rounded-full transition-colors relative flex items-center ${
                      contact.shareLiveJourney ? 'bg-emerald-700' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                      contact.shareLiveJourney ? 'translate-x-4.5' : 'translate-x-1'
                    }`} />
                  </button>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1D2B26]">
                    Share Live Journey
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveContact(contact.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                  title="Remove contact"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Add Contact Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[5000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl border border-black/10 flex flex-col gap-6 relative my-auto">
            
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <div className="flex items-center gap-2 text-[#1D2B26] text-xs font-extrabold uppercase tracking-widest">
                <UserPlus className="w-4 h-4 text-[#1D2B26]" />
                <span>Add Circle Member</span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-black hover:bg-slate-100"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddContact} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={newContact.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Elena Vance"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                    Relationship
                  </label>
                  <select
                    name="relationship"
                    value={newContact.relationship}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
                  >
                    <option value="Sister">Sister</option>
                    <option value="Brother">Brother</option>
                    <option value="Partner">Partner</option>
                    <option value="Parent">Parent</option>
                    <option value="Close Friend">Close Friend</option>
                    <option value="Colleague">Colleague</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                    Emergency Priority Role *
                  </label>
                  <select
                    name="role"
                    value={newContact.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
                  >
                    <option value="Primary Contact">Primary Contact</option>
                    <option value="Secondary Contact">Secondary Contact</option>
                    <option value="Emergency Backup">Emergency Backup</option>
                  </select>
                </div>

              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={newContact.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#1D2B26]">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={newContact.email}
                  onChange={handleInputChange}
                  placeholder="contact@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-xs font-medium text-[#222926] focus:outline-none focus:border-[#1D2B26]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="shareJourneyCheck"
                  name="shareLiveJourney"
                  checked={newContact.shareLiveJourney}
                  onChange={(e) => setNewContact(prev => ({ ...prev, shareLiveJourney: e.target.checked }))}
                  className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-700"
                />
                <label htmlFor="shareJourneyCheck" className="text-xs font-semibold text-[#222926]">
                  Enable Live Journey Sharing for this contact
                </label>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1D2B26] text-xs font-extrabold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-dark-green w-full py-3.5 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <span>Save Contact</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

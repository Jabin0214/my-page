import { useTranslation } from 'react-i18next';
import { Github, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

const Contact = () => {
  const { t } = useTranslation();
  return (
    <section className="flex items-center justify-center min-h-screen p-6">
      <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/60 shadow-2xl transition-all duration-500 hover:scale-[1.01]">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-400 via-slate-600 to-slate-400 bg-[length:400%_400%] animate-gradientBlur opacity-20 rounded-3xl pointer-events-none"></div>

        <div className="relative z-10 flex min-h-[420px] flex-col justify-center px-8 py-10 text-white md:px-10">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
            <Mail className="h-7 w-7" />
          </div>

          <h2 className="mb-5 text-3xl font-extrabold tracking-[0.2em]">
            {t('Contact.sectionTitle')}
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            {t('Contact.description')}
          </p>

          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-lg text-gray-200 transition-colors hover:border-amber-300/40 hover:text-amber-300"
            >
              <Mail className="h-5 w-5" />
              <span>Email</span>
            </a>
            <a
              href={SITE_CONFIG.contact.github}
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-lg text-gray-200 transition-colors hover:border-amber-300/40 hover:text-amber-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

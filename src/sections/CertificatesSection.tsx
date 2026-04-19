import { motion } from 'framer-motion'
import { SectionTitle } from '../components/SectionTitle'
import { CertificateCardSkeleton } from '../components/Skeletons'
import { FaArrowRight } from 'react-icons/fa'
import { containerVariants, itemVariants } from '../lib/animations'
import type { Certificate } from '../lib/types'

interface CertificatesSectionProps {
  dbStatus: 'checking' | 'connected' | 'error'
  certificates: Certificate[]
  visibleCertificates: number
  setVisibleCertificates: React.Dispatch<React.SetStateAction<number>>
}

export function CertificatesSection({
  dbStatus,
  certificates,
  visibleCertificates,
  setVisibleCertificates
}: CertificatesSectionProps) {
  return (
    <motion.section
      id="certificates"
      className="mt-24 sm:mt-32"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionTitle
        title="Certificates"
        subtitle="Learning milestones that support quality delivery."
        variants={itemVariants}
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {dbStatus === 'checking' ? (
          [...Array(3)].map((_, i) => (
            <CertificateCardSkeleton key={i} />
          ))
        ) : certificates.length > 0 ? (
          certificates.slice(0, visibleCertificates).map((cert) => (
            <motion.a
              key={cert.title}
              href={cert.url}
              target="_blank"
              rel="noreferrer"
              variants={itemVariants}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.02, y: -4 }}
              className="group flex flex-col items-center gap-4 rounded-2xl border border-zinc-200 bg-white/75 p-6 text-center backdrop-blur transition-all hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/70"
            >
              {cert.logo && (
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2 shadow-sm dark:bg-zinc-800">
                  <img src={cert.logo} alt={cert.title} className="h-full w-full object-contain" />
                </div>
              )}
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                {cert.title}
              </p>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300 transition-colors">
                View Certificate
              </span>
            </motion.a>
          ))
        ) : (
          <div className="col-span-full py-10 text-center">
            <p className="text-zinc-500">No certificates found.</p>
          </div>
        )}
      </div>

      {certificates.length > 3 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          {certificates.length > visibleCertificates ? (
            <button
              onClick={() => setVisibleCertificates(prev => prev + 3)}
              className="group relative flex items-center gap-2 rounded-full border border-zinc-200 bg-white/50 px-8 py-3 text-sm font-bold text-zinc-900 backdrop-blur transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white dark:hover:border-zinc-600"
            >
              View More Certificates
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              onClick={() => {
                setVisibleCertificates(3)
                const el = document.getElementById('certificates')
                if (el) {
                  const y = el.getBoundingClientRect().top + window.pageYOffset - 100
                  window.scrollTo({ top: y, behavior: 'smooth' })
                }
              }}
              className="group relative flex items-center gap-2 rounded-full border border-zinc-200 bg-white/50 px-8 py-3 text-sm font-bold text-zinc-900 backdrop-blur transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white dark:hover:border-zinc-600"
            >
              Show Less
              <FaArrowRight className="text-xs transition-transform rotate-[270deg]" />
            </button>
          )}
        </motion.div>
      )}
    </motion.section>
  )
}

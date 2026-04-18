import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { FaEnvelope, FaWhatsapp, FaGithub, FaLinkedin, FaYoutube, FaUser, FaCommentDots, FaCheckCircle, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa'
import { ContactInput } from '../components/ContactInput'
import { containerVariants, itemVariants } from '../lib/animations'

interface ContactSectionProps {
  handleSubmit: (e: React.FormEvent) => Promise<void>
  contactName: string
  setContactName: (val: string) => void
  contactEmail: string
  setContactEmail: (val: string) => void
  contactMessage: string
  setContactMessage: (val: string) => void
  submitStatus: 'idle' | 'loading' | 'success' | 'error'
}

export function ContactSection({
  handleSubmit,
  contactName,
  setContactName,
  contactEmail,
  setContactEmail,
  contactMessage,
  setContactMessage,
  submitStatus
}: ContactSectionProps) {
  return (
    <motion.section
      id="contact"
      className="relative mt-24 sm:mt-32 overflow-hidden rounded-[3rem] border border-zinc-200 bg-white/50 p-8 sm:p-20 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/50"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute left-1/4 top-0 h-full w-px bg-zinc-950 dark:bg-white" />
        <div className="absolute left-2/4 top-0 h-full w-px bg-zinc-950 dark:bg-white" />
        <div className="absolute left-3/4 top-0 h-full w-px bg-zinc-950 dark:bg-white" />
      </div>

      <div className="grid gap-16 lg:grid-cols-2">
        <motion.div variants={itemVariants}>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.95]">
            Let's build <br />
            something <br />
            <span className="text-zinc-400 dark:text-zinc-600">extraordinary.</span>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Whether you have a specific project in mind or just want to say hi,
            I'm always open to discussing new opportunities and creative ideas.
          </p>

          <div className="mt-12 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Email Me</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">19.divinka@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <FaWhatsapp />
              </div>
              <a href="https://wa.me/6289518051553" target="_blank" rel="noreferrer" className="group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">WhatsApp</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-white group-hover:underline">+62 895 1805 1553</p>
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col justify-between gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Connect with me</h3>
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'GitHub', icon: FaGithub, color: 'hover:text-zinc-900 dark:hover:text-white', url: '#' },
                { name: 'LinkedIn', icon: FaLinkedin, color: 'hover:text-[#0077b5]', url: '#' },
                { name: 'YouTube', icon: FaYoutube, color: 'hover:text-[#ff0000]', url: '#' },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={clsx(
                    "flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-2xl text-zinc-400 shadow-sm transition-all dark:border-zinc-800 dark:bg-zinc-950",
                    social.color
                  )}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-12 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Send a quick message</h3>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <ContactInput
                label="Name"
                placeholder="Enter your name"
                icon={<FaUser />}
                value={contactName}
                onChange={setContactName}
              />
              <ContactInput
                label="Email"
                placeholder="your@email.com"
                icon={<FaEnvelope />}
                value={contactEmail}
                onChange={setContactEmail}
              />
              <ContactInput
                label="Message"
                placeholder="What's on your mind?"
                type="textarea"
                maxLength={250}
                icon={<FaCommentDots />}
                value={contactMessage}
                onChange={setContactMessage}
              />

              <motion.button
                type="submit"
                disabled={submitStatus === 'loading' || submitStatus === 'success'}
                whileHover={{ scale: submitStatus === 'idle' ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                className={clsx(
                  "group relative mt-4 w-full flex items-center justify-center gap-3 overflow-hidden rounded-2xl px-8 py-5 text-lg font-bold transition-all shadow-2xl",
                  submitStatus === 'success'
                    ? 'bg-green-500 text-white shadow-green-200/50 dark:shadow-none'
                    : submitStatus === 'error'
                      ? 'bg-red-500 text-white shadow-red-200/50 dark:shadow-none'
                      : 'bg-zinc-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-zinc-200/50 dark:shadow-none'
                )}
              >
                {submitStatus === 'loading' && (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}
                {submitStatus === 'success' && <FaCheckCircle />}
                {submitStatus === 'error' && <FaExclamationTriangle />}
                <span>
                  {submitStatus === 'loading' ? 'Sending...'
                    : submitStatus === 'success' ? 'Message Sent!'
                      : submitStatus === 'error' ? 'Check your inputs & retry'
                        : 'Send Message'}
                </span>
                {submitStatus === 'idle' && <FaArrowRight className="transition-transform group-hover:translate-x-1" />}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

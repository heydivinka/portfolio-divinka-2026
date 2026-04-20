import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaYoutube, FaEnvelope, FaArrowUp } from 'react-icons/fa'
import { containerVariants, itemVariants } from '../lib/animations'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.1 }}
      className="mt-32 pb-12"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Call to Action Section with Vibrant Liquid Mesh Gradient */}
        <div className="apple-gradient relative overflow-hidden rounded-[3rem] px-8 py-20 text-center sm:px-16 border border-zinc-200 dark:border-zinc-800 shadow-2xl will-change-transform">
          {/* Glass Overlay for Text Readability - Optimized Blur */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[40px] dark:bg-black/40" />

          <motion.div variants={itemVariants} className="relative z-10">
            <h2 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
              Ready to build <br className="sm:hidden" /> something <br className="hidden sm:block" />
              <span className="relative">
                extraordinary?
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M2 10C40 3 160 3 198 10"
                    stroke="#EDCB50"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                  />
                </svg>
              </span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-lg font-medium text-zinc-800 dark:text-zinc-200">
              I'm currently available for new projects and collaborations. Let's create something meaningful together.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:19.divinka@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-[#f5c414] px-8 py-4 text-sm font-black uppercase tracking-widest text-black shadow-xl shadow-yellow-500/20 transition-transform hover:scale-105 active:scale-95"
              >
                <FaEnvelope className="text-base" />
                Get in Touch
              </a>
              <button
                onClick={scrollToTop}
                className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-zinc-900/10 bg-white/20 text-zinc-900 backdrop-blur-md transition-all hover:bg-zinc-900 hover:text-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-black"
              >
                <FaArrowUp />
              </button>
            </div>
          </motion.div>

          {/* Abstract Background Mesh Blurs */}
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-[100px] dark:bg-indigo-500/20" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-purple-500/10 blur-[100px] dark:bg-purple-500/20" />
        </div>

        {/* Footer Details */}
        <div className="mt-24 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white">
              DIVINKA<span className="text-[#f5c414]">.</span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Full-stack developer focused on creating modern, interactive, and high-performance web experiences with a passion for clean design.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Navigation</h4>
            <ul className="space-y-4">
              {['Hero', 'Projects', 'Skills', 'Experience', 'Education'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(item.toLowerCase());
                      if (el) {
                        const offset = 80;
                        const bodyRect = document.body.getBoundingClientRect().top;
                        const elementRect = el.getBoundingClientRect().top;
                        const elementPosition = elementRect - bodyRect;

                        window.scrollTo({
                          top: elementPosition - offset,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="hover-underline text-sm font-bold text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Socials</h4>
            <ul className="space-y-4">
              {[
                { name: 'GitHub', icon: FaGithub, url: 'https://github.com/heydivinka' },
                { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/divinka-azani-3a64b2354/' },
                { name: 'YouTube', icon: FaYoutube, url: 'https://www.youtube.com/@__divinka' },
              ].map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-underline flex flex-row items-center gap-3 whitespace-nowrap text-sm font-bold text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  >
                    <social.icon className="text-base shrink-0" />
                    <span>{social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Contact</h4>
            <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">
              Bogor, Indonesia <br />
              <a href="mailto:19.divinka@gmail.com" className="hover-underline mt-2 block">
                19.divinka@gmail.com
              </a>
            </p>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          variants={itemVariants}
          className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-zinc-200 pt-8 dark:border-zinc-800 sm:flex-row"
        >
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
            © {currentYear} Divinka Azani. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover-underline text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Privacy Policy
            </a>
            <a href="#" className="hover-underline text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

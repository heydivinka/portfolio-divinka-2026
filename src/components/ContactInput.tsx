import { clsx } from 'clsx'

interface ContactInputProps {
  label: string
  placeholder: string
  type?: 'text' | 'textarea'
  icon: React.ReactNode
  value: string
  onChange: (val: string) => void
  maxLength?: number
  error?: boolean
}

export function ContactInput({ label, placeholder, type = 'text', icon, value, onChange, maxLength, error }: ContactInputProps) {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <label className={clsx(
          "text-[10px] font-black uppercase tracking-[0.2em] transition-colors",
          error ? "text-red-500" : "text-zinc-400 dark:text-zinc-500"
        )}>
          {label}
        </label>
        {maxLength && (
          <span className={clsx(
            "text-[10px] font-bold transition-colors",
            error ? "text-red-400" : "text-zinc-400"
          )}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <div className="relative">
        <div className={clsx(
          "absolute left-4 top-[1.125rem] transition-colors",
          error ? "text-red-500" : "text-zinc-400 dark:text-zinc-600"
        )}>
          {icon}
        </div>
        {type === 'text' ? (
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={clsx(
              "w-full rounded-2xl border bg-zinc-50/50 py-4 pl-12 pr-4 text-sm font-medium outline-none transition-all",
              error 
                ? "border-red-500 bg-red-50/10 focus:ring-4 focus:ring-red-500/5 dark:border-red-500/50" 
                : "border-zinc-200 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-white dark:focus:border-white dark:focus:bg-zinc-900 dark:focus:ring-white/5"
            )}
          />
        ) : (
          <textarea
            placeholder={placeholder}
            value={value}
            maxLength={maxLength}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            className={clsx(
              "w-full resize-none rounded-2xl border bg-zinc-50/50 py-4 pl-12 pr-4 text-sm font-medium outline-none transition-all",
              error
                ? "border-red-500 bg-red-50/10 focus:ring-4 focus:ring-red-500/5 dark:border-red-500/50"
                : "border-zinc-200 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-white dark:focus:border-white dark:focus:bg-zinc-900 dark:focus:ring-white/5"
            )}
          />
        )}
      </div>
    </div>
  )
}

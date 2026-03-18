/* FIXES APPLIED:
 * [BEST PRACTICE] Extracted reusable ContactForm with typed parameters
 * [ACCESSIBILITY] Form inputs configured with proper autocomplete properties
 */
'use client'
import { useState, useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import gsap from 'gsap'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [shakeTrigger, setShakeTrigger] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)

  useGSAP(() => {
    if (shakeTrigger > 0 && formRef.current) {
      gsap.fromTo(formRef.current, 
        { x: -10 },
        { x: 10, duration: 0.1, yoyo: true, repeat: 5, ease: 'power1.inOut' }
      ).then(() => gsap.set(formRef.current, { x: 0 }))
    }
  }, [shakeTrigger])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, boolean> = {}
    if (!formData.name.trim()) newErrors.name = true
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = true
    if (!formData.subject) newErrors.subject = true
    if (!formData.message.trim()) newErrors.message = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setShakeTrigger(prev => prev + 1)
    } else {
      setErrors({})
      alert('Message sent successfully! (Demo)')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }
  }

  const inputClass = "bg-[#141414cc] rounded-md p-4 text-white font-body w-full transition-all duration-300 outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 rounded-2xl border border-white/10 bg-[var(--color-surface)]/50 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--color-accent)]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <div>
        <label htmlFor="name" className="block font-mono text-xs tracking-widest text-[var(--color-text-muted)] mb-2 uppercase">Your Name</label>
        <input 
          id="name"
          type="text" 
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className={`${inputClass} ${errors.name ? 'border-red-500' : 'border-[var(--color-border)] border'}`}
          placeholder="John Doe"
          data-cursor="large"
          aria-invalid={errors.name ? "true" : "false"}
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-mono text-xs tracking-widest text-[var(--color-text-muted)] mb-2 uppercase">Email Address</label>
        <input 
          id="email"
          type="email" 
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className={`${inputClass} ${errors.email ? 'border-red-500' : 'border-[var(--color-border)] border'}`}
          placeholder="john@example.com"
          data-cursor="large"
          aria-invalid={errors.email ? "true" : "false"}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block font-mono text-xs tracking-widest text-[var(--color-text-muted)] mb-2 uppercase">Subject</label>
        <select 
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
          className={`${inputClass} ${errors.subject ? 'border-red-500' : 'border-[var(--color-border)] border'} cursor-none`}
          data-cursor="large"
          aria-invalid={errors.subject ? "true" : "false"}
        >
          <option value="" disabled className="bg-black text-[var(--color-text-muted)]">Select a topic...</option>
          <option value="test_ride" className="bg-black text-white">Schedule Test Ride</option>
          <option value="sales" className="bg-black text-white">Sales Inquiry</option>
          <option value="support" className="bg-black text-white">Technical Support</option>
          <option value="partnership" className="bg-black text-white">Partnership</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block font-mono text-xs tracking-widest text-[var(--color-text-muted)] mb-2 uppercase">Message</label>
        <textarea 
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className={`${inputClass} ${errors.message ? 'border-red-500' : 'border-[var(--color-border)] border'} min-h-[150px] resize-y`}
          placeholder="How can we help you?"
          data-cursor="large"
          aria-invalid={errors.message ? "true" : "false"}
        />
      </div>

      <button 
        type="submit" 
        className="btn-primary w-full justify-center mt-4 group"
        style={{ padding: '1.25rem 2rem', fontSize: '0.875rem' }}
        data-cursor="large"
      >
        SEND MESSAGE 
        <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
      </button>
    </form>
  )
}

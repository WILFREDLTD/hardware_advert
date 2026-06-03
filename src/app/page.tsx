"use client"

import { useState } from 'react'

export default function Page() {
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [menuOpen, setMenuOpen] = useState(false)

  function showToast(type: 'success' | 'error', msg: string) {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone) {
      showToast('error', 'Please fill in your name and phone number.')
      return
    }
    setSending(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      const res = await fetch('/api/contact', { method: 'POST', body: fd })
      if (res.ok) {
        showToast('success', "Request sent! We'll reach out within 24 hours.")
        setForm({ name: '', phone: '', email: '', message: '' })
      } else {
        showToast('error', 'Something went wrong. Please email us directly.')
      }
    } catch {
      showToast('success', "Request noted — we'll be in touch soon!")
      setForm({ name: '', phone: '', email: '', message: '' })
    }
    setSending(false)
  }

  const features = [
    {
      icon: '�',
      title: 'Inventory',
      desc: 'Track products, stock movements, and low stock alerts.',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&auto=format&fit=crop&q=80',
    },
    {
      icon: '🧾',
      title: 'Sales',
      desc: 'Record sales quickly and generate receipts.',
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&auto=format&fit=crop&q=80',
    },
    {
      icon: '💳',
      title: 'Debt Tracking & Reports',
      desc: 'Monitor customer credit, repayment history, and business performance in one place.',
      img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700&auto=format&fit=crop&q=80',
    },
  ]

  const steps = [
    { num: '01', title: 'Create your account', desc: 'Sign up with your phone number. No complex setup required.' },
    { num: '02', title: 'Add your products', desc: 'Import your stock list or add items with prices and quantities.' },
    { num: '03', title: 'Start selling', desc: 'Record sales in seconds. Inventory updates automatically.' },
    { num: '04', title: 'Review reports', desc: 'See your best sellers, low stock, and profits each day.' },
  ]

  const gallery = [
    { img: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=700&auto=format&fit=crop&q=80', cap: 'Tool & equipment tracking' },
    { img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&auto=format&fit=crop&q=80', cap: 'Bulk materials & supplies' },
    { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop&q=80', cap: 'Electrical & plumbing stock' },
    { img: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=700&auto=format&fit=crop&q=80', cap: 'Paint & finishing products' },
  ]

  const testimonials = [
    { stars: '★★★★★', text: '"Before Hardware Stocks I was losing money on stolen stock. Now I know exactly what\'s in my shop every morning."', author: 'James Mutua', role: 'Mutua Hardware, Nairobi', avatar: 'JM' },
    { stars: '★★★★★', text: '"The debt tracker is a lifesaver. I used to forget who owed me money. Now I get paid on time and my cash flow is much better."', author: 'Amina Odhiambo', role: 'Odhiambo Supplies, Kisumu', avatar: 'AO' },
    { stars: '★★★★★', text: '"Set it up myself in one afternoon. My staff picked it up on the first day. The alerts alone have saved us from running out of stock twice."', author: 'Daniel Kariuki', role: 'Kariuki Ironworks, Nakuru', avatar: 'DK' },
  ]

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif", background: '#F9F4EF', color: '#1A1208', overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900;1,9..40,900&family=Fraunces:ital,wght@0,700;0,900;1,700;1,900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        img { display: block; width: 100%; object-fit: cover; }
        a { text-decoration: none; color: inherit; }
        :root {
          --orange: #E8510A;
          --orange-light: #FF7A3D;
          --orange-pale: #FDF1EB;
          --dark: #1A1208;
          --dark2: #110D05;
          --mid: #6B5B45;
          --light: #F9F4EF;
          --white: #FFFFFF;
          --display: 'Fraunces', Georgia, serif;
        }

        /* NAV */
        .nav {
          position: sticky; top: 0; left: 0; right: 0; z-index: 100;
          width: 100%;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 5vw; height: 64px;
          background: rgba(249,244,239,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(100,70,30,0.1);
        }
        .nav-logo { font-family: var(--display); font-size: 1.25rem; font-weight: 900; letter-spacing: -0.02em; }
        .nav-logo span { color: var(--orange); }
        .nav-links { display: flex; align-items: center; gap: 2rem; list-style: none; }
        .nav-links a { font-size: 0.875rem; font-weight: 500; color: var(--mid); transition: color .2s; }
        .nav-links a:hover { color: var(--dark); }
        .nav-cta {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--orange); color: #fff;
          border-radius: 10px; padding: 10px 22px;
          font-size: 0.875rem; font-weight: 500;
          transition: opacity .2s;
        }
        .nav-cta:hover { opacity: .9; }
        .hamburger {
          display: none; flex-direction: column; gap: 5px; cursor: pointer;
          background: none; border: none; padding: 4px;
        }
        .hamburger span { display: block; width: 22px; height: 2px; background: var(--dark); border-radius: 2px; transition: all .3s; }
        .mobile-menu {
          display: none; position: fixed; top: 64px; right: 0;
          background: rgba(249,244,239,0.98); backdrop-filter: blur(20px);
          border: 1px solid rgba(100,70,30,.1); border-top: none; border-right: none;
          border-radius: 0 0 0 12px;
          z-index: 99; padding: 1rem 1.5rem;
          flex-direction: column; gap: 0.75rem;
          min-width: 180px;
        }
        .mobile-menu a { font-size: 0.9rem; font-weight: 500; color: var(--dark); padding: .6rem 0.75rem; border: none; border-radius: 6px; transition: background .2s; }
        .mobile-menu a:hover { background: rgba(100,70,30,.08); }
        .mobile-menu .nav-cta { border: none; text-align: center; justify-content: center; margin-top: .25rem; padding: 10px 22px; font-size: 0.85rem; }

        /* HERO */
        .hero { display: grid; grid-template-columns: 1fr 1fr; width: 100%; min-height: 420px; max-height: 520px; }
        .hero-left { display: flex; flex-direction: column; justify-content: center; gap: 0.85rem; padding: 1rem 4vw; }
        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(232,81,10,.2); background: var(--orange-pale);
          border-radius: 100px; padding: 7px 16px;
          font-size: 0.75rem; font-weight: 500; color: var(--orange); width: fit-content;
        }
        .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--orange); flex-shrink: 0; }
        .hero-h1 { font-family: var(--display); font-size: clamp(1.8rem, 2.5vw, 2.5rem); font-weight: 900; line-height: 1.1; letter-spacing: -0.03em; }
        .hero-h1 em { color: var(--orange); font-style: italic; }
        .hero-sub { font-size: 0.95rem; font-weight: 300; line-height: 1.7; color: var(--mid); }
        .btn-group { display: flex; flex-wrap: wrap; gap: 1rem; }
        .btn-primary { display: inline-flex; align-items: center; gap: 6px; background: var(--orange); color: #fff; border-radius: 10px; padding: 14px 28px; font-size: 1rem; font-weight: 500; transition: opacity .2s; }
        .btn-primary:hover { opacity: .9; }
        .btn-outline { display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(100,70,30,.2); background: transparent; color: var(--dark); border-radius: 10px; padding: 14px 28px; font-size: 1rem; font-weight: 500; transition: background .2s; }
        .btn-outline:hover { background: rgba(100,70,30,.05); }
        .hero-right { position: relative; overflow: hidden; background: var(--dark2); max-height: 520px; }
        .hero-right img { width: 100%; height: auto; max-height: 520px; object-fit: cover; opacity: .75; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,18,8,.5) 0%, rgba(232,81,10,.12) 100%); }
        .hero-card {
          position: absolute; bottom: 2.5rem; left: 1.5rem; right: 1.5rem;
          border: 1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.1);
          backdrop-filter: blur(16px); border-radius: 16px; padding: 1.25rem;
          display: flex; align-items: center; gap: 1rem;
        }
        .hero-card-icon { width: 44px; height: 44px; border-radius: 12px; background: var(--orange); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0; }
        .hero-card-text { color: #fff; }
        .hero-card-text strong { display: block; font-size: 0.875rem; font-weight: 600; }
        .hero-card-text span { font-size: 0.78rem; opacity: .8; }
        .hero-card-live { margin-left: auto; background: rgba(255,255,255,.15); border-radius: 100px; padding: 4px 12px; font-size: 0.72rem; font-weight: 500; color: #fff; white-space: nowrap; }

        /* LOGOS BAR */
        .logos-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 2.5rem; border-top: 1px solid rgba(100,70,30,.1); border-bottom: 1px solid rgba(100,70,30,.1); background: #fff; padding: 1.25rem 5vw; }
        .logos-label { font-size: 0.78rem; font-weight: 500; color: var(--mid); white-space: nowrap; }
        .logo-name { font-family: var(--display); font-size: 1rem; font-weight: 700; color: #C5B8A8; }

        /* SECTION COMMONS */
        .section-tag { font-size: 0.72rem; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: var(--orange); margin-bottom: .75rem; }
        h2 { font-family: var(--display); font-size: clamp(1.8rem, 2.8vw, 2.8rem); font-weight: 900; line-height: 1.15; letter-spacing: -0.03em; }
        h2 em { color: var(--orange); font-style: italic; }

        /* FEATURES */
        .features-section { background: #fff; padding: 6rem 5vw; }
        .features-header { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 2rem; margin-bottom: 3.5rem; }
        .features-sub { font-size: 1.05rem; font-weight: 300; line-height: 1.85; color: var(--mid); }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; width: 100%; }
        .feat-card { border: 1px solid rgba(100,70,30,.12); border-radius: 16px; overflow: hidden; background: var(--light); transition: transform .25s; }
        .feat-card:hover { transform: translateY(-5px); }
        .feat-card img { height: 200px; }
        .feat-card-body { padding: 1.5rem; }
        .feat-icon { width: 42px; height: 42px; border-radius: 10px; background: var(--orange-pale); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; margin-bottom: 1rem; }
        .feat-title { font-size: 1.05rem; font-weight: 700; color: var(--dark); margin-bottom: .5rem; }
        .feat-desc { font-size: 0.875rem; font-weight: 300; line-height: 1.8; color: var(--mid); }

        /* HOW */
        .how-section { background: var(--dark); padding: 6rem 5vw; }
        .how-sub { font-size: 1.05rem; font-weight: 300; line-height: 1.85; color: rgba(255,255,255,.6); margin-top: 1rem; }
        .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; padding-top: 3.5rem; width: 100%; }
        .step-card { background: rgba(255,255,255,.04); border-radius: 16px; padding: 1.5rem; }
        .step-num { width: 52px; height: 52px; border-radius: 50%; border: 1px solid rgba(232,81,10,.3); background: rgba(232,81,10,.12); display: flex; align-items: center; justify-content: center; font-family: var(--display); font-size: 1rem; font-weight: 900; color: var(--orange-light); margin-bottom: 1.25rem; }
        .step-title { font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: .5rem; }
        .step-desc { font-size: 0.85rem; font-weight: 300; line-height: 1.8; color: rgba(255,255,255,.6); }

        /* GALLERY */
        .gallery-section { background: var(--light); padding: 5rem 0; }
        .gallery-header { text-align: center; padding: 0 5vw 3rem; }
        .gallery-strip { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.25rem; padding: 0 5vw 1.5rem; }
        .gallery-strip::-webkit-scrollbar { display: none; }
        .gallery-item { position: relative; width: 100%; border-radius: 16px; overflow: hidden; transition: transform .25s; }
        .gallery-item:hover { transform: translateY(-4px); }
        .gallery-item img { height: 220px; }
        .gallery-cap { position: absolute; inset-x: 0; bottom: 0; background: linear-gradient(to top, rgba(26,18,8,.85), transparent); padding: 1.25rem 1rem .9rem; color: #fff; font-size: 0.85rem; font-weight: 500; }

        /* TESTIMONIALS */
        .testi-section { background: var(--orange-pale); padding: 6rem 5vw; }
        .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3rem; }
        .testi-card { background: #fff; border: 1px solid rgba(100,70,30,.1); border-radius: 16px; padding: 1.75rem; transition: transform .25s; }
        .testi-card:hover { transform: translateY(-4px); }
        .stars { color: var(--orange); font-size: 0.85rem; letter-spacing: .1em; margin-bottom: 1rem; }
        .testi-text { font-size: 0.875rem; font-weight: 300; line-height: 1.85; color: var(--dark); margin-bottom: 1.5rem; }
        .testi-author { display: flex; align-items: center; gap: .75rem; }
        .avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--orange); display: flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 700; color: #fff; flex-shrink: 0; }
        .author-name { font-size: 0.875rem; font-weight: 600; color: var(--dark); }
        .author-role { font-size: 0.75rem; color: var(--mid); }

        /* PRICING */
        .pricing-section { background: #fff; padding: 6rem 5vw; display: flex; flex-direction: column; align-items: center; }
        .pricing-header { text-align: center; margin: 0 auto 3.5rem; width: 100%; max-width: 700px; }
        .pricing-sub { font-size: 1.05rem; font-weight: 300; line-height: 1.85; color: var(--mid); margin-top: .75rem; }
        .price-card { width: 100%; max-width: 650px; margin: 0 auto; border: 1px solid rgba(100,70,30,.12); border-radius: 24px; background: #fff; padding: 3rem; box-shadow: 0 30px 70px rgba(38,24,12,.08); }
        .price-badge { display: inline-block; background: var(--orange); color: #fff; border-radius: 100px; padding: 4px 14px; font-size: 0.72rem; font-weight: 600; margin-bottom: 1rem; }
        .price-name { font-family: var(--display); font-size: 1.2rem; font-weight: 700; color: var(--dark); }
        .price-desc { font-size: 0.95rem; font-weight: 300; line-height: 1.8; color: var(--mid); margin-top: .5rem; }
        .price-amount { display: flex; align-items: flex-end; gap: .5rem; margin: 2rem 0 .5rem; }
        .price-currency { font-size: 0.9rem; color: var(--mid); margin-bottom: .5rem; }
        .price-number { font-family: var(--display); font-size: 2.8rem; font-weight: 900; line-height: 1; color: var(--dark); }
        .price-period { font-size: 0.85rem; color: var(--mid); margin-bottom: .4rem; }
        .price-note { font-size: 0.85rem; color: var(--mid); margin-bottom: 1.5rem; }
        .price-features { list-style: none; display: flex; flex-direction: column; gap: .75rem; }
        .price-features li { display: flex; align-items: flex-start; gap: .75rem; font-size: 0.875rem; color: var(--dark); }
        .feat-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--orange); flex-shrink: 0; margin-top: 4px; }
        .price-btn { display: block; width: 100%; margin-top: 2rem; background: var(--orange); color: #fff; border: none; border-radius: 10px; padding: 14px; font-size: 0.95rem; font-family: inherit; font-weight: 500; cursor: pointer; transition: opacity .2s; }
        .price-btn:hover { opacity: .9; }

        /* CONTACT */
        .contact-section { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; background: var(--dark); padding: 7rem 7vw; }
        .contact-left { display: flex; flex-direction: column; justify-content: center; }
        .contact-tag { font-size: 0.72rem; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: var(--orange-light); margin-bottom: .75rem; }
        .contact-h2 { font-family: var(--display); font-size: clamp(2rem, 3vw, 3rem); font-weight: 900; line-height: 1.15; letter-spacing: -0.03em; color: #fff; }
        .contact-h2 em { color: var(--orange-light); font-style: italic; }
        .contact-sub { margin-top: 1rem; font-size: 1.05rem; font-weight: 300; line-height: 1.85; color: rgba(255,255,255,.6); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        .contact-input, .contact-textarea {
          width: 100%; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.06);
          border-radius: 10px; padding: 16px 20px; font-size: 0.9rem;
          font-family: inherit; color: #fff; outline: none; transition: border-color .2s; resize: vertical;
        }
        .contact-input::placeholder, .contact-textarea::placeholder { color: rgba(255,255,255,.4); }
        .contact-input:focus, .contact-textarea:focus { border-color: rgba(232,81,10,.5); }
        .contact-email { margin-bottom: 1rem; }
        .submit-btn {
          display: flex; align-items: center; justify-content: center; gap: .6rem;
          width: 100%; background: var(--orange); color: #fff; border: none;
          border-radius: 10px; padding: 16px; font-size: 1rem; font-weight: 500;
          font-family: inherit; cursor: pointer; transition: opacity .2s; margin-top: .75rem;
          min-height: 54px;
        }
        .submit-btn:hover:not(:disabled) { opacity: .9; }
        .submit-btn:disabled { opacity: .75; cursor: not-allowed; }
        .spinner { width: 18px; height: 18px; border: 2.5px solid rgba(255,255,255,.35); border-top-color: #fff; border-radius: 50%; animation: spin .65s linear infinite; flex-shrink: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* TOAST */
        .toast {
          position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 999;
          border-radius: 14px; padding: 1rem 1.35rem;
          font-size: 0.95rem; font-weight: 600;
          display: flex; align-items: center; gap: .9rem;
          box-shadow: 0 16px 40px rgba(0,0,0,.18);
          transition: transform .35s cubic-bezier(.34,1.56,.64,1), opacity .25s;
          max-width: calc(100vw - 3rem);
        }
        .toast-success {
          background: linear-gradient(135deg, #047857, #10b981);
          color: #f8fafc;
          border: 1px solid rgba(16,185,129,.35);
          box-shadow: 0 18px 50px rgba(4,120,87,.18);
        }
        .toast-error {
          background: linear-gradient(135deg, #991b1b, #dc2626);
          color: #fff1f2;
          border: 1px solid rgba(248,113,113,.35);
        }
        .toast-icon {
          font-size: 1.1rem;
          flex-shrink: 0;
          width: 1.8rem;
          height: 1.8rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: rgba(255,255,255,.15);
        }

        /* FOOTER */
        footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; background: var(--dark2); border-top: 1px solid rgba(255,255,255,.05); padding: 3rem 5vw; }
        .footer-logo { font-family: var(--display); font-size: 1.15rem; font-weight: 900; color: var(--orange); }
        .footer-logo span { color: rgba(255,255,255,.35); }
        .footer-copy { font-size: 0.82rem; color: rgba(255,255,255,.35); }
        .footer-email { font-size: 0.82rem; color: rgba(13, 230, 60, 0.9); }

        /* ===== MOBILE RESPONSIVE ===== */
        @media (max-width: 900px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }

          .hero { grid-template-columns: 1fr; min-height: auto; }
          .hero-left { padding: 2rem 5vw 2rem; gap: 1rem; }
          .hero-right { height: 220px; }
          .hero-h1 { font-size: clamp(1.8rem, 6vw, 2.4rem); }

          .features-grid { grid-template-columns: 1fr; }
          .features-header { flex-direction: column; align-items: flex-start; }
          .features-sub { max-width: 100%; }

          .steps-grid { grid-template-columns: 1fr 1fr; }

          .gallery-strip { grid-template-columns: repeat(2, 1fr); }

          .testi-grid { grid-template-columns: 1fr; }

          .contact-section { grid-template-columns: 1fr; gap: 2.5rem; padding: 4rem 6vw; }
          .contact-sub { max-width: 100%; }
          .form-row { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .nav { padding: 0 4vw; }
          .hero-left { padding: 2rem 4vw 1.5rem; }
          .hero-right { height: 180px; }
          .hero-card { left: 1rem; right: 1rem; bottom: 1.5rem; padding: 1rem; gap: .75rem; }
          .hero-h1 { font-size: clamp(1.9rem, 7vw, 2.4rem); }
          .hero-sub { font-size: 0.95rem; }

          .logos-bar { gap: .75rem 1.5rem; }

          .features-section, .testi-section, .pricing-section { padding: 4rem 4vw; }
          .how-section { padding: 4rem 4vw; }
          .gallery-section { padding: 3rem 0; }
          .gallery-header { padding: 0 4vw 2rem; }
          .gallery-strip { grid-template-columns: 1fr; gap: 1rem; padding: 0 4vw 1.5rem; }
          .gallery-item img { height: 200px; }

          .steps-grid { grid-template-columns: 1fr; gap: 1rem; }

          .price-card { padding: 2rem 1.5rem; }

          .contact-section { padding: 3.5rem 4vw; }
          .toast { bottom: 1rem; right: 1rem; left: 1rem; }

          footer { padding: 2rem 4vw; flex-direction: column; align-items: flex-start; gap: .75rem; }
        }
      ` }} />

      {/* TOAST */}
      {toast && (
        <div
          className={`toast toast-${toast.type}`}
          style={{ transform: 'translateY(0)', opacity: 1 }}
        >
          <span className="toast-icon">{toast.type === 'success' ? '✓' : '✕'}</span>
          <span>{toast.msg}</span>
        </div>
      )}

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu" style={{ display: 'flex' }}>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Get started →</a>
        </div>
      )}

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo"><span>Hardware</span>Stocks</div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How it works</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Get started →</a>
        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="badge"><span className="badge-dot" /> Now available in East Africa</div>
          <h1 className="hero-h1">
            Track Stock, Sales, and Customer Debts<br />From One Simple System
          </h1>
          <p className="hero-sub">
            Know what is in stock, record every sale, track customer debts, and monitor business performance without relying on notebooks or spreadsheets.
          </p>
          <div className="btn-group">
            <a href="#contact" className="btn-primary">Request a Demo</a>
            <a href="#features" className="btn-outline">Learn More</a>
          </div>
        </div>
        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=1200&auto=format&fit=crop&q=80"
            alt="Hardware store interior with tools and supplies"
          />
          <div className="hero-overlay" />
          <div className="hero-card">
            <div className="hero-card-icon">📦</div>
            <div className="hero-card-text">
              <strong>Low stock alert</strong>
              <span>Roofing nails — 14 units left</span>
            </div>
            <div className="hero-card-live">⚡ Live</div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="features-section">
        <div className="features-header">
          <div>
            <div className="section-tag">Running a Hardware Store Is Already Hard Enough</div>
            <h2>Common challenges hardware owners face</h2>
          </div>
          <p className="features-sub">Missing stock, unrecorded sales, and customer debts make daily operations harder than they should be.</p>
        </div>
        <div className="features-grid">
          <div className="feat-card">
            <div className="feat-card-body">
              <div className="feat-icon">📦</div>
              <div className="feat-title">Missing Stock</div>
              <p className="feat-desc">Know exactly what products are available and which items are running low.</p>
            </div>
          </div>
          <div className="feat-card">
            <div className="feat-card-body">
              <div className="feat-icon">🧾</div>
              <div className="feat-title">Unrecorded Sales</div>
              <p className="feat-desc">Record every sale and maintain a complete sales history.</p>
            </div>
          </div>
          <div className="feat-card">
            <div className="feat-card-body">
              <div className="feat-icon">💳</div>
              <div className="feat-title">Customer Debts</div>
              <p className="feat-desc">Track outstanding balances and follow up with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="features-header">
          <div>
            <div className="section-tag">What we offer</div>
            <h2>Everything You Need To<br />Manage Your Store</h2>
          </div>
          <p className="features-sub">A single system for inventory, sales, customer debt tracking, and business performance.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feat-card" key={i}>
              <img src={f.img} alt={f.title} style={{ height: 200 }} />
              <div className="feat-card-body">
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <p className="feat-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div className="section-tag" style={{ color: 'var(--orange)' }}>Simple process</div>
        <h2 style={{ color: '#fff', marginTop: '.25rem' }}>Up and running<br /><em>in minutes</em></h2>
        <p className="how-sub">No technical training needed. If you can use a smartphone, you can use Hardware Stocks.</p>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div className="step-card" key={i}>
              <div className="step-num">{s.num}</div>
              <div className="step-title">{s.title}</div>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section">
        <div className="gallery-header">
          <div className="section-tag">Inside Hardware Stocks</div>
          <h2>Built for hardware <em>businesses</em></h2>
        </div>
        <div className="gallery-strip">
          {gallery.map((g, i) => (
            <div className="gallery-item" key={i}>
              <img src={g.img} alt={g.cap} style={{ height: 220 }} />
              <div className="gallery-cap">{g.cap}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="testi-section">
        <div className="section-tag">Built Specifically For Hardware Stores</div>
        <h2>Designed to help hardware store owners gain better visibility<br /><em>into stock, sales and customer debts.</em></h2>
        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <div className="testi-card" key={i}>
              <div className="stars">{t.stars}</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <div className="avatar">{t.avatar}</div>
                <div>
                  <div className="author-name">{t.author}</div>
                  <div className="author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section" id="pricing">
        <div className="pricing-header">
          <div className="section-tag">Simple Pricing</div>
          <h2>Hardware Store Plan</h2>
          <p className="pricing-sub">Transparent pricing for stores that need inventory, sales, debt, and reporting in one place.</p>
        </div>
        <div className="price-card">
          <div className="price-badge">Hardware Store Plan</div>
          <div className="price-name">Hardware Store Plan</div>
          <p className="price-desc">One system for inventory management, sales tracking, debt management, and business reporting.</p>
          <div className="price-amount">
            <span className="price-currency">KSh</span>
            <span className="price-number">3,000</span>
            <span className="price-period">/mo</span>
          </div>
          <p className="price-note">One-time Setup: KES 7,000</p>
          <p className="price-note">Monthly Subscription: KES 3,000</p>
          <ul className="price-features">
            {['Inventory Management', 'Sales Tracking', 'Debt Management', 'Business Reports', 'Support & Updates'].map((f, i) => (
              <li key={i}><span className="feat-dot" /><span>{f}</span></li>
            ))}
          </ul>
          <a href="#contact"><button className="price-btn">Get started →</button></a>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="contact-left">
          <div className="contact-tag">Ready to start?</div>
          <h2 className="contact-h2">Request a free<br /><em>live demo</em></h2>
          <p className="contact-sub">Tell us about your hardware store, current inventory process, or any challenges you face. For Kenyan businesses, phone numbers are often more valuable than email addresses.</p>
        </div>
        <div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <input
                className="contact-input"
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                required
              />
              <input
                className="contact-input"
                type="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                required
              />
            </div>
            <input
              className="contact-input contact-email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            />
            <textarea
              className="contact-textarea"
              rows={4}
              placeholder="Tell us about your store — size, main products, biggest challenge..."
              value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
            />
            <button className="submit-btn" type="submit" disabled={sending}>
              {sending ? (
                <><span className="spinner" />Sending...</>
              ) : (
                'Send request →'
              )}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Inventory Management</div>
        <div>
          <p className="footer-copy">Sales Tracking</p>
          <p className="footer-copy">Debt Management</p>
          <p className="footer-copy">Business Reports</p>
        </div>
        <p className="footer-email">0791614036</p>
        <p className="footer-copy">© 2026 Hardware POS</p>
      </footer>
    </div>
  )
}
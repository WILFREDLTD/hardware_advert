"use client"

import Image from 'next/image'
import { useState } from 'react'

export default function Page(){
  const [status, setStatus] = useState<string | null>(null)

  async function handleSubmit(e: any){
    e.preventDefault()
    const form = new FormData(e.target)
    try{
      const res = await fetch('/api/contact', { method: 'POST', body: form })
      if(res.ok) setStatus('Thanks — we will contact you soon.')
      else setStatus('Submission failed. Try again.')
    }catch(err){
      setStatus('Network error')
    }
  }

  return (
    <div>
      <section className="hero">
        <div style={{flex:1}}>
          <h1>Software made for hardware store owners</h1>
          <p className="lead">Keep inventory, sales, debts and reports in one simple, affordable tool. Financially friendly and easy to use.</p>
          <div style={{marginTop:16}}>
            <a href="#contact" className="btn">Request a demo</a>
          </div>
        </div>
        <div style={{width:300}}>
          <Image src="/images/tools.svg" alt="tools" width={300} height={180} />
        </div>
      </section>

      <section className="grid" aria-label="benefits">
        <div className="card">
          <h3>What it does</h3>
          <p className="small">Inventory management, sales recording, stock alerts, and simple analytics to run your store better.</p>
        </div>
        <div className="card">
          <h3>How it helps</h3>
          <p className="small">Reduce stockouts, keep clear records, speed up sales and track debts — all from one place.</p>
        </div>
        <div className="card">
          <h3>Why it's easy</h3>
          <p className="small">Minimal setup, intuitive UI, and workflows tailored for hardware shops.</p>
        </div>
      </section>

      <section>
        <h2 style={{marginTop:24}}>Images from the hardware landing</h2>
        <div className="images">
          <div className="img"><Image src="/images/tools.svg" alt="tools" width={160} height={110} /></div>
          <div className="img"><Image src="/images/inventory.svg" alt="inventory" width={160} height={110} /></div>
          <div className="img"><Image src="/images/sales.svg" alt="sales" width={160} height={110} /></div>
          <div className="img"><Image src="/images/support.svg" alt="support" width={160} height={110} /></div>
          <div className="img"><Image src="/images/finance.svg" alt="finance" width={160} height={110} /></div>
        </div>
      </section>

      <section id="contact" className="card" style={{marginTop:24}}>
        <h3>Request a demo or contact us</h3>
        <form onSubmit={handleSubmit} className="form">
          <input name="name" placeholder="Your name" className="input" required />
          <input name="email" type="email" placeholder="Email" className="input" required />
          <textarea name="message" placeholder="Tell us about your store or request" rows={4} />
          <div>
            <button className="btn" type="submit">Send request</button>
          </div>
          {status && <p className="small">{status}</p>}
        </form>
      </section>
    </div>
  )
}

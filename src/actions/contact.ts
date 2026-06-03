"use server"

import nodemailer from "nodemailer"
import { format } from "date-fns"

type ContactData = {
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  service?: string
  message?: string
}

type ConsultationData = {
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  service?: string
  selectedDate: Date
  selectedTime: string
  additionalNotes?: string
  googleMeetLink?: string
}

function buildTransport(){
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function sendContactEmail(data: ContactData){
  try{
    const transporter = buildTransport()

    const name = `${data.firstName ?? ''} ${data.lastName ?? ''}`.trim() || '—'

    const mailOptions = {
      from: process.env.SMTP_USER,
      replyTo: data.email,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      subject: `📩 Demo / Contact request from ${name}`,
      text: `Name: ${name}\nEmail: ${data.email}\nPhone: ${data.phone || '—'}\nService: ${data.service || 'demo'}\n\nMessage:\n${data.message || ''}`,
      html: `
        <h2>Demo / Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Phone:</strong> ${data.phone || '—'}</p>
        <p><strong>Service:</strong> ${data.service || 'Demo'}</p>
        <hr/>
        <p>${(data.message || '').replace(/\n/g, '<br/>')}</p>
      `,
    }

    // send email but do not persist anywhere — fire and forget
    await transporter.sendMail(mailOptions)

    // Optionally send a confirmation to the requester if SMTP_TO_REQUESTER is set
    if(process.env.SMTP_SEND_CONFIRMATION === 'true'){
      const confirm = {
        from: process.env.SMTP_USER,
        to: data.email,
        subject: `Thanks — we received your demo request`,
        html: `
          <p>Hi ${data.firstName ?? ''},</p>
          <p>Thanks for requesting a demo. We'll review your message and get back to you soon.</p>
          <p>— The team</p>
        `,
      }
      // don't await confirmation send to keep it fire-and-forget friendly
      transporter.sendMail(confirm).catch(()=>{})
    }

    return { success: true }
  }catch(err: any){
    console.error('sendContactEmail error', err)
    return { success: false, error: err?.message }
  }
}

export async function scheduleConsultation(data: ConsultationData){
  try{
    const transporter = buildTransport()

    const meetUrl = (data.googleMeetLink && data.googleMeetLink.trim().length>0)
      ? data.googleMeetLink
      : (process.env.GOOGLE_MEET_URL || process.env.GOOGLE_MEET_LINK || '')

    const formattedDate = format(new Date(data.selectedDate), 'MMMM dd, yyyy')
    const dayName = format(new Date(data.selectedDate), 'EEEE')

    const applicantMail = {
      from: process.env.SMTP_USER,
      to: data.email,
      subject: `✅ Consultation Confirmed - ${data.service || 'Demo'}`,
      html: `
        <h2>Consultation Confirmed</h2>
        <p>Hi ${data.firstName ?? ''},</p>
        <p>Your consultation is scheduled for <strong>${dayName}, ${formattedDate} at ${data.selectedTime}</strong>.</p>
        <p><a href="${meetUrl}">Join Google Meet</a></p>
      `
    }

    const companyMail = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      subject: `📅 New Consultation: ${data.firstName ?? ''} ${data.lastName ?? ''}`,
      html: `
        <h2>New Consultation Scheduled</h2>
        <p><strong>Name:</strong> ${data.firstName ?? ''} ${data.lastName ?? ''}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || '—'}</p>
        <p><strong>When:</strong> ${dayName}, ${formattedDate} at ${data.selectedTime}</p>
        <p><strong>Meet:</strong> <a href="${meetUrl}">${meetUrl}</a></p>
      `
    }

    // send both
    await Promise.all([
      transporter.sendMail(applicantMail),
      transporter.sendMail(companyMail),
    ])

    return { success: true }
  }catch(err: any){
    console.error('scheduleConsultation error', err)
    return { success: false, error: err?.message }
  }
}

"use server"

import nodemailer from "nodemailer"
import { format } from "date-fns"

type ContactData = {
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  country?: string
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

function escapeHtml(value: string){
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
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

    const escapedName = escapeHtml(name)
    const escapedEmail = escapeHtml(data.email)
    const escapedPhone = escapeHtml(data.phone || '—')
    const escapedCountry = escapeHtml(data.country || '—')
    const escapedService = escapeHtml(data.service || 'Demo')
    const escapedMessage = escapeHtml(data.message || '').replace(/\n/g, '<br/>')

    const mailOptions = {
      from: process.env.SMTP_USER,
      replyTo: data.email,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      subject: `📩 Demo / Contact request from ${name}`,
      text: `Name: ${name}\nEmail: ${data.email}\nPhone: ${data.phone || '—'}\nCountry: ${data.country || '—'}\nService: ${data.service || 'demo'}\n\nMessage:\n${data.message || ''}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif;">
          <h2>📩 New Demo Request</h2>

          <table cellpadding="8">
            <tr>
              <td><strong>Name</strong></td>
              <td>${escapedName}</td>
            </tr>
            <tr>
              <td><strong>Email</strong></td>
              <td>${escapedEmail}</td>
            </tr>
            <tr>
              <td><strong>Phone</strong></td>
              <td>${escapedPhone}</td>
            </tr>
            <tr>
              <td><strong>Country</strong></td>
              <td>${escapedCountry}</td>
            </tr>
            <tr>
              <td><strong>Service</strong></td>
              <td>${escapedService}</td>
            </tr>
          </table>

          <hr />

          <h3>Message</h3>
          <p>${escapedMessage}</p>

          <div style="margin-top:24px;">
            <a
              href="mailto:${escapedEmail}"
              style="
                background:#16a34a;
                color:white;
                text-decoration:none;
                padding:12px 20px;
                border-radius:8px;
              "
            >
              Reply To Customer
            </a>
          </div>
        </body>
        </html>
      `,
    }

    const confirm = {
      from: process.env.SMTP_USER,
      to: data.email,
      subject: `We received your demo request`,
      html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; background:#f8fafc; padding:40px;">
        <table width="600" align="center" style="background:white; padding:40px; border-radius:12px;">
          <tr>
            <td>

              <h2>Thanks for your interest 👍</h2>

              <p style="font-size:16px; color:#4b5563;">
                Hi ${escapeHtml(data.firstName ?? '')},
              </p>

              <p style="font-size:16px; color:#4b5563;">
                We've received your demo request and we'd like to understand your hardware shop setup first so we can show you exactly what matters to your business.
              </p>

              <p style="font-size:16px; color:#4b5563;">
                The best way to proceed is a quick WhatsApp conversation where we can tailor the demo to your operations.
              </p>

              <div style="margin:24px 0;">
                <a href="https://wa.me/254791614036"
                  style="
                    background:#25D366;
                    color:white;
                    text-decoration:none;
                    padding:14px 24px;
                    border-radius:8px;
                    font-weight:600;
                    display:inline-block;
                  ">
                  Continue on WhatsApp
                </a>
              </div>

              <hr style="border:none; border-top:1px solid #e5e7eb;" />

              <h3>Before we speak (optional)</h3>

              <p style="font-size:14px; color:#6b7280;">
                You can reply with:
              </p>

              <ul style="font-size:14px; color:#6b7280;">
                <li>Your type of hardware business</li>
                <li>Main challenge (stock, sales, or customer debt)</li>
                <li>Preferred time to talk</li>
              </ul>

              <p style="margin-top:30px;">
                Regards,<br/>
                Vico Softwares
              </p>

            </td>
          </tr>
        </table>
      </body>
      </html>
      `,
    }

    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(confirm),
    ])

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

    const escapedFirstName = escapeHtml(data.firstName ?? '')
    const escapedLastName = escapeHtml(data.lastName ?? '')
    const escapedEmail = escapeHtml(data.email)
    const escapedPhone = escapeHtml(data.phone || '—')
    const escapedService = escapeHtml(data.service || 'Demo')
    const escapedMeetUrl = escapeHtml(meetUrl)

    const applicantMail = {
      from: process.env.SMTP_USER,
      to: data.email,
      subject: `✅ Consultation Confirmed - ${data.service || 'Demo'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; background:#f8fafc; padding:40px;">
          <table width="600" align="center" style="background:white; padding:40px; border-radius:12px;">
            <tr>
              <td>
                <h1>✅ Consultation Confirmed</h1>
                <p>Your consultation has been scheduled.</p>
                <div style="background:#f3f4f6; padding:20px; border-radius:10px; margin:20px 0;">
                  <p><strong>Date:</strong> ${escapeHtml(`${dayName}, ${formattedDate}`)}</p>
                  <p><strong>Time:</strong> ${escapedMeetUrl ? escapeHtml(data.selectedTime) : escapeHtml(data.selectedTime)}</p>
                </div>
                <div style="margin:24px 0;">
                  <a
                    href="${escapedMeetUrl}"
                    style="
                      background:#2563eb;
                      color:white;
                      text-decoration:none;
                      padding:14px 24px;
                      border-radius:8px;
                      display:inline-block;
                    "
                  >
                    Join Consultation
                  </a>
                </div>
                <div style="margin:24px 0;">
                  <a
                    href="https://hardware-in6f.onrender.com"
                    style="
                      background:#111827;
                      color:white;
                      text-decoration:none;
                      padding:14px 24px;
                      border-radius:8px;
                      display:inline-block;
                    "
                  >
                    Explore Demo System
                  </a>
                </div>
                <p>We look forward to speaking with you.</p>
                <p style="margin-top:30px;">Regards,<br/>Vico Softwares</p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    }

    const companyMail = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      subject: `📅 New Consultation: ${escapedFirstName} ${escapedLastName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif;">
          <h2>📩 New Demo Request</h2>

          <table cellpadding="8">
            <tr>
              <td><strong>Name</strong></td>
              <td>${escapedFirstName} ${escapedLastName}</td>
            </tr>
            <tr>
              <td><strong>Email</strong></td>
              <td>${escapedEmail}</td>
            </tr>
            <tr>
              <td><strong>Phone</strong></td>
              <td>${escapedPhone}</td>
            </tr>
            <tr>
              <td><strong>Service</strong></td>
              <td>${escapedService}</td>
            </tr>
          </table>

          <hr />

          <h3>Message</h3>
          <p>${escapeHtml(data.additionalNotes || '').replace(/\n/g, '<br/>')}</p>

          <div style="margin-top:24px;">
            <a
              href="mailto:${escapedEmail}"
              style="
                background:#16a34a;
                color:white;
                text-decoration:none;
                padding:12px 20px;
                border-radius:8px;
              "
            >
              Reply To Customer
            </a>
          </div>
        </body>
        </html>
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

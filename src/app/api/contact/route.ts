import { NextResponse } from 'next/server'
import { sendContactEmail } from '../../../actions/contact'

export async function POST(req: Request){
  try{
    const form = await req.formData()
    const fullName = form.get('name')?.toString() ?? ''
    const email = form.get('email')?.toString() ?? ''
    const phone = form.get('phone')?.toString() ?? ''
    const country = form.get('country')?.toString() ?? ''
    const service = form.get('service')?.toString() ?? ''
    const message = form.get('message')?.toString() ?? ''

    const [firstName, ...rest] = fullName.split(' ')
    const lastName = rest.join(' ')

    const result = await sendContactEmail({ firstName, lastName, email, phone, country, service: service || 'Demo', message })
    if(result.success) return NextResponse.json({ ok: true })
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 })
  }catch(e: any){
    console.error('api/contact error', e)
    return NextResponse.json({ ok: false, error: e?.message || 'unknown' }, { status: 500 })
  }
}

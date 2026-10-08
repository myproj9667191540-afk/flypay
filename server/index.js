import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const leadStore = path.join(root, 'data', 'leads.json');
app.use(cors());
app.use(express.json());

const Service = mongoose.model('Service', new mongoose.Schema({ title: String, detail: String, icon: String, tint: String, tag: String }));
const Lead = mongoose.model('Lead', new mongoose.Schema({ name: { type: String, required: true }, email: { type: String, required: true }, phone: String, interest: String, createdAt: { type: Date, default: Date.now } }));


const smtpReady = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.MAIL_TO);
console.log('[DEBUG] SMTP configured:', smtpReady);
const mailTransport = smtpReady ? nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: String(process.env.SMTP_SECURE || 'true').toLowerCase() === 'true',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
}) : null;
if (mailTransport) {
  mailTransport.verify().then(() => console.log('SMTP connection ready')).catch(error => console.error('SMTP connection check failed:', error.message));
} else {
  console.warn('SMTP not configured: contact messages will be saved without email delivery.');
}
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

const services = [
  { title: 'Mobile recharges', detail: 'Top up any prepaid number in moments. Quick, reliable recharges across leading networks.', icon: 'smartphone', tint: 'lavender', tag: 'Stay connected' },
  { title: 'DTH recharges', detail: 'Keep the good stuff playing. Renew your DTH service with a simple, seamless payment.', icon: 'tv', tint: 'peach', tag: 'More to watch' },
  { title: 'Bharat BBPS', detail: 'Water, electricity, broadband and more. Settle your everyday household bills in one place.', icon: 'receipt', tint: 'mint', tag: 'Bills, all sorted' },
  { title: 'Digital banking', detail: 'Explore convenient banking services designed to bring helpful financial tools closer.', icon: 'landmark', tint: 'lemon', tag: 'Bank with ease' }
];
app.get('/api/health', (_req, res) => res.json({ ok: true, database: mongoose.connection.readyState === 1 ? 'connected' : 'demo' }));
app.get('/api/services', async (_req, res) => { try { const docs = mongoose.connection.readyState === 1 ? await Service.find().lean() : []; res.json(docs.length ? docs : services); } catch { res.json(services); } });
app.post('/api/leads', async (req, res) => {
  console.log('[DEBUG] Contact form request received');
console.log('[DEBUG] SMTP transport available:', Boolean(mailTransport));
  const { name, email, phone = '', interest = 'General enquiry' } = req.body || {};
 // if (!name?.trim() || !/^\S+@\S+\.\S+$/.test(email || '')) return res.status(400).json({ message: 'Please enter your name and a valid email address.' });
if (!name?.trim() || !/^\S+@\S+\.\S+$/.test(email || '')) {
  return res.status(400).json({
    message: 'Please enter your name and a valid email address.'
  });
}
  const lead = { name: name.trim(), email: email.trim(), phone: String(phone).trim(), interest: String(interest).trim(), createdAt: new Date().toISOString() };
  try {
    if (mongoose.connection.readyState === 1) await Lead.create(lead);
    else { let existing = []; try { existing = JSON.parse(await readFile(leadStore, 'utf8')); } catch {} await mkdir(path.dirname(leadStore), { recursive: true }); await writeFile(leadStore, JSON.stringify([...existing, lead], null, 2)); }
  } catch { return res.status(500).json({ message: 'We could not save your message just now. Please call +91 92783 34833.' }); }

  if (!mailTransport) return res.status(201).json({ message: 'Thanks, your message was saved. Add the SMTP settings to .env to send it to your email.' });
  try {
    const safeName = escapeHtml(lead.name);
    const safeEmail = escapeHtml(lead.email);
    const safePhone = escapeHtml(lead.phone || 'Not provided');
    const safeInterest = escapeHtml(lead.interest || 'General enquiry');
    await mailTransport.sendMail({
      from: { name: process.env.MAIL_FROM_NAME || 'FlyPay Website', address: process.env.SMTP_USER },
      to: process.env.MAIL_TO,
      replyTo: lead.email,
      subject: 'New FlyPay website enquiry: ' + (lead.interest || 'General enquiry'),
      text: 'New contact form submission\n\nName: ' + lead.name + '\nEmail: ' + lead.email + '\nPhone: ' + (lead.phone || 'Not provided') + '\nEnquiry: ' + (lead.interest || 'General enquiry') + '\nReceived: ' + lead.createdAt,
      html: '<h2>New contact form submission</h2><p><b>Name:</b> ' + safeName + '</p><p><b>Email:</b> ' + safeEmail + '</p><p><b>Phone:</b> ' + safePhone + '</p><p><b>Enquiry:</b> ' + safeInterest + '</p><p><b>Received:</b> ' + escapeHtml(lead.createdAt) + '</p>'
    });
    return res.status(201).json({ message: 'Thanks, your message has been sent.' });
  } catch (error) {
    console.error('Contact email delivery failed:', error.message);
    return res.status(201).json({ message: 'Your message was saved, but the email could not be sent. Please contact support directly.' });
  }
});

//if (process.env.MONGODB_URI) mongoose.connect(process.env.MONGODB_URI).then(async () => { if (!await Service.countDocuments()) await Service.insertMany(services); console.log('MongoDB connected'); }).catch(() => console.log('MongoDB unavailable — running in demo mode'));
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
      if (!await Service.countDocuments()) {
        await Service.insertMany(services);
      }

      console.log('MongoDB connected successfully');
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error.message);
    });
} else {
  console.error('MONGODB_URI is missing from environment variables');
}
if (process.env.NODE_ENV === 'production') { app.use(express.static(path.join(root, 'dist'))); app.get('*', (_req, res) => res.sendFile(path.join(root, 'dist', 'index.html'))); }
app.listen(port, () => console.log(`FlyPay API ready at http://localhost:${port}`));

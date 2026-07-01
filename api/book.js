// Vercel Serverless Function — POST /api/book
// Validates and receives a booking request from the IA Saloon landing page.
//
// NOTE: This function does not persist data anywhere by default (serverless
// functions don't share memory between requests). To make bookings durable,
// wire this up to one of:
//   - An email service (Resend, SendGrid) to email the studio manager
//   - A database (MongoDB Atlas, Supabase, PlanetScale) to store rows
//   - A Google Sheet via the Sheets API
// See README.md for a quick example using Resend.

function validateBooking(body) {
  const errors = {};
  if (!body.name || body.name.trim().length < 2) errors.name = 'Name is required.';
  if (!body.phone || body.phone.trim().length < 7) errors.phone = 'A valid phone number is required.';
  if (!body.service) errors.service = 'Please choose a service.';
  if (!body.date) errors.date = 'Please choose a preferred date.';
  return errors;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  let body = req.body;
  if (!body || typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}');
    } catch {
      return res.status(400).json({ error: 'Invalid request body.' });
    }
  }

  const errors = validateBooking(body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: 'Please check the highlighted fields.', fields: errors });
  }

  const booking = {
    name: body.name.trim(),
    phone: body.phone.trim(),
    service: body.service,
    date: body.date,
    message: (body.message || '').trim(),
    receivedAt: new Date().toISOString()
  };

  // Log for now — replace with email/DB integration (see README.md)
  console.log('New booking request:', booking);

  return res.status(200).json({
    ok: true,
    message: 'Booking request received.',
    booking
  });
};

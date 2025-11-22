import connectToDatabase from '../../../lib/db';
import Link from '../../../models/Link';
import  generateCode  from '../../../lib/generateCode';


export async function GET() {
await connectToDatabase();
const links = await Link.find({}).sort({ createdAt: -1 }).lean();
return new Response(JSON.stringify(links), {
status: 200,
headers: { 'Content-Type': 'application/json' }
});
}


export async function POST(req) {
const body = await req.json();
const { targetUrl, customCode } = body;


// Basic URL validation
try {
const u = new URL(targetUrl);
if (!['http:', 'https:'].includes(u.protocol)) {
throw new Error('Invalid protocol');
}
} catch (err) {
return new Response(JSON.stringify({ error: 'Invalid URL' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
}


await connectToDatabase();


let codeToUse = customCode && String(customCode).trim().length ? String(customCode) : generateCode(6);


// Validate code pattern
const codePattern = /^[A-Za-z0-9]{6,8}$/;
if (!codePattern.test(codeToUse)) {
return new Response(JSON.stringify({ error: 'Code must match [A-Za-z0-9]{6,8}' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
}


// If custom code provided, check uniqueness, else try generating unique code.
if (customCode) {
const exists = await Link.findOne({ code: codeToUse });
if (exists) {
return new Response(JSON.stringify({ error: 'Code already exists' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
}
} else {
// try generating unique code (few attempts)
let tries = 0;
while (tries < 5) {
const existing = await Link.findOne({ code: codeToUse });
if (!existing) break;
codeToUse = generateCode(6);
tries++;
}
// if still exists (very unlikely), return 500
const existingFinal = await Link.findOne({ code: codeToUse });
if (existingFinal) {
return new Response(JSON.stringify({ error: 'Failed to generate unique code' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
}
}


const link = new Link({ code: codeToUse, targetUrl });
await link.save();


}
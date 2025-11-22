import connectToDatabase from "../../lib/db";
import Link from "../../models/Link";

export const dynamic = "force-dynamic";

export default async function RedirectPage({ params }) {
  const { code } = params;
  await connectToDatabase();
  const link = await Link.findOne({ code });
  if (!link) {
    return new Response("Link not found", { status: 404 });
  }

  // increment clicks and update lastClicked asynchronously
  link.clicks = (link.clicks || 0) + 1;
  link.lastClicked = new Date();
  await link.save();

  return new Response(null, {
    status: 302,
    headers: {
      Location: link.targetUrl,
    },
  });
}

import connectToDatabase from "../lib/db";
import Link from "../models/Link";

import LinkForm from "../components/LinkForm";
import LinkTable from "../components/LinkTable";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Connect to DB (SSR)
  await connectToDatabase();

  // Fetch all links (sorted newest first)
  const links = await Link.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-10">
      {/* Create Link Form */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Create a Short Link</h2>
        <LinkForm />
      </section>

      {/* Links Table */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Links</h2>
        <LinkTable initialLinks={links} />
      </section>
    </div>
  );
}

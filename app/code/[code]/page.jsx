import connectToDatabase from "../../../lib/db";
import Link from "../../../models/Link";
import Header from "../../../components/Header";

export default async function CodePage({ params }) {
  const { code } = params;
  await connectToDatabase();
  const link = await Link.findOne({ code }).lean();

  return (
    <html>
      <body>
        <Header />
        <main className="max-w-4xl mx-auto p-6">
          {!link ? (
            <div className="p-6 bg-red-50 rounded">Link not found</div>
          ) : (
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold">
                Stats for <span className="font-mono">{code}</span>
              </h1>
              <div className="bg-white shadow rounded p-4">
                <p>
                  <strong>Target URL:</strong>{" "}
                  <a className="text-blue-600" href={link.targetUrl}>
                    {link.targetUrl}
                  </a>
                </p>
                <p>
                  <strong>Clicks:</strong> {link.clicks || 0}
                </p>
                <p>
                  <strong>Last clicked:</strong>{" "}
                  {link.lastClicked
                    ? new Date(link.lastClicked).toLocaleString()
                    : "Never"}
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(link.createdAt).toLocaleString()}
                </p>
                <p className="mt-4">
                  <strong>Short link:</strong>{" "}
                  <a
                    className="text-indigo-600"
                    href={`${
                      process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL
                    }/${code}`}
                  >
                    {process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL
                      ? `${
                          process.env.NEXT_PUBLIC_BASE_URL ||
                          process.env.BASE_URL
                        }/${code}`
                      : `/${code}`}
                  </a>
                </p>
              </div>
            </div>
          )}
        </main>
      </body>
    </html>
  );
}

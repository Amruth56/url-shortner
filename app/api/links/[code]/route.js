import connectToDatabase from "../../../../lib/db";
import Link from "../../../../models/Link";

export async function GET(req) {
  const { params } = req;
  const code = params.code;
  await connectToDatabase();
  const link = await Link.findOne({ code }).lean();
  if (!link) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify(link), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}


export async function DELETE(req){
    const {params} = req;
    const code = params.code;
    await connectToDatabase();
    const res = await Link.deleteOne({code});
    if(res.deletedCount === 0){
        return new Response(JSON.stringify({error: "Not found"}), {
            status: 404,
            headers: {"Content-Type": "application/json"}
        });
    }
    return new Response(null, { status: 204 });
}
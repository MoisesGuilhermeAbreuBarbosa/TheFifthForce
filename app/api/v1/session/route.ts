export function GET(){return Response.json({error:'This database-backed service has been retired. Use GitHub accounts and Issues; newsroom drafts are saved only in your browser.',account:'/account'},{status:410});}
export const POST=GET;export const DELETE=GET;

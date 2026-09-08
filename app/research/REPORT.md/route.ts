// Preserve bookmarked paper links while keeping source downloads explicit.
export function GET(req: Request) {
  return Response.redirect(new URL('/research/paper.html', req.url), 307);
}

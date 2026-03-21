import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/dist/server/web/spec-extension/response';
import { NextRequest } from 'next/dist/server/web/spec-extension/request';
 
export default NextAuth(authConfig).auth;

export function proxy(request: NextRequest) {
  return NextResponse.next();
}
 
// Routes Proxy should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
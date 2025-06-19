import { NextRequest, 
   NextResponse
 } from 'next/server'
import { cookies } from 'next/headers'
 
// // 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/welcome']
 
export default async function middleware(
    req: NextRequest
) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
 
  const auth = await cookies()
  const token = auth.get("refreshToken")?.value
 
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl))
  }
 

 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
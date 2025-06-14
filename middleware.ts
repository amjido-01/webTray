//import { NextRequest, 
   // NextResponse
 //} from 'next/server'
console.log("am running on the server......")
// // import { cookies } from 'next/headers'
 
// // 1. Specify protected and public routes
// const protectedRoutes = ['/dashboard']
 
export default async function middleware(
    //req: NextRequest
) {
//   // 2. Check if the current route is protected or public
//   const path = req.nextUrl.pathname
//   const isProtectedRoute = protectedRoutes.includes(path)
 
//   // 3. Decrypt the session from the cookie
//   const token = req.cookies.get("accessToken")?.value
//   console.log(token, "token")
 
//   // 4. Redirect to /login if the user is not authenticated
//   if (isProtectedRoute && !token) {
//     return NextResponse.redirect(new URL('/signin', req.nextUrl))
//   }
 

 
//   return NextResponse.next()
// }
 
// // Routes Middleware should not run on
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
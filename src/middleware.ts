//? This stuff for protecting routes, modify as needed
export { default } from 'next-auth/middleware'

export const config = {
  // matcher: ['/((?!api/auth|login|$).*)', '/(']
  matcher: [
    '/contributions', '/dashboard', '/profile',
    '/doc_create'
  ]
}
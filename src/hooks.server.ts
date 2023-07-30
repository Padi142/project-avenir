import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  // get cookies from browser
  const session = event.cookies.get('session')
console.log(`ahoj ${session}`)
  if (!session) {
    // if there is no session load page as normal
    return await resolve(event)
  }

  // if `user` exists set `events.local`q
    event.locals.user = JSON.parse(session)

  // load page as normal
  return await resolve(event)
}

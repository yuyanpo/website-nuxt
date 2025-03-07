export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)

  if (username === 'admin' && password === 'admin123') {
    // set the user session in the cookie
    // this server util is auto-imported by the auth-utils module
    await setUserSession(event, {
      user: {
        name: 'Administrator'
      }
    })
    return {}
  }
  throw createError({
    statusCode: 401,
    message: 'Bad credentials'
  })
})
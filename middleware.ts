export { default } from "next-auth/middleware"

// secures the matching routes...
// it will protect the ["/"] route with /auth/signin
export const config = {matcher: ["/"]}
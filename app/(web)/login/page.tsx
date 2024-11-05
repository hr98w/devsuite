import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { cache } from "react"
import { Button } from "~/components/web/ui/button"
import { Intro, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { auth, signIn } from "~/lib/auth"
import { parseMetadata } from "~/utils/metadata"

const getMetadata = cache(
  (metadata?: Metadata): Metadata => ({
    ...metadata,
    title: "Sign in to your account",
  }),
)

export const metadata = parseMetadata(
  getMetadata({
    alternates: { canonical: "/login" },
    openGraph: { url: "/login" },
  }),
)

export default async function LoginPage() {
  const { title } = getMetadata()
  const session = await auth()

  if (session?.user) {
    redirect("/admin")
  }

  const handleSignIn = async () => {
    "use server"
    await signIn("google", { redirectTo: "/admin" })
  }

  return (
    <Wrapper size="sm">
      <Intro>
        <IntroTitle>{title?.toString()}</IntroTitle>
      </Intro>

      <Button size="lg" className="w-full mx-auto" onClick={handleSignIn}>
        Continue with Google
      </Button>
    </Wrapper>
  )
}

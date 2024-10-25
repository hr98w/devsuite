import { redirect } from "next/navigation"
import { Button } from "~/components/admin/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/admin/ui/card"
import { config } from "~/config"
import { auth, signIn } from "~/lib/auth"
import { parseMetadata } from "~/utils/metadata"

export const metadata = parseMetadata({
  title: `Sign in to your ${config.site.name} account`,
  alternates: { canonical: "/admin/login" },
  openGraph: { url: "/admin/login" },
})

export default async function LoginPage() {
  const session = await auth()

  if (session?.user) {
    redirect("/")
  }

  const handleSignIn = async () => {
    "use server"
    await signIn("google", { redirectTo: "/admin" })
  }

  return (
    <div className="min-h-screen flex justify-center items-start p-8 bg-muted md:items-center">
      <Card className="w-full max-w-xs mb-[25vh]">
        <CardHeader>
          <CardTitle size="h4" className="text-center">
            Sign in to {config.site.name}
          </CardTitle>
        </CardHeader>

        <CardFooter>
          <Button size="lg" className="w-full" onClick={handleSignIn}>
            Continue with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

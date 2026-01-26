import SignupPage from '@/components/signup_page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SignupPage />
  )
}

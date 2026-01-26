import ForgotPasswordPage from '@/components/forgot_password_page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login/forgot_password')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ForgotPasswordPage />
  )
}

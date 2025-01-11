import Unauthorized from "@/components/ui/multiple_uses/Unauthorized"
import { getServerSession } from "next-auth"

export default async({children}: {children: React.ReactNode}) => {
  const session = await getServerSession()
  if(!session || !session.user.permissions.find(perm => perm.name === 'admin:admin')) return <Unauthorized/>
  return <>
  {children}
  </>
}
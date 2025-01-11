import Unauthorized from "@/components/ui/multiple_uses/Unauthorized"
import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"

export default async({children}: {children: React.ReactNode}) => {
  const session = await getServerSession(options)
  console.log(session)
  if(!session || !session.user.permissions.find(perm => perm.name === 'admin:admin')) return <Unauthorized/>
  return <>
  {children}
  </>
}
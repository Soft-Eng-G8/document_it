import prisma from "@/lib/db"

async function RolePage({params})  {
    const role = await prisma.role.findUnique({
    where: {
      id: Number(params.id),
    },});
  return (
    <div>

        <div key={role?.id}>
          <h1>{role?.name}</h1>
        </div>
    </div>
  )
}

export default RolePage
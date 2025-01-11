import { createRoleTest } from '@/actions/actions'
import prisma from '@/lib/db'
import { create } from 'domain'
import Link from 'next/link'
import React from 'react'

async function TestRoles()  {
    const roles = await prisma.role.findMany({
      orderBy:{
        id: 'desc'
      }
    })
    const users = await prisma.user.findMany({
     
      
    })
    const count = await prisma.role.count()
  return (
    <div>
      <div>There are {count} roles</div>
      {roles.map((role) => (
        <div key={role.id}>
          <Link href={`/test_roles/${role.id}`}>{role.name}</Link>
        </div>
        ))}
        <div className='h-[50px]'></div>

        {/// create a new role
        }
        <form action={createRoleTest}>
          <input type="text" name="name" id="name"/>
          <button type="submit">Create</button>
        </form>
        <div className='h-[50px]'></div>
        {users.map((user) => (
        <div key={user.id}>
        </div>
        ))}
    </div>
  )
}

export default TestRoles

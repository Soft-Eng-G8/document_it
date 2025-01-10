import ContributionsPanel from '@/components/ui/single_use/contributionsPanel/Contributions'
import RecentContributions from '@/components/ui/single_use/contributionsPanel/recents'
import React from 'react'

function ContributionsComponent() {
  return (
    <div className='flex flex-col'>
      <ContributionsPanel/>
      <RecentContributions/>
    </div>
  )
}

export default ContributionsComponent

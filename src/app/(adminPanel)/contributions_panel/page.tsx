import ContributionsPanel from '@/components/ui/single_use/contributionsPanel/Contributions'
import RecentContributions from '@/components/ui/single_use/contributionsPanel/recents'
import Header from '@/components/ui/single_use/dashboard/header'
import SideNavBar from '@/components/ui/single_use/dashboard/SideNavBar'

async function ContributionsComponent() {
  return (
    <div className="flex items-start min-h-screen">


    <SideNavBar/>
    <div className="flex-1">
      <div className='flex flex-col mx-4 mt-2'>
      <ContributionsPanel/>
      {/* <RecentContributions/> */}
    </div>
    </div>
  </div>
   
  )
}

export default ContributionsComponent
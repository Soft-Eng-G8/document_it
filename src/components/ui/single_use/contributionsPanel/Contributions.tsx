import ContributionsRowHead from './contributions_head';
import ContributionRow from './contribution_row';
import prisma from '@/lib/db';

async function  ContributionsPanel() {
    const pending = await prisma.contribution.count({
        where: {
            status: "Pending",
        },
    });
    const reviewed = await prisma.contribution.count({
        where: {
            status: "Reviewed",
        },
    });;
    const totalConts = pending + reviewed;
    const fetchedContributions = await prisma.contribution.findMany({
        include: {
            user: true,
        },
    })

  return (
    <div className='w-full h-[550px] bg-mywhite rounded-lg shadow-lg flex flex-col justify-between'>
        <div className='flex-1 flex flex-row justify-between items-center p-4 ml-6'>
            <div className='flex-[1] flex flex-col'>
            <div className='text-[30px] font-bold text-black mb-2'>Latest Contributions</div>
            <div>
                <span className='text-[16px] text-black font-semibold'>{totalConts} Total, </span>
             <span className='text-neutral-400'>proceed to resolve them</span>
             </div>
            </div>

            <div className='flex-[1] flex flex-row justify-end'>
                <div className='flex flex-col items-center m-10 mr-10'>
                    <span className='text-[30px] text-black font-semibold'>{pending}</span>
                    <span className='text-[16px] text-neutral-400 font-medium'>Pending</span>
                </div>
                <div className="flex items-center">
                    <div className="border-l-2 border-gray-300 h-[70px]"></div> 
                </div>
                <div className='flex flex-col items-center m-10 mr-10'>
                    <span className='text-[30px] text-black font-semibold'>{reviewed}</span>
                    <span className='text-[16px] text-neutral-400 font-medium'>Reviewed</span>
                </div>
            </div>
            
        </div>
        <div className="flex-[2] flex flex-col justify-start h-full">
  <div className="pl-10 pr-10 mb-3">
    <ContributionsRowHead />
  </div>
  <div className="pl-10 pr-10">
    <div className="max-h-[200px] overflow-y-auto">
     
      {fetchedContributions.map((contribution, key) => (
        <ContributionRow
          key={key}
          contribution_id={contribution.id}
          contribution_name={contribution.oldTitle ?? contribution.newTitle ?? ''} 
          contribution_type={contribution.type ?? ''}
          contributor={contribution.user}
          date={contribution.createdAt.toLocaleDateString()}
          status={contribution.status}
        />
      ))}
    </div>
  </div>
</div>
    </div>
  )
}

export default ContributionsPanel

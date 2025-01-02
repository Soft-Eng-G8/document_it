import { Roboto } from 'next/font/google';
import React from 'react'

const robotoBold = Roboto({ weight: '900' , subsets: ['cyrillic-ext', 'greek'] });
const roboto = Roboto({ weight: '500' , subsets: ['cyrillic-ext', 'greek'] });
const roboto700 = Roboto({ weight: '700' , subsets: ['cyrillic-ext', 'greek'] });

function LearnMoreContributions({ownReference}: {ownReference: any}) {
  return (
    <div className='m-10' ref={ownReference} >
        <div className={`text-[35px] font-bold text-start ${roboto700.className}`}>
        Our Contributions System
        </div>

        <div className='m-5 flex flex-row justify-between'>
            <div className='w-[340px]'>
            <img src="/contribute_path.png" alt="" className='w-[340px]'/>

            </div>
        <div className='h-[600px] w-[900px] bg-mywhite shadow-lg rounded-lg p-8'>
            <div className='flex flex-row justify-between'>
                <div className='w-[750px]'>
                    <p className='text-neutral-500 mb-2'>1/</p>
                    <div className={`text-[25px] text-black  ${roboto700.className}`}>Submit a Contribution</div>
                </div>
                <div className='mt-10'>
                <div className={`text[15px] text-neutral-500 ${roboto.className}`}>Users can submit new documents or updates to improve the site’s content. Each submission must include clear details and justifications. Once submitted, contributions enter a queue for review.</div>

                </div>
            </div>
            <div className='border-[1px] my-[40px] border-neutral-200'></div>
            <div className='flex flex-row justify-between'>
                <div className='w-[900px]'>
                    <p className='text-neutral-500 mb-2'>2/</p>
                    <div className={`text-[25px] text-black  ${roboto700.className}`}>Wait for a Review</div>
                </div>
                <div className='mt-10'>
                <div className={`text[15px] text-neutral-500 ${roboto.className}`}>Contributions are reviewed by other users based on a role hierarchy, where higher-ranking contributors can review submissions from those with lower roles. This ensures content is vetted by experienced members of the community.</div>

                </div>
            </div>

            <div className='border-[1px] my-[40px] border-neutral-200'></div>
            <div className='flex flex-row justify-between'>
                <div className='w-[750px]'>
                    <p className='text-neutral-500 mb-2'>3/</p>
                    <div className={`text-[25px] text-black  ${roboto700.className}`}>Contribution Accepted</div>
                </div>
                <div className='mt-10'>
                <div className={`text[15px] text-neutral-500 ${roboto.className}`}>Higher-ranking contributors decide whether to accept, reject, or request changes to a contribution. Once accepted, the update is published, ensuring accurate and trustworthy site content.</div>

                </div>
            </div>
            
        </div>
        </div>

    </div>
  )
}

export default LearnMoreContributions

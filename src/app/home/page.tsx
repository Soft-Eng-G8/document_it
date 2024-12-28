import { Button } from '@/components/ui/multiple_uses/button';
import Video from 'next-video';

export default function CompareCard() {
  return (
    <div className="min-h-screen flex items-center bg-background justify-center" style={{  }}>
      <div style={{
        // Card base styles
        width: "100%",
        minHeight: '500px',
        borderRadius: '40px',
        position: 'relative',
        borderTopRightRadius: 0,
        filter: 'drop-shadow(0 10px 48px rgba(21, 44, 115, 0.15))',
        
        // CSS Custom Properties
        '--circle-r': '30px',
        '--big-circle-r': '25px',
        '--pillar-size': 'max(300px, var(--circle-r))',
        '--card-color': '#2192e2',
        '--circle-d': 'calc(var(--circle-r) * 2)',
        '--circles-space': 'calc(var(--big-circle-r) + var(--pillar-size))',
        '--circle-extend-inset': 'calc(var(--circle-r) + var(--circles-space))',

        // Complex background with multiple gradients
        background: `
          /* Top Circle */
          radial-gradient(
            circle closest-side,
            var(--card-color) 100%,
            transparent calc(100% + 1px)
          )
          calc(100% - var(--circles-space)) 0 / var(--circle-d) var(--circle-d)
          no-repeat no-repeat,

          /* Top Circle Extend */
          linear-gradient(0deg, var(--card-color) 100%, var(--card-color) 100%) 0px
          0px / calc(100% - var(--circle-extend-inset)) var(--circle-d) no-repeat
          no-repeat,

          /* Top Gap fill Pillar */
          linear-gradient(0deg, var(--card-color) 100%, var(--card-color) 100%) 0px
          var(--circle-r) / calc(100% - var(--circles-space))
          calc(100% - var(--circle-r)) no-repeat no-repeat,

          /* Right Circle */
          radial-gradient(
            circle closest-side,
            var(--card-color) 100%,
            transparent calc(100% + 1px)
          )
          100% var(--circles-space) / var(--circle-d) var(--circle-d) no-repeat
          no-repeat,

          /* Right Circle Extend */
          linear-gradient(0deg, var(--card-color) 100%, var(--card-color) 100%) 100%
          var(--circle-extend-inset) / var(--circle-d) 100% no-repeat no-repeat,

          /* Right Gap fill Pillar */
          linear-gradient(0deg, var(--card-color) 100%, var(--card-color) 100%) 0
          var(--circles-space) / calc(100% - var(--circle-r)) 100% no-repeat
          no-repeat,

          /* Big Circle Cutout */
          radial-gradient(
            circle at 100% 0%,
            transparent var(--big-circle-r),
            var(--card-color) calc(var(--big-circle-r) + 1px)
          )
          0px var(--pillar-size) / calc(100% - var(--pillar-size)) 10% no-repeat
          no-repeat
        `
      } as React.CSSProperties}>
        {/* Top right decorative element */}
        <div className="bg-mywhite" style={{
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          height: '301px',
          width: '301px',
          borderRadius: '15px',
          boxShadow: '0 10px 24px -10px rgba(234, 0, 41, 0.2)'
        }} >
          <div className='h-[300px] w-[300px]'>
          <Video src="/floating.mp4" autoPlay muted loop  />
          </div>
        </div>


        <h1 className="text-white font-bold text-[40px] ml-10 mt-10">Document it site is great</h1>
      </div>


    </div>
  )
}


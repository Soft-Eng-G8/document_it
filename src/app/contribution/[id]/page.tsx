interface Contribution {
  id: string
  type: 'add' | 'modify'
  title: string
  description: string
  path: string
  date: string
  author: {
    name: string
    avatar: string
  }
}

export default function ContributionsPage() {
  // Sample contributions data
  const contributions: Contribution[] = [
    {
      id: '1',
      type: 'add',
      title: 'Getting Started Guide',
      description: 'Added a comprehensive guide for new users getting started with our platform',
      path: '/docs/getting-started',
      date: 'Dec 12, 2023',
      author: {
        name: 'Sarah Chen',
        avatar: '/placeholder.svg?height=40&width=40'
      }
    },
    {
      id: '2',
      type: 'modify',
      title: 'API Authentication',
      description: 'Updated the API authentication documentation to include OAuth2 examples',
      path: '/docs/api/auth',
      date: 'Dec 11, 2023',
      author: {
        name: 'Mike Johnson',
        avatar: '/placeholder.svg?height=40&width=40'
      }
    },
    {
      id: '3',
      type: 'add',
      title: 'Deployment Guide',
      description: 'Added new documentation for deploying to multiple cloud providers',
      path: '/docs/deployment',
      date: 'Dec 10, 2023',
      author: {
        name: 'Alex Turner',
        avatar: '/placeholder.svg?height=40&width=40'
      }
    }
  ]

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Recent Contributions</h1>
      
      <div className="space-y-4">
        {contributions.map((contribution) => (
          <div 
            key={contribution.id} 
            className="p-6 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-lg"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  {contribution.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <span 
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      contribution.type === 'add' 
                        ? 'bg-[hsl(205,76.9%,50.8%)] text-white' 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    {contribution.type === 'add' ? '+ Added' : '~ Modified'}
                  </span>
                  <span>{contribution.path}</span>
                  <span>•</span>
                  <span>{contribution.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={contribution.author.avatar}
                  alt={contribution.author.name}
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {contribution.author.name}
                </span>
              </div>
            </div>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300">
              {contribution.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}


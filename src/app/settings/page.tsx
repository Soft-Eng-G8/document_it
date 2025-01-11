import Header from '@/components/ui/single_use/dashboard/header'
import SideNavBar from '@/components/ui/single_use/dashboard/SideNavBar'
import { Cog, Bell, Moon, User } from 'lucide-react'

interface SettingsSection {
  id: string
  title: string
  icon: React.ReactNode
  fields: {
    id: string
    label: string
    type: 'text' | 'email' | 'checkbox' | 'select'
    value?: string | boolean
    options?: string[]
  }[]
}

export default function SettingsPage() {
  const sections: SettingsSection[] = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: <User className="h-5 w-5" />,
      fields: [
        {
          id: 'name',
          label: 'Display Name',
          type: 'text',
          value: 'Oukil Hamza'
        },
        {
          id: 'email',
          label: 'Email Address',
          type: 'email',
          value: 'oukil@example.com'
        },
        {
          id: 'role',
          label: 'Role',
          type: 'select',
          value: 'contributor',
          options: ['admin', 'contributor', 'viewer']
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notification Preferences',
      icon: <Bell className="h-5 w-5" />,
      fields: [
        {
          id: 'email_notifications',
          label: 'Email Notifications',
          type: 'checkbox',
          value: true
        },
        {
          id: 'contribution_updates',
          label: 'Contribution Updates',
          type: 'checkbox',
          value: true
        },
        {
          id: 'mention_notifications',
          label: 'Mentions',
          type: 'checkbox',
          value: true
        }
      ]
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: <Moon className="h-5 w-5" />,
      fields: [
        {
          id: 'theme',
          label: 'Theme',
          type: 'select',
          value: 'system',
          options: ['light', 'dark', 'system']
        }
      ]
    }
  ]

  async function handleSubmit(formData: FormData) {
    'use server'
    // Handle form submission here
  }

  return (
    <div>
        <Header />
        <div className="container mx-auto p-6">
        
        <div className="flex items-center gap-2 mb-6">
          <Cog className="h-6 w-6 text-black" />
          <h1 className="text-3xl font-bold text-black">Settings</h1>
        </div>
  
        <form action={handleSubmit}>
          <div className="space-y-6 text-black" >
            {sections.map((section) => (
              <div 
                key={section.id}
                className="p-6 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-4">
                  {section.icon}
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
  
                <div className="space-y-4">
                  {section.fields.map((field) => (
                    <div key={field.id} className="flex flex-col gap-1">
                      <label 
                        htmlFor={field.id}
                        className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                      >
                        {field.label}
                      </label>
                      
                      {field.type === 'checkbox' ? (
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            id={field.id}
                            name={field.id}
                            defaultChecked={field.value as boolean}
                            className="h-4 w-4 rounded border-neutral-300 text-[hsl(205,76.9%,50.8%)] focus:ring-[hsl(205,76.9%,50.8%)]"
                          />
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            Enable {field.label.toLowerCase()}
                          </span>
                        </label>
                      ) : field.type === 'select' ? (
                        <select
                          id={field.id}
                          name={field.id}
                          defaultValue={field.value as string}
                          className="mt-1 block w-full rounded-md border border-neutral-300 dark:border-neutral-700 
                                   bg-white dark:bg-black py-2 px-3 text-sm focus:border-[hsl(205,76.9%,50.8%)] 
                                   focus:outline-none focus:ring-1 focus:ring-[hsl(205,76.9%,50.8%)]"
                        >
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option.charAt(0).toUpperCase() + option.slice(1)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          id={field.id}
                          name={field.id}
                          defaultValue={field.value as string}
                          className="mt-1 block w-full rounded-md border border-neutral-300 dark:border-neutral-700 
                                   bg-white dark:bg-black py-2 px-3 text-sm focus:border-[hsl(205,76.9%,50.8%)] 
                                   focus:outline-none focus:ring-1 focus:ring-[hsl(205,76.9%,50.8%)]"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
  
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[hsl(205,76.9%,50.8%)] hover:bg-[hsl(205,76.9%,45%)] 
                         text-white rounded-md text-sm font-medium focus:outline-none 
                         focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(205,76.9%,50.8%)]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
     

    
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  BarChart 
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart
  }
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navigation.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium rounded-md",
              pathname === item.href
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <Icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
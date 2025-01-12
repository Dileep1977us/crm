"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const customerGrowthData = [
  { month: "Jan", customers: 20 },
  { month: "Feb", customers: 28 },
  { month: "Mar", customers: 35 },
  { month: "Apr", customers: 40 },
  { month: "May", customers: 48 },
  { month: "Jun", customers: 55 },
]

const taskCompletionData = [
  { month: "Jan", completed: 15, pending: 8 },
  { month: "Feb", completed: 20, pending: 10 },
  { month: "Mar", completed: 25, pending: 12 },
  { month: "Apr", completed: 30, pending: 15 },
  { month: "May", completed: 35, pending: 18 },
  { month: "Jun", completed: 40, pending: 20 },
]

const customerStatusData = [
  { name: "Active", value: 65 },
  { name: "Inactive", value: 35 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Growth Chart */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Customer Growth</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="customers"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Task Completion Chart */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Task Completion</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#82ca9d" />
                <Bar dataKey="pending" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Customer Status Distribution */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            Customer Status Distribution
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {customerStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Summary Statistics */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">
                Total Customers
              </h3>
              <p className="text-2xl font-bold">55</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">
                Active Customers
              </h3>
              <p className="text-2xl font-bold">65%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">
                Tasks Completed
              </h3>
              <p className="text-2xl font-bold">40</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">
                Completion Rate
              </h3>
              <p className="text-2xl font-bold">75%</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
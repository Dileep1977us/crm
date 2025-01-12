"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
}

interface Task {
  id: string;
  title: string;
  status: "pending" | "completed";
  dueDate: string;
}

export default function Dashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Mock data for initial testing
  useEffect(() => {
    setCustomers([
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        status: "active",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "098-765-4321",
        status: "inactive",
      },
    ]);

    setTasks([
      {
        id: "1",
        title: "Follow up with John Doe",
        status: "pending",
        dueDate: "2024-01-20",
      },
      {
        id: "2",
        title: "Send proposal to Jane Smith",
        status: "completed",
        dueDate: "2024-01-15",
      },
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Total Customers</h2>
          <p className="text-3xl font-bold">{customers.length}</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Active Tasks</h2>
          <p className="text-3xl font-bold">
            {tasks.filter((task) => task.status === "pending").length}
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Completed Tasks</h2>
          <p className="text-3xl font-bold">
            {tasks.filter((task) => task.status === "completed").length}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Customers</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="py-2">{customer.name}</td>
                    <td className="py-2">{customer.email}</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          customer.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

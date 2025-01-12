"use client"

import { useState } from "react"
import { create } from "zustand"
import { DataTable } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CustomerDialog } from "@/components/customers/customer-dialog"
import { ColumnDef } from "@tanstack/react-table"
import { Trash2, Edit } from "lucide-react"

interface CustomerActionsProps {
  customer: Customer
}

function CustomerActions({ customer }: CustomerActionsProps) {
  const { deleteCustomer } = useCustomerStore()
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <div className="flex space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsEditOpen(true)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => deleteCustomer(customer.id)}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
      <CustomerDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={(data) => {
          useCustomerStore.getState().editCustomer(customer.id, data)
          setIsEditOpen(false)
        }}
        customer={customer}
      />
    </div>
  )
}

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive"
}

interface CustomerStore {
  customers: Customer[]
  addCustomer: (customer: Omit<Customer, "id">) => void
  editCustomer: (id: string, customer: Partial<Customer>) => void
  deleteCustomer: (id: string) => void
}

const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [],
  addCustomer: (customer) =>
    set((state) => ({
      customers: [
        ...state.customers,
        { ...customer, id: crypto.randomUUID() },
      ],
    })),
  editCustomer: (id, customer) =>
    set((state) => ({
      customers: state.customers.map((c) =>
        c.id === id ? { ...c, ...customer } : c
      ),
    })),
  deleteCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((c) => c.id !== id),
    })),
}))

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          row.original.status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CustomerActions customer={row.original} />,
  },
]

export default function CustomersPage() {
  const { customers, addCustomer } = useCustomerStore()
  const [isAddOpen, setIsAddOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customers</h1>
        <Button onClick={() => setIsAddOpen(true)}>Add Customer</Button>
      </div>

      <DataTable columns={columns} data={customers} />

      <CustomerDialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={(data) => {
          addCustomer(data)
          setIsAddOpen(false)
        }}
      />
    </div>
  )
}
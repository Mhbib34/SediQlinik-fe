"use client";

import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/sonner";
import { Appointment } from "@/types/appointment";
import { isErrorResponse } from "@/utils/error-response";
import { Listbox } from "@headlessui/react";
import { ArrowDownCircleIcon } from "lucide-react";
import { useState } from "react";

const statuses = [
  {
    value: "pending",
    label: "Terjadwal",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  {
    value: "confirmed",
    label: "Diproses",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    value: "completed",
    label: "Selesai",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  {
    value: "cancelled",
    label: "Dibatalkan",
    className: "bg-red-100 text-red-800 border-red-200",
  },
];

export default function StatusDropdown({
  appointment,
}: {
  appointment: Appointment;
}) {
  const [selected, setSelected] = useState(
    statuses.find((status) => status.value === appointment.status) ||
      statuses[0]
  );

  const handleChange = async (status: (typeof statuses)[0]) => {
    setSelected(status);

    try {
      await axiosInstance.patch(`/v1/appointments/${appointment.id}/status`, {
        status: status.value,
      });
      showSuccess("Status berhasil diubah.");
    } catch (err) {
      isErrorResponse(err, "Gagal mengubah status.");
      setSelected(
        statuses.find((s) => s.value === appointment.status) || statuses[0]
      );
    }
  };

  return (
    <div className="">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative">
          {/* Button */}
          <Listbox.Button
            className={`rounded-full px-1 py-0.5 border flex items-center gap-2 cursor-pointer ${selected.className}`}
          >
            {selected.label}
            <ArrowDownCircleIcon className="w-4 h-4" />
          </Listbox.Button>

          {/* Options */}
          <Listbox.Options className="absolute mt-1 w-full rounded-lg border bg-white shadow-lg z-10">
            {statuses.map((status) => (
              <Listbox.Option
                key={status.value}
                value={status}
                className={({ active }: { active: boolean }) =>
                  `cursor-pointer px-3 py-2 rounded ${
                    active ? "bg-gray-100" : ""
                  } ${status.className}`
                }
              >
                {status.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}

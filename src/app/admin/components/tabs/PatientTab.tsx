"use client";
import ButtonRefresh from "@/components/fragment/ButtonRefresh";
import PageLoader from "@/components/fragment/PageLoader";
import Pagination from "@/components/fragment/Paginations";
import { showSuccess } from "@/lib/sonner";
import { useAuthStore } from "@/store/auth-store";
import { Format } from "@/utils/format";
import { Mail, Phone, Plus } from "lucide-react";
import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import AddPatientModal from "../AddPatientModal";

const PatientTab = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isOpen, setIsOpen] = React.useState(false);
  const { users, loading, fetchUsers } = useAuthStore(
    useShallow((state) => ({
      users: state.users,
      loading: state.loading,
      fetchUsers: state.fetchUsers,
    }))
  );

  useEffect(() => {
    fetchUsers(currentPage);
    //eslint-disable-next-line
  }, [currentPage]);

  const refreshPatient = () => {
    fetchUsers(currentPage);
    showSuccess("Data berhasil di refresh");
  };

  const gender = (gender: string) => {
    return gender === "male" ? "Laki-laki" : "Perempuan";
  };

  const countAge = (dateOfBirth: string | Date) => {
    if (!dateOfBirth) return "-";

    let birthDate: Date | null = null;

    if (dateOfBirth instanceof Date) {
      birthDate = dateOfBirth;
    } else {
      const isoParsed = new Date(dateOfBirth);
      if (!isNaN(isoParsed.getTime())) {
        birthDate = isoParsed;
      } else {
        const match = dateOfBirth.match(/^(\d{2})[\/\-](\d{2})[\/\-](\d{4})$/);
        if (match) {
          //eslint-disable-next-line
          const [_, dd, mm, yyyy] = match;
          birthDate = new Date(`${yyyy}-${mm}-${dd}`);
        }
      }
    }

    if (!birthDate || isNaN(birthDate.getTime())) return "-";

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  if (loading) return <PageLoader />;
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Data Pasien</h2>
          <p className="text-slate-600 mt-1">Kelola informasi pasien klinik</p>
        </div>
        <div className="flex items-center space-x-3">
          <ButtonRefresh refresh={refreshPatient} />
          <button
            onClick={() => setIsOpen(true)}
            className="flex cursor-pointer items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Pasien</span>
          </button>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-separate border-spacing-x-6 border-spacing-y-3">
              <thead>
                <tr className="text-left border-b border-slate-200">
                  <th className="pb-3 text-sm font-medium text-slate-600">
                    ID
                  </th>
                  <th className="pb-3 text-sm font-medium text-slate-600">
                    Nama Lengkap
                  </th>
                  <th className="pb-3 text-sm font-medium text-slate-600">
                    Kontak
                  </th>
                  <th className="pb-3 text-sm font-medium text-slate-600">
                    Tanggal Lahir
                  </th>
                  <th className="pb-3 text-sm font-medium text-slate-600">
                    Usia
                  </th>
                  <th className="pb-3 text-sm font-medium text-slate-600">
                    Gender
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.data.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4 text-sm text-slate-600">
                      {patient.id}
                    </td>
                    <td className="py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {patient.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {patient.address}
                        </p>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-600">
                            {patient.phone}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-600">
                            {patient.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-slate-600">
                      {Format.formatDate(patient.date_of_birth!)}
                    </td>
                    <td className="py-4 text-sm text-slate-600">
                      {countAge(patient.date_of_birth!)}
                    </td>
                    <td className="py-4 text-sm text-slate-600">
                      {gender(patient.gender!)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Pagination
        currentPage={users.paging.current_page}
        totalPages={users.paging.total_pages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {isOpen && <AddPatientModal setIsOpen={setIsOpen} />}
    </div>
  );
};

export default PatientTab;

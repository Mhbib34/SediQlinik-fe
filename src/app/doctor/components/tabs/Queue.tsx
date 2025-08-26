import React, { useState, useEffect } from "react";
import Pagination from "@/components/fragment/Paginations";
import { showSuccess } from "@/lib/sonner";
import axiosInstance from "@/lib/axiosInstance";
import { isErrorResponse } from "@/utils/error-response";
import { socket } from "@/lib/socket";
import { Doctor } from "@/types/doctor";
import { QueuePage, RealtimeQueue } from "@/types/queue";
import { getWithMidnight, setWithMidnight } from "@/utils/resetTime";
import FormCompleteQueue from "../FormCompleteQueue";
import QueuePatientTable from "../QueuePatientTable";
import QueuePatientInfo from "../QueuePatientInfo";
import QueueStats from "../QueueStats";

type Props = {
  queuePage: QueuePage;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  getStatusBadge: (status: string) => React.ReactNode;
  fetchQueuePage: (page: number) => Promise<QueuePage | undefined>;
  user_id: string;
};

const Queue = ({
  queuePage,
  currentPage,
  setCurrentPage,
  getStatusBadge,
  fetchQueuePage,
  user_id,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [queues, setQueues] = useState<RealtimeQueue>({
    called_at: new Date(),
    id: "",
    next_queue: 0,
    queue_number: 0,
    patient_name: "",
  });
  const [completeForm, setCompleteForm] = useState({
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleCalledPatient = async (id: string) => {
    try {
      const res = await axiosInstance.put(`/v1/queues/${id}/call`, {
        withCredentials: true,
      });
      showSuccess(res.data.message);
      fetchQueuePage(currentPage);
    } catch (error) {
      isErrorResponse(error, "Called patient failed. Please try again.");
    }
  };
  const handleCompletedPatient = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.put(`/v1/queues/${id}/complete`, {
        notes: completeForm.notes,
        withCredentials: true,
      });
      setCompleteForm({ notes: "" });
      showSuccess(res.data.message);
      fetchQueuePage(currentPage);
      setIsOpen(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      isErrorResponse(error, "Complete patient failed. Please try again.");
    }
  };
  const handleSkipPatient = async (id: string) => {
    try {
      const res = await axiosInstance.put(`/v1/queues/${id}/skip`, {
        withCredentials: true,
      });
      showSuccess(res.data.message);
      fetchQueuePage(currentPage);
    } catch (error) {
      isErrorResponse(error, "Skip patient failed. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompleteForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const savedQueues = getWithMidnight("queues");
    if (savedQueues) {
      setQueues(savedQueues);
    }
    const fetchDoctor = async () => {
      try {
        const res = await axiosInstance.get(`/v1/doctors/${user_id}`, {
          withCredentials: true,
        });
        console.log(res.data.data);
        setDoctor(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctor();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("queue_called", (data) => {
      console.log("Queue updated (from FE):", data);
      setQueues(data);
      setWithMidnight("queues", data);
    });

    return () => {
      socket.off("queue_called");
    };
  }, []);

  // Join room ketika doctor sudah diketahui
  useEffect(() => {
    if (doctor?.id) {
      console.log("Joining room doctor_", doctor.id);
      socket.emit("join_room", { doctor_id: doctor.id });
    }
  }, [doctor]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard Antrian
            </h1>
            <p className="text-gray-600 mt-1">
              {doctor?.name} - {doctor?.specialization}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Queue Controls & Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Queue Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Kontrol Antrian</h2>

            <div className="text-center mb-6">
              <div className="text-8xl font-bold text-blue-600 mb-2">
                {queues?.queue_number}
              </div>
              <div className="text-lg text-gray-600">Nomor Saat Ini</div>
            </div>
          </div>

          {/* Current Patient */}
          {queues.patient_name && (
            <>
              <QueuePatientInfo
                queues={queues}
                setIsOpen={setIsOpen}
                handleSkipPatient={handleSkipPatient}
              />

              {isOpen && (
                <FormCompleteQueue
                  setIsOpen={setIsOpen}
                  handleInputChange={handleInputChange}
                  completeForm={completeForm}
                  handleCompletedPatient={handleCompletedPatient}
                  isLoading={isLoading}
                  queues={queues}
                />
              )}
            </>
          )}

          {/* Stats */}
          <QueueStats queuePage={queuePage} />
        </div>

        {/* Right Column - Patient Queue */}
        <QueuePatientTable
          queuePage={queuePage}
          getStatusBadge={getStatusBadge}
          handleCalledPatient={handleCalledPatient}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={queuePage.paging.total_pages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Queue;

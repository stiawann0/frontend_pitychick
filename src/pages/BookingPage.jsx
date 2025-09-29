import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const BookingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tables, setTables] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState("");
  const [bookingDateTime, setBookingDateTime] = useState("");
  const [guestNumber, setGuestNumber] = useState(1);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [isLoadingTables, setIsLoadingTables] = useState(false);

  useEffect(() => {
    if (!user) {
      alert("Silakan login terlebih dahulu untuk melakukan booking.");
      navigate("/");
    }
  }, [user, navigate]);

  // Fetch meja tiap bookingDateTime berubah
  useEffect(() => {
    const fetchTables = async () => {
      if (!bookingDateTime) {
        setTables([]);
        setSelectedTableId("");
        return;
      }

      setIsLoadingTables(true);
      try {
        const [date, time] = bookingDateTime.split("T");
        const response = await api.get("/api/tables/available", {
          params: { date, time },
        });

        setTables(response.data.data || response.data);
        setFetchError("");
        setSelectedTableId("");
      } catch (error) {
        console.error("Gagal memuat data meja", error);
        setFetchError("Gagal memuat data meja. Silakan coba refresh halaman.");
        setTables([]);
      } finally {
        setIsLoadingTables(false);
      }
    };

    fetchTables();
  }, [bookingDateTime]);

  const cancelBooking = () => {
    setSelectedTableId("");
    setBookingDateTime("");
    setGuestNumber(1);
    setNotes("");
    setErrorMsg("");
    setTables([]);
  };

  const handleSubmit = async () => {
    setErrorMsg("");

    if (!bookingDateTime || !selectedTableId) {
      setErrorMsg("Harap lengkapi semua data pemesanan.");
      return;
    }

    const now = new Date();
    const bookingDate = new Date(bookingDateTime);
    if (bookingDate < now) {
      setErrorMsg("Tanggal dan waktu booking tidak boleh di masa lalu.");
      return;
    }

    const guestNum = parseInt(guestNumber, 10);
    if (isNaN(guestNum) || guestNum < 1) {
      setErrorMsg("Jumlah tamu harus berupa angka minimal 1.");
      return;
    }

    setIsSubmitting(true);

    try {
      const [date, time] = bookingDateTime.split("T");

      const payload = {
        customer_name: user.name,
        customer_email: user.email,
        customer_phone: user.phone || "-",
        table_id: selectedTableId,
        reservation_date: date,
        reservation_time: time,
        guest_number: guestNum,
        notes: notes,
      };

      await api.post("/api/reservations", payload);
      alert("Booking berhasil!");
      cancelBooking();
      // Optional redirect misal ke halaman riwayat booking
      // navigate("/my-reservations");
    } catch (err) {
      console.error("Gagal melakukan booking", err);
      setErrorMsg("Terjadi kesalahan saat booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 relative">
      <Link
        to="/"
        className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition duration-300 z-50 flex items-center justify-center animate-bounce"
        title="Kembali ke Home"
      >
        <FaArrowCircleLeft className="text-2xl" />
      </Link>

      {fetchError && (
        <div className="mb-4 p-3 bg-red-200 text-red-800 rounded">{fetchError}</div>
      )}

      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">🪑 Reservasi Tempat</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>
              Tanggal & Waktu Booking <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              className="w-full border p-2 rounded"
              value={bookingDateTime}
              onChange={(e) => setBookingDateTime(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <div>
            <label>
              Pilih Meja <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border p-2 rounded"
              value={selectedTableId}
              onChange={(e) => setSelectedTableId(e.target.value)}
              disabled={!bookingDateTime || isLoadingTables}
            >
              <option value="">
                {isLoadingTables
                  ? "Memuat meja..."
                  : tables.length === 0
                  ? "Tidak ada meja tersedia"
                  : "-- Pilih Meja --"}
              </option>
              {tables.map((table) => (
                <option key={table.id} value={table.id}>
                  Meja {table.number} (Kapasitas: {table.capacity})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Jumlah Tamu</label>
            <input
              type="number"
              min="1"
              className="w-full border p-2 rounded"
              value={guestNumber}
              onChange={(e) => setGuestNumber(e.target.value)}
            />
          </div>

          <div>
            <label>Catatan</label>
            <textarea
              className="w-full border p-2 rounded"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {errorMsg && <div className="bg-red-100 text-red-700 p-3 rounded">{errorMsg}</div>}

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Sedang Memproses..." : "Booking Sekarang!"}
            </button>
            <button
              onClick={cancelBooking}
              disabled={isSubmitting}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Batalkan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;

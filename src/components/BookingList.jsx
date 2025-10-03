import React, { useEffect, useState } from 'react';
import api from '../api/axios'; // GANTI - gunakan axios instance yang sudah dikonfigurasi

const BookingList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservations = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/api/my-reservations', { // GANTI
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReservations(response.data.data);
    } catch (err) {
      console.error(err);
      setError('Gagal memuat data reservasi. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) return <p className="text-center py-4">Memuat data reservasi...</p>;
  if (error) return <p className="text-center py-4 text-red-600">{error}</p>;

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Daftar Reservasi</h2>
      {reservations.length === 0 ? (
        <p className="text-gray-500 text-center">Tidak ada reservasi.</p>
      ) : (
        reservations.map((res) => (
          <div
            key={res.id}
            className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-semibold text-lg">{res.customer_name} ({res.customer_email})</h4>
            <p className="text-gray-600 mt-2">📞 {res.customer_phone}</p>
            <p className="text-gray-600">🕒 {new Date(res.reservation_time).toLocaleString('id-ID')}</p>
            <p className="text-gray-600">👥 Jumlah Tamu: {res.guest_number}</p>
            <p className="mt-2">
              Status: <strong className={
                res.status === 'confirmed' ? 'text-green-600' : 
                res.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
              }>{res.status}</strong>
            </p>
            {res.table && (
              <p className="text-gray-600">
                Meja: {res.table.number} (Kapasitas: {res.table.capacity}, Status Meja: {res.table.status})
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BookingList;
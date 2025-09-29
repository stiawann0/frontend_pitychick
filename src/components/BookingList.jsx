import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservations = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token'); // pastikan token sudah disimpan saat login
      const response = await axios.get('http://localhost:8000/api/my-reservations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReservations(response.data.data); // sesuaikan dengan struktur response-mu
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

  if (loading) return <p>Memuat data reservasi...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Daftar Reservasi</h2>
      {reservations.length === 0 ? (
        <p>Tidak ada reservasi.</p>
      ) : (
        reservations.map((res) => (
          <div
            key={res.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '12px',
              background: '#f9f9f9',
            }}
          >
            <h4>{res.customer_name} ({res.customer_email})</h4>
            <p>📞 {res.customer_phone}</p>
            <p>🕒 {new Date(res.reservation_time).toLocaleString()}</p>
            <p>👥 Jumlah Tamu: {res.guest_number}</p>
            <p>Status: <strong>{res.status}</strong></p>
            {res.table && (
              <p>Meja: {res.table.number} (Kapasitas: {res.table.capacity}, Status Meja: {res.table.status})</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BookingList;

import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../FirebaseConfig';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const reservasCollection = collection(db, 'reservations');
        const snapshot = await getDocs(reservasCollection);
        const reservasData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReservas(reservasData);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      }
    };

    obtenerReservas();
  }, []);

  const handleAceptadaChange = async (id, aceptada) => {
    try {
      const reservaRef = doc(db, 'reservations', id);
      await updateDoc(reservaRef, { aceptada: !aceptada });
      setReservas(prevReservas =>
        prevReservas.map(reserva => (reserva.id === id ? { ...reserva, aceptada: !aceptada } : reserva))
      );
    } catch (error) {
      console.error('Error al cambiar el estado de la reserva:', error);
    }
  };

  const handleEliminarReserva = async (id) => {
    try {
      const reservaRef = doc(db, 'reservations', id);
      await deleteDoc(reservaRef);
      setReservas(prevReservas => prevReservas.filter(reserva => reserva.id !== id));
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
    }
  };

  return (
    <div className='reservas-section'>
      <h2>Reservas</h2>
      <ul>
        {reservas.map(reserva => (
          <li key={reserva.id} className='cuadro'>
            <div>{`Nombre: ${reserva.firstName} ${reserva.lastName}`}</div>
            <div>{`Fecha: ${reserva.date}`}</div>
            <div>{`Hora: ${reserva.hour}`}</div>
            <div>{`Comensales: ${reserva.comensales}`}</div>
            <div>{`Aceptada: ${reserva.aceptada ? 'Sí' : 'No'}`}</div>
            <button onClick={() => handleAceptadaChange(reserva.id, reserva.aceptada)}>
              Aceptar
            </button>
            <button onClick={() => handleEliminarReserva(reserva.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservas;

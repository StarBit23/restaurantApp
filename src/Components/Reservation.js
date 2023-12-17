import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Reservation = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    date: '',
    hour: '',
    comensales: 1,
  });

  const [mesasDisponibles, setMesasDisponibles] = useState(8);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchMesasDisponibles = async () => {
      const reservasCollection = collection(db, 'reservations');
      const reservasQuery = query(
        reservasCollection,
        where('date', '==', formData.date)
      );
      const reservasSnapshot = await getDocs(reservasQuery);
      let totalComensales = 0;

      reservasSnapshot.forEach((reserva) => {
        totalComensales += reserva.data().comensales;
      });

      setMesasDisponibles(7 - totalComensales);
    };

    fetchMesasDisponibles();
  }, [formData.date]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.date || !formData.hour || formData.hour === "") {
      setSnackbarMessage('Por favor, completa todos los campos.');
      setSnackbarOpen(true);
      return;
    }

    try {
      const reservasCollection = collection(db, 'reservations');

      if (mesasDisponibles === -54) {
        setSnackbarMessage('No hay mesas disponibles para esa fecha. Por favor, elige otra fecha.');
        setSnackbarOpen(true);
        return;
      }

      if (mesasDisponibles < formData.comensales) {
        setSnackbarMessage(`No hay suficientes mesas para ${formData.comensales} comensales. Por favor, reduce la cantidad.`);
        setSnackbarOpen(true);
        return;
      }

      const docRef = await addDoc(reservasCollection, formData);
      console.log('Reserva guardada con ID:', docRef.id);

      setFormData({
        firstName: '',
        lastName: '',
        date: '',
        hour: '',
        comensales: 1,
      });

      setSnackbarMessage('¡Reserva realizada correctamente!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
      setSnackbarMessage('Error al realizar la reserva. Por favor, intenta de nuevo.');
      setSnackbarOpen(true);
    }
  };

  return (
    <div>
      <h2>Reserva cuanto antes</h2>
      <form onSubmit={handleSubmit} className='cuadro'>
        <label>
          Nombre: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            name="firstName"
            placeholder='Pon tu nombre'
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Apellidos: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            name="lastName"
            placeholder='Pon tus apellidos'
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Fecha: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
        <br/>
        <label>
        Hora: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <select name="hour" value={formData.hour} onChange={handleChange}>
            <option value="">Selecciona una hora</option>
            <option value="20:00">20:00</option>
            <option value="21:00">21:00</option>
            <option value="22:00">22:00</option>
          </select>
        </label>
        <br />
        <label>
        Comensales: &nbsp;&nbsp;
          <input
            type="number"
            name="comensales"
            value={formData.comensales}
            onChange={handleChange}
            min="1"
          />
        </label>
        <br />
        <button type="submit">Reservar</button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />

      {mesasDisponibles === -54 && (
        <p>No hay mesas disponibles para esa fecha. Por favor, elige otra fecha.</p>
      )}
      {mesasDisponibles > 0 && (
        <p>Quedan {mesasDisponibles} mesas disponibles para esa fecha.</p>
      )}
    </div>
  );
};

export default Reservation;

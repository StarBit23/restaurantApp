# Implementación


---


## <span style="color:#f5de19">FirebaseConfig.js</span>

Preparo mi <span style="color:#f5de19">FirebaseConfig.js</span> donde introduzco mis datos de firebase para inicializarlo y pasar un AuthProvider de github para su uso:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyC0iR2c4apKBxOH7COpRlTH_N5x_LiSRto",
    authDomain: "fctrestaurantapp.firebaseapp.com",
    projectId: "fctrestaurantapp",
    storageBucket: "fctrestaurantapp.appspot.com",
    messagingSenderId: "533021490373",
    appId: "1:533021490373:web:aa0a312352689f895b04ac"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GithubAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
```


---

## <span style="color:#f5de19">App.js</span>

En mi <span style="color:#f5de19">App.js</span> creo un método para gestionar el logeo usando GitHub, asi como el deslogeo:

```javascript
const [user, setUser] = useState(null);

  const handleGithubLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
```

La parte que muestro mediante html la decido dependiendo si <span style="color:deepskyblue">user</span> existe, es decir, si alguien se ha logeado o no:
```javascript
{user ? (
          <>
            <Router>
              <div>
                <div className='background'/>
                <Sidebar handleLogout={handleLogout} />
                <div className="main-content">
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/aboutUs" element={<AboutUs />} />
                    <Route path="/login" element={<Navigate to="/home" />} />
                    <Route path="/reservation" element={<Reservation />} />
                    <Route path="/reservas" element={<Reservas />} />
                  </Routes>
                </div>
              </div>
            </Router>
          </>
        ) : (
          <Router>
            <div>
             <div className='background'/>
              <Routes>
                <Route
                  path="/"
                  element={<Login handleGithubLogin={handleGithubLogin} />}
                />
              </Routes>
            </div>
          </Router>
        )}
```


---


Ahora paso a mostrar las distintas rutas y sus funciones, unas más simples y otras no tanto.

## <span style="color:#f5de19">Home.js</span>


Aquí solo tengo un texto de bienvenida, al cual le he aplicado bastantes animaciones. Un vistazo a <span style="color:deepskyblue">Home.css</span>:
```css
.animate-charcter
{
  text-transform: uppercase;
  background-image: linear-gradient(
    -225deg,
    #231557 0%,
    #9b16a0 29%,
    #ff1361 67%,
    #fff800 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  animation: textclip 2s linear infinite;
  display: inline-block;
      font-size: 170px;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}
```


---


## <span style="color:#f5de19">AboutUs.js</span>


Aquí pongo información breve cuando se pasa el cursor por las imágenes mediante una animación en javascript y css:


```javascript
const handleMouseEnter = (imageId) => {
    const image = document.getElementById(`image${imageId}`);
    const text = document.getElementById(`text${imageId}`);
    text.style.animation = 'slideIn 0.5s forwards';
    image.style.transform = 'translateY(50px)';
  };

  const handleMouseLeave = (imageId) => {
    const image = document.getElementById(`image${imageId}`);
    const text = document.getElementById(`text${imageId}`);
    text.style.animation = 'slideOut 0.5s forwards';
    image.style.transform = 'translateY(0)';
  };

  return (
    <div className="about-us-container">
      <div className="image-container">
        <img
          id="image1"
          src={image1}
          alt="Image 1"
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={() => handleMouseLeave(1)}
        />
        <div id="text1" className="image-text">
          Presentamos comida única y variada para todos los gustos
        </div>
      </div>

      <div className="image-container">
        <img
          id="image2"
          src={image2}
          alt="Image 2"
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={() => handleMouseLeave(2)}
        />
        <div id="text2" className="image-text">
          Contamos con personal experimentado en el mundo culinario
        </div>
      </div>

      <div className="image-container">
        <img
          id="image3"
          src={image3}
          alt="Image 3"
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={() => handleMouseLeave(3)}
        />
        <div id="text3" className="image-text">
          Desde septiembre creando experiencias
        </div>
      </div>
    </div>
  );
```

```css
@keyframes slideIn {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(50px);
      opacity: 0;
    }
  }
```


---


## <span style="color:#f5de19">Reservation.js</span>


Aquí gestiono las nuevas reservas que se crean y envían al servidor. Seguramente el componente más importante de mi aplicación.


Primero conecto con mi firebase para saber dónde voy a enviar los datos:
```javascript
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
```


Tras esto falta mostrar el formulario y enviar los datos al valor correspondiente de la reserva:
```javascript
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
```

Por último pero no menos importante manejo si el cliente no ha introducido ningún dato para qeu se realicen las reservas correctamente. Aquí un pequeño ejemplo usando snackbars de mui:
```javascript
if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.date || !formData.hour || formData.hour === "") {
      setSnackbarMessage('Por favor, completa todos los campos.');
      setSnackbarOpen(true);
      return;
    }
```


---


## <span style="color:#f5de19">Reservas.js</span>


Esta parte de la aplicación está pensada para los trabajadores, donde pueden gestionar las reservas hechas, aceptarlas y eliminarlas. La aplicación ya tiene memorizada las cuentas de github que son del personal (actualemente la mía), asi que es tan simple como iniciar sesión:


Primero conectar con firebase para recoger la colección a ver:
```javascript
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
```


Luego simplemente mostramos los datos recogidos con un map:
```javascript
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
```

Por último hago un método para aceptar las reservas y otro para eliminarlas:
```javascript
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
```


---


## <span style="color:#f5de19">Login.js</span>


Este js sirve para mostrar la parte de iniciar sesión si aún no hay un usuario logeado, así como un menú para ver y descargar en otra pestaña y una ubicación de google maps del "restaurante":


```javascript
const Login = ({ handleGithubLogin }) => {
  return (
    <div className="login-container">
      <div className="menu-image">
        <a href="https://atraconjaen.com/wp-content/uploads/2020/05/CARTA-ATRACON-JAEN.pdf" target="_blank">
          <img src={require('../Images/menu.jpg')} alt="Menú"/>
        </a>
      </div>
      <div className='cuadro'>
      <h2>Inicia sesión para reservar mesa</h2>
      <button className="login-button" onClick={handleGithubLogin}>
        Sign In With Github
      </button>
      </div>
      <div className='menu-image2'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.3523682916593!2d-3.793725123669141!3d37.78178111175565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6dd705afbb8f67%3A0xef4e142fe5f1cbb0!2sRestaurante%20Atrac%C3%B3n%20Ja%C3%A9n!5e0!3m2!1ses!2ses!4v1702750064322!5m2!1ses!2ses" width="600" height="400" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>      </div>
    </div>
  );
};
```


---


## <span style="color:#f5de19">Sidebar.js</span>


Para terminar muestro como he creado el menú lateral. EL apartado de <span style="color:#f5de19">reservas</span> contiene mi id de github para saber si me lo muestra o no:


```javascript
const Sidebar = ({ handleLogout, user }) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/home" activeClassName="active">
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/aboutUs" activeClassName="active">
            Sobre nosotros
          </NavLink>
        </li>
        <li>
          <NavLink to="/reservation" activeClassName="active">
            Reservar mesa
          </NavLink>
        </li>
        <li>
        {user && user.uid === 'JUcIhVZk9wZklNPZKdESdUjH1oj2' && (
          <li>
            <NavLink to="/reservas" activeClassName="active">
              Reservas
            </NavLink>
          </li>
        )}
        </li>
        <li>
          <a href="/" onClick={handleLogout}>
            Cerrar sesión
          </a>
        </li>
      </ul>
    </nav>
  );
};
```
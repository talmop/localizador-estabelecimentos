import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import Login from './Login';
import AvaliacaoForm from './AvaliacaoForm';

// Configuração dos ícones
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function App() {
  const [user, setUser] = useState(null);
  const [position, setPosition] = useState([-23.5505, -46.6333]);
  const [showForm, setShowForm] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        () => console.log('Erro ao obter localização')
      );
    }
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Mapa Interativo</h1>
        <button onClick={() => setUser(null)}>Sair</button>
      </header>
      
      <div className="map-wrapper">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />
          <Marker position={position}>
            <Popup>
              <button onClick={() => {
                setSelectedLocation({
                  nome: "Local Atual", 
                  position: position
                });
                setShowForm(true);
              }}>
                Avaliar este local
              </button>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {showForm && (
        <AvaliacaoForm 
          local={selectedLocation}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;
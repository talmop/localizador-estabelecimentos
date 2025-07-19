 import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import AvaliacaoForm from './AvaliacaoForm';
import L from 'leaflet';

// Corrige o ícone padrão do Leaflet no React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default function App() {
  const [avaliar, setAvaliar] = useState(false);
  const [localSelecionado, setLocalSelecionado] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  // Memoriza os marcadores para não renderizar novamente toda hora
  const marcadores = useMemo(() => (
    <Marker position={[-23.55052, -46.633308]}>
      <Popup>
        Estabelecimento Exemplo <br />
        <button onClick={() => {
          setAvaliar(true);
          setLocalSelecionado({ nome: 'Estabelecimento Exemplo', lat: -23.55052, lng: -46.633308 });
        }}>Avaliar</button>
      </Popup>
    </Marker>
  ), []);

  const fecharFormulario = () => {
    setAvaliar(false);
    setLocalSelecionado(null);
  };

  return (
    <div className="App">
      <h1>Mapa de Estabelecimentos</h1>

      {/* Mostra mensagem enquanto mapa não carrega */}
      {!mapReady && <p>Carregando mapa...</p>}

      <MapContainer
        center={[-23.55052, -46.633308]}
        zoom={13}
        className="leaflet-container"
        preferCanvas={true}              // MELHORIA 1: canvas para melhor performance
        whenReady={() => setMapReady(true)} // MELHORIA 3: seta quando mapa estiver pronto
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* MELHORIA 2: renderiza marcadores memorizados */}
        {marcadores}
      </MapContainer>

      {avaliar && localSelecionado && (
        <AvaliacaoForm local={localSelecionado} onClose={fecharFormulario} />
      )}
    </div>
  );
}
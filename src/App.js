// Importa o React para utilizar JSX e componentes funcionais
import React from 'react';
// Importa o CSS do App (estilização personalizada)
import './App.css';
// Importa os componentes necessários do React Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// Importa o CSS padrão do Leaflet (essencial para exibir o mapa corretamente)
import 'leaflet/dist/leaflet.css';
// Importa o Leaflet diretamente para configurar os ícones
import L from 'leaflet';

// Importa os ícones padrão do Leaflet manualmente
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Corrige um problema comum onde os ícones do Leaflet não aparecem corretamente no React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Função principal do componente App
function App() {
  // Lista de estabelecimentos com nome e coordenadas (latitude e longitude)
  const estabelecimentos = [
    { nome: 'Padaria do João', lat: -23.55052, lng: -46.633308 },
    { nome: 'Mercado Central', lat: -23.551, lng: -46.632 },
  ];

  return (
    <div className="App">
      {/* Título da aplicação */}
      <h1>Localizador de Estabelecimentos</h1>

      {/* Container do mapa com centro e zoom definidos, e tamanho configurado via CSS inline */}
      <MapContainer
        center={[-23.55052, -46.633308]}
        zoom={15}
        style={{ height: "500px", width: "100%" }}
      >
        {/* Camada do mapa (OpenStreetMap) */}
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Mapeia os estabelecimentos para adicionar marcadores no mapa */}
        {estabelecimentos.map((estab, index) => (
          <Marker key={index} position={[estab.lat, estab.lng]}>
            {/* Texto que aparece ao clicar no marcador */}
            <Popup>{estab.nome}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

// Exporta o componente para ser usado em outros arquivos (como index.js)
export default App;

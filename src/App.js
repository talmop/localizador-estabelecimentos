import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AvaliacaoForm from "./AvaliacaoForm";
import L from "leaflet";
import Login from "./Login";  // seu componente Login local (simples)

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function App() {
  const [avaliar, setAvaliar] = useState(false);
  const [localSelecionado, setLocalSelecionado] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  // Estado para usuário local (login simples)
  const [usuario, setUsuario] = useState(() => {
    // Verifica se usuário está salvo no localStorage para persistência simples
    return localStorage.getItem('usuarioLogado') || null;
  });

  // Salva usuário no localStorage para manter login após refresh
  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuarioLogado', usuario);
    } else {
      localStorage.removeItem('usuarioLogado');
    }
  }, [usuario]);

  const marcadores = useMemo(() => (
    <Marker position={[-23.55052, -46.633308]}>
      <Popup>
        Estabelecimento Exemplo <br />
        <button onClick={() => {
          setAvaliar(true);
          setLocalSelecionado({ nome: "Estabelecimento Exemplo", lat: -23.55052, lng: -46.633308 });
        }}>Avaliar</button>
      </Popup>
    </Marker>
  ), []);

  const fecharFormulario = () => {
    setAvaliar(false);
    setLocalSelecionado(null);
  };

  // Se não está logado, mostra a tela de login simples
  if (!usuario) {
    return <Login onLogin={setUsuario} />;
  }

  return (
    <div className="App">
      <h1>Mapa de Estabelecimentos</h1>
      <p>Bem-vindo, {usuario}! <button onClick={() => setUsuario(null)}>Sair</button></p>

      {!mapReady && <p>Carregando mapa...</p>}

      <MapContainer
        center={[-23.55052, -46.633308]}
        zoom={13}
        className="leaflet-container"
        preferCanvas={true}
        whenReady={() => setMapReady(true)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {marcadores}
      </MapContainer>

      {avaliar && localSelecionado && (
        <AvaliacaoForm local={localSelecionado} onClose={fecharFormulario} />
      )}
    </div>
  );
}

import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [usuarioInput, setUsuarioInput] = useState("");
  const [senhaInput, setSenhaInput] = useState("");
  const [erro, setErro] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login simples fixo — ajuste como quiser
    if (usuarioInput === "admin" && senhaInput === "1234") {
      onLogin(usuarioInput);
    } else {
      setErro("Usuário ou senha incorretos");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: "auto", padding: 20 }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={usuarioInput}
        onChange={(e) => setUsuarioInput(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senhaInput}
        onChange={(e) => setSenhaInput(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <button type="submit" style={{ width: "100%", padding: 8 }}>Entrar</button>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </form>
  );
}

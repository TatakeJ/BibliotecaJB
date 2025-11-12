import React from "react";
import { Link } from "react-router-dom";

export default function ModuleNav({ items }) {
  const defaultItems = [
    { to: "/libros", label: "Libros", emoji: "📘" },
    { to: "/catalogo", label: "Catálogo", emoji: "📗" },
    { to: "/prestamos", label: "Préstamos", emoji: "📖" },
    { to: "/usuarios", label: "Usuarios", emoji: "👤" }
  ];

  const list = items ?? defaultItems;

  return (
    <div style={{ marginTop: 20 }}>
      {list.map((it) => (
        <Link key={it.to} to={it.to}>
          <button style={{ margin: "10px", padding: "10px 20px" }}>
            {it.emoji} {it.label}
          </button>
        </Link>
      ))}
    </div>
  );
}
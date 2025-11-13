import React from "react";
import { FiBook } from "react-icons/fi";
import { GrCatalog } from "react-icons/gr";
import { CiViewList, CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function ModuleNav({ items }) {
  const defaultItems = [
    { to: "/usuarios", label: "Usuarios", emoji: <CiUser /> },
    { to: "/prestamos", label: "Préstamos", emoji: <CiViewList /> },
    { to: "/libros", label: "Libros", emoji: <FiBook /> },
    { to: "/categorias", label: "Categorías", emoji: <GrCatalog /> },
    { to: "/generos", label: "Géneros", emoji: <CiViewList /> },
    { to: "/autores", label: "Autores", emoji: <FiBook /> },
    { to: "/editoriales", label: "Editoriales", emoji: <CiUser /> }
  ];

  const list = items ?? defaultItems;

  return (
    <>
      {list.map((it) => (
          <div className="col">
            <Link key={it.to} to={it.to}>
              <button type="button" className="btn btn-outline-secondary w-100 h-100">
                {it.emoji} {it.label}
              </button>
            </Link>
          </div>
      ))}
    </>
  );
}

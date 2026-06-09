import { Link } from "react-router-dom";
import { useRef } from "react";

const menuItems = [
  { to: "/", label: "Home" },
  { to: "/cursos", label: "Cursos" },
  { to: "/categorias", label: "Categorias" },
  { to: "/aulas-modulos", label: "Aulas e modulos" },
  { to: "/trilhas", label: "Trilhas" },
  { to: "/usuarios", label: "Usuarios" },
  { to: "/matriculas", label: "Matriculas" },
  { to: "/progresso", label: "Progresso" },
  { to: "/avaliacoes", label: "Avaliacoes" },
  { to: "/financeiro", label: "Financeiro" },
];

export const Nav = () => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeSidebar = () => {
    closeButtonRef.current?.click();
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mainSidebar"
            aria-controls="mainSidebar"
            aria-label="Abrir menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <aside
        className="offcanvas offcanvas-start text-bg-dark"
        tabIndex={-1}
        id="mainSidebar"
        aria-labelledby="mainSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mainSidebarLabel">
            Plataforma de cursos
          </h5>
          <button
            ref={closeButtonRef}
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Fechar menu"
          ></button>
        </div>

        <div className="offcanvas-body">
          <ul className="nav flex-column">
            {menuItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <Link className="nav-link text-white" to={item.to} onClick={closeSidebar}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

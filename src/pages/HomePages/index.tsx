export const HomePages = () => {
  const indicadores = [
    { titulo: "Cursos", valor: 0 },
    { titulo: "Trilhas", valor: 0 },
    { titulo: "Horas de conteúdo", valor: 0 },
  ];

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h1 className="h3 mb-4 text-start">Visão geral</h1>
              <div className="row g-3">
                {indicadores.map((item) => (
                  <div key={item.titulo} className="col-12 col-md-4">
                    <div className="border rounded p-3 h-100 text-start">
                      <p className="mb-1 fw-semibold">{item.titulo}</p>
                      <h2 className="h4 mb-0">{item.valor}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

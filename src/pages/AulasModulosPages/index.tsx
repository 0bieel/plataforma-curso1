import { useEffect, useState } from "react";
import { aulaModuloSchema, type IAulaModulo } from "../../models/aula-modulo.model";
import { aulasModulosService } from "../../services/aula-modulo.service";
import { getOptionLabel, getOptions, hydrateOptionCache } from "../../services/options.service";

type TipoCadastro = "modulo" | "aula";

const itemInicial: IAulaModulo = { id: "", tipo: "modulo", curso: "", modulo: "", aula: "", conteudo: "" };

const normalize = (value: string) => value.trim().replace(/\s+/g, " ").toLowerCase();

const getCursoLabel = (cursoId: string) => getOptionLabel("cursos", cursoId, "titulo");

const getModuloLabel = (items: IAulaModulo[], moduloId: string) =>
  items.find((item) => item.id === moduloId)?.modulo ?? "";

const getCursoDoModulo = (items: IAulaModulo[], moduloId: string) =>
  items.find((item) => item.id === moduloId)?.curso ?? "";

export const AulasModulosPages = () => {
  const [tipoAtivo, setTipoAtivo] = useState<TipoCadastro>("modulo");
  const [items, setItems] = useState<IAulaModulo[]>([]);
  const [formItem, setFormItem] = useState<IAulaModulo>(itemInicial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const carregarItems = async () => {
    await hydrateOptionCache();
    setItems(await aulasModulosService.findAll());
  };

  useEffect(() => {
    carregarItems();
  }, []);

  const modulos = items.filter((item) => item.tipo === "modulo");
  const aulas = items.filter((item) => item.tipo === "aula");
  const cursosOptions = getOptions("cursos", "titulo");
  const moduloOptions = modulos.map((modulo) => ({
    value: modulo.id ?? "",
    label: `${modulo.modulo} - ${getCursoLabel(modulo.curso)}`,
  }));

  const limparFormulario = (tipo: TipoCadastro = tipoAtivo) => {
    setFormItem({ ...itemInicial, tipo });
    setErrors({});
  };

  const alterarTipo = (tipo: TipoCadastro) => {
    setTipoAtivo(tipo);
    limparFormulario(tipo);
  };

  const atualizarCampo = (name: keyof IAulaModulo, value: string) => {
    setFormItem((itemAtual) => ({ ...itemAtual, [name]: value }));
  };

  const prepararItem = (item: IAulaModulo) =>
    item.tipo === "aula"
      ? { ...item, curso: getCursoDoModulo(items, item.modulo) }
      : { ...item, aula: "", conteudo: "" };

  const validarItem = (item: IAulaModulo) => {
    const result = aulaModuloSchema.safeParse(item);
    const errosFormatados: Record<string, string> = {};

    if (!result.success) {
      result.error.issues.forEach((error) => {
        if (error.path[0]) {
          errosFormatados[error.path[0] as string] = error.message;
        }
      });
    }

    const nome = item.tipo === "aula" ? item.aula : item.modulo;
    const duplicado = items.some((savedItem) => {
      const nomeSalvo = savedItem.tipo === "aula" ? savedItem.aula : savedItem.modulo;

      return (
        savedItem.id !== item.id &&
        savedItem.tipo === item.tipo &&
        savedItem.curso === item.curso &&
        normalize(nomeSalvo) === normalize(nome)
      );
    });

    if (duplicado) {
      errosFormatados[item.tipo === "aula" ? "aula" : "modulo"] =
        item.tipo === "aula"
          ? "Ja existe uma aula com este nome neste curso"
          : "Ja existe um modulo com este nome neste curso";
    }

    setErrors(errosFormatados);
    return Object.keys(errosFormatados).length === 0 ? result.data : null;
  };

  const salvarItem = async () => {
    const itemPreparado = prepararItem(formItem);
    const itemValidado = validarItem(itemPreparado);

    if (!itemValidado) {
      return;
    }

    if (itemValidado.id) {
      const itemAtualizado = await aulasModulosService.update(itemValidado.id, itemValidado);
      const itemsAtualizados = items.map((item) => {
        if (item.id === itemAtualizado.id) {
          return itemAtualizado;
        }

        if (itemAtualizado.tipo === "modulo" && item.modulo === itemAtualizado.id) {
          return { ...item, curso: itemAtualizado.curso };
        }

        return item;
      });

      await Promise.all(
        itemsAtualizados
          .filter((item) => item.id && item.modulo === itemAtualizado.id)
          .map((item) => aulasModulosService.update(item.id!, item)),
      );
      setItems(itemsAtualizados);
    } else {
      const { id, ...dadosNovoItem } = itemValidado;
      void id;
      const itemCriado = await aulasModulosService.create(dadosNovoItem);
      setItems((itemsAtuais) => [...itemsAtuais, itemCriado]);
    }

    limparFormulario(itemValidado.tipo as TipoCadastro);
  };

  const editarItem = (item: IAulaModulo) => {
    const tipo = item.tipo as TipoCadastro;
    setTipoAtivo(tipo);
    setFormItem(item);
    setErrors({});
  };

  const excluirItem = async (item: IAulaModulo) => {
    if (!item.id) {
      return;
    }

    if (item.tipo === "modulo") {
      const proximosItems = items.filter((savedItem) => savedItem.id !== item.id && savedItem.modulo !== item.id);
      await Promise.all(
        items
          .filter((savedItem) => savedItem.id === item.id || savedItem.modulo === item.id)
          .map((savedItem) => aulasModulosService.delete(savedItem.id!)),
      );
      setItems(proximosItems);
      limparFormulario("modulo");
      return;
    }

    await aulasModulosService.delete(item.id);
    setItems((itemsAtuais) => itemsAtuais.filter((savedItem) => savedItem.id !== item.id));
    limparFormulario("aula");
  };

  const itensVisiveis = tipoAtivo === "modulo" ? modulos : aulas;
  const tituloFormulario = formItem.id ? "Editar" : "Novo";

  return (
    <>
      <div className="row m-4 border-bottom">
        <div className="col-12 d-flex justify-content-between align-items-center gap-3 flex-wrap">
          <h4 className="mb-2">Aulas e modulos</h4>
          <div className="btn-group mb-2" role="group" aria-label="Tipo de cadastro">
            <button
              className={`btn btn-${tipoAtivo === "modulo" ? "primary" : "outline-primary"}`}
              type="button"
              onClick={() => alterarTipo("modulo")}
            >
              Modulos
            </button>
            <button
              className={`btn btn-${tipoAtivo === "aula" ? "primary" : "outline-primary"}`}
              type="button"
              onClick={() => alterarTipo("aula")}
            >
              Aulas
            </button>
          </div>
        </div>
      </div>

      <div className="container row m-4 text-start">
        <div className="col-12 col-lg-5 mb-4">
          <div className="card shadow">
            <div className="card-body bg-light">
              <h5 className="card-title">
                {tituloFormulario} {tipoAtivo === "modulo" ? "modulo" : "aula"}
              </h5>
              <hr />

              {tipoAtivo === "modulo" ? (
                <>
                  <div className="mb-3">
                    <label htmlFor="curso-modulo" className="form-label">
                      Curso
                    </label>
                    <select
                      id="curso-modulo"
                      className={`form-select ${errors.curso ? "is-invalid" : ""}`}
                      value={formItem.curso}
                      onChange={(event) => atualizarCampo("curso", event.target.value)}
                    >
                      <option value="">Selecione</option>
                      {cursosOptions.map((curso) => (
                        <option value={curso.value} key={curso.value}>
                          {curso.label}
                        </option>
                      ))}
                    </select>
                    {errors.curso && <div className="invalid-feedback d-block">{errors.curso}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="nome-modulo" className="form-label">
                      Modulo
                    </label>
                    <input
                      id="nome-modulo"
                      className={`form-control ${errors.modulo ? "is-invalid" : ""}`}
                      value={formItem.modulo}
                      placeholder="Digite o modulo"
                      onChange={(event) => atualizarCampo("modulo", event.target.value)}
                    />
                    {errors.modulo && <div className="invalid-feedback d-block">{errors.modulo}</div>}
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <label htmlFor="modulo-aula" className="form-label">
                      Modulo
                    </label>
                    <select
                      id="modulo-aula"
                      className={`form-select ${errors.modulo ? "is-invalid" : ""}`}
                      value={formItem.modulo}
                      onChange={(event) => atualizarCampo("modulo", event.target.value)}
                    >
                      <option value="">Selecione</option>
                      {moduloOptions.map((modulo) => (
                        <option value={modulo.value} key={modulo.value}>
                          {modulo.label}
                        </option>
                      ))}
                    </select>
                    {errors.modulo && <div className="invalid-feedback d-block">{errors.modulo}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="nome-aula" className="form-label">
                      Aula
                    </label>
                    <input
                      id="nome-aula"
                      className={`form-control ${errors.aula ? "is-invalid" : ""}`}
                      value={formItem.aula}
                      placeholder="Digite a aula"
                      onChange={(event) => atualizarCampo("aula", event.target.value)}
                    />
                    {errors.aula && <div className="invalid-feedback d-block">{errors.aula}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="conteudo-aula" className="form-label">
                      Conteudo
                    </label>
                    <textarea
                      id="conteudo-aula"
                      className="form-control"
                      rows={3}
                      value={formItem.conteudo}
                      onChange={(event) => atualizarCampo("conteudo", event.target.value)}
                    ></textarea>
                  </div>
                </>
              )}
            </div>
            <div className="card-footer d-flex justify-content-end gap-2">
              <button className="btn btn-secondary" type="button" onClick={() => limparFormulario()}>
                Cancelar
              </button>
              <button className={`btn btn-${formItem.id ? "warning" : "primary"}`} type="button" onClick={salvarItem}>
                {formItem.id ? "Atualizar" : "Salvar"}
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                {tipoAtivo === "modulo" ? (
                  <>
                    <th>MODULO</th>
                    <th>CURSO</th>
                    <th>AULAS</th>
                  </>
                ) : (
                  <>
                    <th>AULA</th>
                    <th>MODULO</th>
                    <th>CURSO</th>
                  </>
                )}
                <th>ACOES</th>
              </tr>
            </thead>
            <tbody>
              {itensVisiveis.map((item) => (
                <tr key={item.id}>
                  {tipoAtivo === "modulo" ? (
                    <>
                      <td>{item.modulo}</td>
                      <td>{getCursoLabel(item.curso)}</td>
                      <td>{aulas.filter((aula) => aula.modulo === item.id).length}</td>
                    </>
                  ) : (
                    <>
                      <td>{item.aula}</td>
                      <td>{getModuloLabel(items, item.modulo)}</td>
                      <td>{getCursoLabel(getCursoDoModulo(items, item.modulo) || item.curso)}</td>
                    </>
                  )}
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-warning btn-sm" type="button" onClick={() => editarItem(item)}>
                        Editar
                      </button>
                      <button className="btn btn-danger btn-sm" type="button" onClick={() => excluirItem(item)}>
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {itensVisiveis.length === 0 && (
                <tr>
                  <td className="text-muted text-center" colSpan={4}>
                    Nenhum registro cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

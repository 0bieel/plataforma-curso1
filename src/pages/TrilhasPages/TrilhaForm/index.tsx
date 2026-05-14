import { Button } from '../../../components/Button';

export const TrilhaForm = () => {
    return (
        <div>
            <div className="mb-3">
                <label htmlFor="titulo" className="form-label">
                    Título
                </label>
                <input
                    type="texto"
                    className="form-control"
                    id="titulo"
                    placeholder="Digite o título da trilha"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="descricao" className="form-label">
                    Descrição
                </label>
                <textarea
                    className="form-control"
                    id="descricao"
                    rows={4}
                ></textarea>
            </div>

            <Button type="button" value="Salvar" variant="primary" onClick={() => undefined} />
        </div>
    );
};

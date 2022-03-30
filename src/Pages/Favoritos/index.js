import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./favoritos.css";
import {toast} from "react-toastify";

const Favoritos = () => {
	//buscar os filmes salvos no localStorage
	const [filmes, setFilmes] = useState([]);

	useEffect(() => {
		const minhaLista = localStorage.getItem("filmes");
		setFilmes(JSON.parse(minhaLista) || []);
	}, []);

	function handleDelete(id) {
		//percorre todo o array e retorna todos os filmes salvos menos o clicado
		let filtroFilmes = filmes.filter((item) => {
			return item.id !== id;
		});

		setFilmes(filtroFilmes);
		localStorage.setItem("filmes", JSON.stringify(filmes));
		toast.success("Filme excluido com sucesso!");
	}

	return (
		<div id="meus-filmes">
			<h1>Meus filmes</h1>

			{filmes.length === 0 && <span>Você não possui nenhum filme salvo :( </span>}

			<ul>
				{filmes.map((item) => {
					return (
						<li key={item.id}>
							<span>{item.nome}</span>
							<div>
								<Link to={`/filme/${item.id}`}>Ver detalhes</Link>
								{/* quando houver parametros, se cria uma função anonima para que só chame a função em si quando clicar no botão e não quando abrir a página */}
								<button onClick={() => handleDelete(item.id)}>Excluir </button>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Favoritos;

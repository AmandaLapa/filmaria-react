import React from "react";
import "./filmes-info.css";
import {useParams, useHistory} from "react-router-dom";
import api from "../../services/api";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

const Filme = () => {
	const {id} = useParams();
	const history = useHistory();

	const [filme, setFilme] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadFilme() {
			const response = await api.get(`r-api/?api=filmes/${id}`);

			if (response.data.length === 0) {
				//tentou acessar com id que não existe, manda para home
				history.replace("/");
				return;
			}

			//console.log(response.data);
			setFilme(response.data);
			setLoading(false);
		}
		loadFilme();

		//para desmontar a requisição quando sair dos detalhes do filme
		return () => {
			console.log("componente desmontado");
		};
	}, [id, history]);

	function salvaFilme() {
		const minhaLista = localStorage.getItem("filmes");
		let filmesSalvos = JSON.parse(minhaLista) || [];

		//se existir algum filme já salvo com o mesmo ID, ignora
		//some percorre todo o array e verifica se existe algum item com o parametro que passarmos
		//retorna true ou false
		const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);
		if (hasFilme) {
			toast.error("Você já possui esse filme salvo");
			return;
		}

		filmesSalvos.push(filme);
		localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
		toast.success("Filme salvo com sucesso!");
	}

	if (loading) {
		return (
			<div className="filme-info">
				<h1>Carregando seu filme...</h1>
			</div>
		);
	}

	return (
		<div className="filme-info">
			<h1>
				{filme.nome} - ID:{id}
			</h1>
			<img src={filme.foto} alt={filme.nome} />
			<h3>Sinopse</h3>
			{filme.sinopse}
			<div className="botoes">
				<button onClick={salvaFilme}>Salvar</button>
				<button>
					<a target="_blank" rel="noreferrer" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
						Trailer
					</a>
				</button>
			</div>
		</div>
	);
};

export default Filme;

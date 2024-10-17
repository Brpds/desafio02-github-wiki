import { useState } from "react";
import gitLogo from "../assets/github-logo.png";
import Input from "../components/Input";
import ItemRepo from "../components/ItemRepo";
import { Container } from "./styles";
import Button from "../components/Button";
import api from "../services/api"

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
	const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    try{

    //se for vazio
    if(currentRepo === ''){
      alert('Digite um nome válido de repositório!')
      return
    }

    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id){

      const alreadyExists = repos.find(repo => repo.id === data.id);

      if(!alreadyExists){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('')
        return
      }
    }
    alert('Repositório já foi adicionado')
  }
  //caso apresente erro
  catch(error){
    if(error.response.status === 404){
      alert('Não encontrado')
      return
    }
    else if(error.request){
      alert('Sem resposta do servidor')
      return
    }
    else{
      alert('Erro: ', error.response.status, '. Tente novamente')
      return
    }
  }
  }

  //remove da lista o repositório
  const handleRemoveRepo = (id) => {
    setRepos(repos.filter(item => id !== item.id))
    alert('Removido com sucesso!')
  }


    return (
        <Container>
          {/*<a href="https://www.flaticon.com/free-icons/cat" title="cat icons">Cat icons created by Dave Gandy - Flaticon</a>*/}
          <img src={gitLogo} width={72} height={72} alt="git-logo"/>
          <Input value={currentRepo} onChange={(Event) => setCurrentRepo(Event.target.value)}/>
          <Button onClick={handleSearchRepo}/>
          {repos.map(repo => <ItemRepo handleRemoveRepo={ handleRemoveRepo } repo={repo}/>)}
        </Container>
    );
}

export default App;

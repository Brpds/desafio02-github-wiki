import { ItemContainer } from "./styles"

function ItemRepo({handleRemoveRepo, repo}){

    const handleRemove = () => {
        handleRemoveRepo(repo.id)
    }

    return(
        <ItemContainer >
            <h3 key={repo.id}>{repo.name}</h3>
            <p>{repo.full_name}</p>
            <a href={repo.html_url} rel="noreferrer" target="_blank" >Ver Repositório</a><br />
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
            <a onClick={handleRemove} href="#" className="remover">Remover</a>
            <hr />
        </ItemContainer>
    )
}

export default ItemRepo;
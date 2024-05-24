import { useState } from "react";
import { toast } from 'react-toastify';
import Modal from 'react-modal';

function Formulario({setQuantidadeJogadoresLinha, quantidadeJogadoresLinha, montaTimes}){
    const maxPlayers = 10;
    const maxNota = 4;
    const playersSession = 'PLAYERS';
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    function openModal() {
        setModalIsOpen(true);
    }
    
    function closeModal() {
        setModalIsOpen(false);
    }

    const[players, setPlayers] = useState(localStorage.getItem(playersSession) ? JSON.parse(localStorage.getItem(playersSession)) : []);  
    const[nome, setNome] = useState('');
    const[nota, setNota] = useState(0);

    const handleChangeInputNumber = (event) => {
        const value = event.target.value;
        if (value <= maxPlayers) {
            setQuantidadeJogadoresLinha(value);
        } else {
            toast.info(`Máximo de ${maxPlayers} jogadores`);
        }
    };

    function adicionaJogador(){
        setPlayers([
            ...players,
            { 
                nome: nome, 
                nota: nota 
            },
        ]);

        setNome('');
        setNota(0);
        closeModal();
    }

    function removeJogador(index){
        setPlayers([
            ...players.slice(0, index),
            ...players.slice(index+1),
        ]);
    }

    function montarTimes(){
        localStorage.setItem(playersSession, JSON.stringify(players));
        montaTimes(players);
    }

    function customStyles(){
        return {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                border: '0',
                background: '#2B2C33',
                marginRight: '-50%',
                borderRadius: '5px',
                transform: 'translate(-50%, -50%)',
                width: '60%',
                overflow: 'auto',
                position: 'fixed'
            },
        };
    }

    return(
        <div className="form-players">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={customStyles()}
                contentLabel="Jogador"
            >
                <div className="modal-body">
                    <div className="modal-form">
                        <h3>Nome:</h3>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>
                        <h3>Nota:</h3>
                        <input type="number" value={nota} onChange={(e) =>{
                            if(e.target.value > maxNota){
                                toast.info(`Valor não pode ser maior que ${maxNota}`);
                            }
                            else{
                                setNota(e.target.value);
                            }
                        } }/>
                    </div>
                    <div className="modal-options">
                        <button onClick={() => adicionaJogador()}>Adicionar</button>
                    </div>
                </div>
            </Modal>
            <h2>Informações</h2>
            <div className="div-pattern">
                <div className="config">
                    <h3>Quantidade de jogadores de linha por time:</h3>
                    <input type="number" value={quantidadeJogadoresLinha} onChange={handleChangeInputNumber} max={maxPlayers}/>
                </div>
            </div>

            <h2>Jogadores:</h2>
            <div className="div-pattern">
                <div className="players">
                    {
                        players.map((item, index) => 
                            (
                                <div key={index} className="players-item">
                                    <h3>{index+1}: {item.nome} ({item.nota})</h3>
                                    <button onClick={() => removeJogador(index)}>Remover</button>
                                </div>
                            )
                        )
                    }
                </div>
                <div className="confirm-option">
                    <button onClick={openModal}>Adicionar Jogador</button>
                </div>
            </div>
            
            <div className="confirm-option">
                <button className="button-confirm" onClick={montarTimes}>Montar Times</button>
            </div>
        </div>
    )
}

export default Formulario;
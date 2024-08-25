import { useState } from 'react';
import './App.css'
import KanbanBoard from './components/KanbanBoard'
import Modal from './components/Modal';

function App() {

    const [modalActive, setModalActive] = useState(true);
    return (
        <>
        <Modal active={modalActive}
        setActive={setModalActive}/>
        <KanbanBoard />
</>
        
    )
}
export default App

import Menyapa from './Menyapa.jsx'

function Biodata({ nama, nim }) {
    return <>
        <table border={1}>
                <tr>
                    <td>Nama</td>
                    <td>NIM</td>
                </tr>
                <tr>
                    <td>{nama}</td>
                    <td>{nim}</td>
                </tr>
        </table>
    </>
}

function App() {
    return <> 
            <Menyapa />
            <Biodata 
            nama="Mohamad Rozaq Alfatih" 
            nim="A11.2024.15921"
            />
    </>;
} 

export default App;
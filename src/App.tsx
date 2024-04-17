import './App.css'
import SearchBox from './component/SearchBox';
import KaiLogo from 'kai-assets/logo.svg';

function App() {

  return (
    <div className="App">
        <div className='content'>
            <div className='logo'>
                <img src={KaiLogo} />
            </div>
            <SearchBox />
        </div>

    </div>
  )
}

export default App

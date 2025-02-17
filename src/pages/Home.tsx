import DiaryList from '../components/DiaryList';
import { sampleDiary } from '../data/Diary';
import logo from '../logo.svg';

function Home() {
    const items = sampleDiary

    return (
        <header className="App-header">
            <DiaryList items={items} />
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React po!
            </a>
        </header>
    )
}

export default Home
import './App.scss';
import HealthTable from './components/UI/HealthTable/HealthTable';
import SpellCast from './components/UI/SpellCast/SpellCast';
import SpellTable from './components/UI/SpellTable/SpellTable';
import UnitFocusPlayer from './components/UI/UnitFocusPlayer/UnitFocusPlayer';

function App() {
  return (
    <div className="App">
      <HealthTable />
      <UnitFocusPlayer />
      <SpellCast />
      <SpellTable />
    </div>
  );
}

export default App;

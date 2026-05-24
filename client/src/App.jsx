import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CueSheet from './pages/CueSheet';
import MicPlot from './pages/MicPlot';
import Props from './pages/Props';
import RehearsalReports from './pages/RehearsalReports';
import Exports from './pages/Exports';
import Pricing from './pages/Pricing';
import Settings from './pages/Settings';
import { storage, makeId } from './services/storage';

export default function App() {
  const [shows, setShows] = useState([]); const [cues, setCues] = useState([]); const [mics, setMics] = useState([]); const [propsRows, setPropsRows] = useState([]); const [reports, setReports] = useState([]); const [plan] = useState(storage.getPlan());
  useEffect(()=>setShows(storage.getShows()),[]); useEffect(()=>setCues(storage.getCues()),[]); useEffect(()=>setMics(storage.getMics()),[]); useEffect(()=>setPropsRows(storage.getProps()),[]); useEffect(()=>setReports(storage.getReports()),[]);
  useEffect(()=>storage.saveShows(shows),[shows]); useEffect(()=>storage.saveCues(cues),[cues]); useEffect(()=>storage.saveMics(mics),[mics]); useEffect(()=>storage.saveProps(propsRows),[propsRows]); useEffect(()=>storage.saveReports(reports),[reports]);
  return <BrowserRouter><Navbar/><main className='app'>
    <Routes>
      <Route path='/' element={<Dashboard shows={shows} cues={cues} mics={mics} props={propsRows} reports={reports} />} />
      <Route path='/cue-sheet' element={<CueSheet cues={cues} setCues={setCues} shows={shows} setShows={setShows} makeId={makeId} />} />
      <Route path='/mic-plot' element={<MicPlot mics={mics} setMics={setMics} makeId={makeId} />} />
      <Route path='/props' element={<Props propsRows={propsRows} setPropsRows={setPropsRows} makeId={makeId} />} />
      <Route path='/rehearsal-reports' element={<RehearsalReports reports={reports} setReports={setReports} makeId={makeId} />} />
      <Route path='/exports' element={<Exports cues={cues} mics={mics} propsRows={propsRows} reports={reports} />} />
      <Route path='/pricing' element={<Pricing />} />
      <Route path='/settings' element={<Settings plan={plan} />} />
    </Routes>
  </main></BrowserRouter>;
}

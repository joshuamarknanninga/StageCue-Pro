import { NavLink } from 'react-router-dom';

const links = ['Dashboard','Cue Sheet','Mic Plot','Props','Rehearsal Reports','Exports','Pricing','Settings'];

export default function Navbar() {
  return <nav className="nav no-print"><div className="brand">StageCue Pro</div><div className="links">{links.map((l)=><NavLink key={l} to={l==='Dashboard'?'/':`/${l.toLowerCase().replaceAll(' ','-')}`}>{l}</NavLink>)}</div></nav>;
}

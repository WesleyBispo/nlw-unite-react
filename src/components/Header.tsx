import nlwUniteIcon from "../assets/nlw-unite-icon.svg"
import NavLink from "./Nav-Link"
export default function Header() {
  return (
    <header className="flex items-center gap-5">
     <img src={nlwUniteIcon}/>
     <nav className="flex items-center gap-5">
        <NavLink href="/eventos">Eventos</NavLink>
        <NavLink href="/participantes">Participantes</NavLink>
     </nav>
    </header>
  )
} 
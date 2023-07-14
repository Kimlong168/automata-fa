// import cadt from '../assets/cadt.webp'
import logo from '../assets/logo.png'
const Header = () => {
  return (
    <div className="flex justify-between gap-3 items-center p-6 md:px-12  shadow-xl">
        <div>
            <img className="h-[40px]" src={logo} alt="cadt" />
        </div>
        <div>
            <h1 className="font-bold text-xl text-blue-950 uppercase">Automata</h1>
        </div>
    </div>
  )
}

export default Header
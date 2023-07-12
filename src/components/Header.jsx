import cadt from '../assets/cadt.webp'

const Header = () => {
  return (
    <div className="flex justify-between gap-3 items-center p-4 shadow-xl">
        <div>
            <img className="h-[40px]" src={cadt} alt="cadt" />
        </div>
        <div>
            <h1 className="font-bold text-xl">Automata(FA)</h1>
        </div>
    </div>
  )
}

export default Header
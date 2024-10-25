import { Calculadora, Remesas } from "./ui"



function App() {

  return (
    <>
      <div
        className="grid-rows-2"
        >

        <div className="flex flex-col md:flex-row h-screen">
          <div className="w-full md:w-1/2  bg-slate-950">
            <Calculadora />
          </div>
          <div className="w-full md:w-1/2 p-5">
            <Remesas />
          </div>
        </div>
        </div>
    </>
  )
}

export default App

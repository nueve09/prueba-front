import { Calculadora, Remesas } from "./ui"



function App() {

  return (
    <>
      <div
        className="grid-rows-2"
        >

        <div className="flex flex-col md:flex-row h-screen">
          <div className="w-full md:w-1/2 h-1/2 md:h-full p-4">
            <Calculadora />
          </div>
          <div className="w-full md:w-1/2 h-1/2 md:h-full p-4">
            <Remesas />
          </div>
        </div>
        </div>
    </>
  )
}

export default App

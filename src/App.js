import './App.css';
import Viewer from './Viewer';
import logo from './logo.svg'


function App() {

  return (
    <>
      <header className="bg-gradient-to-r from-krono-lime via-krono-green to-krono-pink py-4 flex flex-row items-center">
        <img src={`${process.env.PUBLIC_URL}/region-kronoberg_logo_vit.svg`} className='h-12 mx-6'></img>
        <h1 className="text-white text-3xl font-bold text-left">3D-Test</h1>
      </header>
      <main className="mt-2 px-2 w-full">
        <h2 className='text-2xl mt-2'>
          Om denna sidan
        </h2>
        <p>
          Denna sidan gjordes för att experimentera med 3D-skanning och webbaserad 3D-visning med syfta att undersöka om vi på Region Kronoberg vill använda tekniken på något sätt.
        </p>
        <p>
          Den enda modellen som finns tillgänglig just nu är en 3D-skann utav en tracheostomi-apparat som skannades med androidappen <a href='https://play.google.com/store/apps/details?id=ai.polycam'>Polycam</a> i sammarbete med KTC och sedan städades upp i programmet <a href='https://www.blender.org/'>Blender</a>
        </p>
        <h2 className='text-2xl mt-2'>
          Instruktioner
        </h2>
        <ol className='list-inside list-decimal pl-2'>
          <li>
            Låt 3D-modellen ladda. Detta kan ta upp till en minut på vissa
            enheter men går snabbare på de flesta.
          </li>
          <li>
            Placera muspekaren innanför visningsområdet. 3D-visaren kommer
            annars inte kunna uppfatta dina gester.
          </li>
          <li>
            vänsterklicka och dra för att rotera vyn runt modellen, högerklicka och dra för att panorera vyn och skrolla upp och ned för att zooma in och ut.
          </li>
        </ol>
        <Viewer/>
      </main>
    </>
  );
}

export default App;

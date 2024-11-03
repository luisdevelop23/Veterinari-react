import { useState, useEffect } from 'react'
import Error from './Error';
import Paciente from './Paciente';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietrario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      console.log('Si hay algo')
      setNombre(paciente.nombre)
      setPropietrario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])



  const handleSubmit = (e) => {
    e.preventDefault()
    //validacion del formulario 
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      console.log("hay almenos un campo basio")
      setError(true);
      return;
    }
    setError(false);
    const generarId = () => {
      const random = Math.random().toString(36).substr(2)
      const fecha = Date.now().toString(36)
      return random + fecha
    }
    //Objeto de paciente 
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }
    if (paciente.id) {
      //editando el registro
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id
        ? objetoPaciente : pacienteState)
      setPacientes(pacientesActualizados)
      setPaciente({})
    } else {
      //nuevo registro
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente])
    }
    // console.log(objetoPaciente)

    setNombre('')
    setPropietrario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2  lg:w-2/5 mx-5">
      <h2 className='font-black text-3xl text-center'>Seguimiento</h2>

      <p className="mt-5 text-lg text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

        {error && (
          <Error><p>todos los campos son obligatorios</p></Error>
        )}

        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input type="text"
            id="mascota"
            className="border-2 w-full mt-2 p-2 placeholder-gray-400  rounded-md"
            placeholder="Nombre de la mascota"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)} />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
            Nombre Propietario
          </label>
          <input type="text"
            id="propietario"
            className="border-2 w-full mt-2 p-2 placeholder-gray-400  rounded-md"
            placeholder="Nombre de la propietario"
            value={propietario}
            onChange={(e) => setPropietrario(e.target.value)} />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            Email
          </label>
          <input type="email"
            id="email"
            className="border-2 w-full mt-2 p-2 placeholder-gray-400  rounded-md"
            placeholder="Nombre de la mascota"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            alta
          </label>
          <input type="date"
            id="alta"
            className="border-2 w-full mt-2 p-2 placeholder-gray-400  rounded-md"
            placeholder="Nombre de la mascota"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)} />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
            sintomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full mt-2 p-2 placeholder-gray-400  rounded-md"
            placeholder="describe los sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}>
          </textarea>
        </div>

        <input type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold
        hover:bg-indigo-700 cursor-pointer transition-colors"

          value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} />
      </form>
    </div>
  )
}

export default Formulario
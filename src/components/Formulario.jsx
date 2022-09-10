import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombreMascota, setNombreMascota] = useState("");
  const [nombrePropietario, setNombrePropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fechaAlta, setFechaAlta] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    if( Object.keys(paciente).length > 0  ) {
      setNombreMascota(paciente.nombreMascota);
      setNombrePropietario(paciente.nombrePropietario);
      setEmail(paciente.email);
      setFechaAlta(paciente.fechaAlta);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random.toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validacion del Formulario
    if (
      [nombreMascota, nombrePropietario, email, fechaAlta, sintomas].includes(
        ""
      )
    ) {
      console.log("Hay al menos un campo vacio");
      setError(true);
      return;
    }
    setError(false);

    //Objeto de paciente
    const objetoPaciente = {
      nombreMascota,
      nombrePropietario,
      email,
      fechaAlta,
      sintomas,
    };
    if (paciente.id) {
      //Editando Registro
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      );
      setPacientes(pacientesActualizados);
      setPaciente({});
    } else {
      //Nuevo Registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    //Reiniciar el form
    setNombreMascota("");
    setNombrePropietario("");
    setEmail("");
    setFechaAlta("");
    setSintomas("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Anade pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-5 py-10 mb-10"
      >
        {error && <Error>Todos los campos son obligatorios</Error>}

        <div className="mb-5">
          <label
            className="block text-gray700 uppercase font-bold"
            htmlFor="nombreMascota"
          >
            Nombre Mascota
          </label>
          <input
            id="nombreMascota"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombreMascota}
            onChange={(e) => setNombreMascota(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray700 uppercase font-bold"
            htmlFor="nombrePropietario"
          >
            Nombre Propietario
          </label>
          <input
            id="nombrePropietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombrePropietario}
            onChange={(e) => setNombrePropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray700 uppercase font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="E-mail Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray700 uppercase font-bold"
            htmlFor="alta"
          >
            Alta
          </label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fechaAlta}
            onChange={(e) => setFechaAlta(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray700 uppercase font-bold"
            htmlFor="sintomas"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-200 rounded-md"
            placeholder="Describe los Sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-indigo-700 cursor-pointer transition-all"
          value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
        />
      </form>
    </div>
  );
};

export default Formulario;

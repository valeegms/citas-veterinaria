import { useState, useEffect } from "react";
import { Error } from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
	const [nombre, setNombre] = useState("");
	const [propietario, setPropietario] = useState("");
	const [email, setEmail] = useState("");
	const [fecha, setFecha] = useState("");
	const [sintomas, setSintomas] = useState("");

	const [error, setError] = useState(false);

	useEffect(() => {
		if (Object.keys(paciente).length > 0) {
			setNombre(paciente.nombre);
			setPropietario(paciente.propietario);
			setEmail(paciente.email);
			setFecha(paciente.fecha);
			setSintomas(paciente.sintomas);
		}
	}, [paciente]);

	const generarId = () => {
		const random = Math.random().toString(36).substring(2);
		const fecha = Date.now().toString(36);

		return random + fecha;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validar formulario
		if ([nombre, propietario, email, fecha, sintomas].includes("")) {
			setError(true);
			return;
		}

		setError(false);

		// Crear objeto
		const objetoPaciente = {
			nombre,
			propietario,
			email,
			fecha,
			sintomas,
		};

		if (paciente.id) {
			// Editar registro
			objetoPaciente.id = paciente.id;

			const pacientesActualizados = pacientes.map((pacienteState) => {
				if (pacienteState.id === paciente.id) {
					return objetoPaciente;
				}

				return pacienteState;
			});

			setPacientes(pacientesActualizados);
			setPaciente({});
		} else {
			// Nuevo registro
			objetoPaciente.id = generarId();
			setPacientes([...pacientes, objetoPaciente]);
		}

		// Resetear formulario
		setNombre("");
		setPropietario("");
		setEmail("");
		setFecha("");
		setSintomas("");
	};

	return (
		<div className="md:w-1/2 lg:w-2/5 mx-5">
			<h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
			<p className="text-lg mt-5 text-center mb-10">
				Añade Pacientes y{" "}
				<span className="text-indigo-600 font-bold">Adminístralos</span>
			</p>
			<form
				onSubmit={handleSubmit}
				className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
			>
				{error && <Error mensaje="Todos los campos son obligatorios" />}
				<div className="mb-5">
					<label
						className="block text-gray-700 uppercase font-bold select-none"
						htmlFor="mascota"
					>
						Nombre Mascota
					</label>
					<input
						id="mascota"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
						type="text"
						placeholder="Nombre de la mascota"
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
					/>
				</div>
				<div className="mb-5">
					<label
						className="block text-gray-700 uppercase font-bold select-none"
						htmlFor="propietario"
					>
						Nombre Propietario
					</label>
					<input
						id="propietario"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
						type="text"
						placeholder="Nombre del propietario"
						value={propietario}
						onChange={(e) => setPropietario(e.target.value)}
					/>
				</div>
				<div className="mb-5">
					<label
						className="block text-gray-700 uppercase font-bold select-none"
						htmlFor="email"
					>
						Email
					</label>
					<input
						id="email"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
						type="email"
						placeholder="Email Contacto Propietario"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="mb-5">
					<label
						className="block text-gray-700 uppercase font-bold select-none"
						htmlFor="alta"
					>
						Alta
					</label>
					<input
						id="alta"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
						type="date"
						value={fecha}
						onChange={(e) => setFecha(e.target.value)}
					/>
				</div>
				<div className="mb-5">
					<label
						className="block text-gray-700 uppercase font-bold select-none"
						htmlFor="sintomas"
					>
						Síntomas
					</label>
					<textarea
						className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
						id="sintomas"
						cols="30"
						rows="10"
						placeholder="Describe los síntomas"
						value={sintomas}
						onChange={(e) => setSintomas(e.target.value)}
					></textarea>
				</div>
				<input
					className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all rounded-md"
					type="submit"
					value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
				/>
			</form>
		</div>
	);
};

export default Formulario;

import { useEffect } from "react";
import { Paciente } from "./Paciente";

function ListadoPacientes({ pacientes, setPaciente, eliminarPaciente }) {
	useEffect(() => {
		if (pacientes.length > 0) {
			console.log(pacientes);
		}
	}, [pacientes]);

	return (
		<div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-auto">
			<h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
			{pacientes && pacientes.length ? (
				<>
					<p className="text-xl mt-5 mb-10 text-center">
						Administra tus {""}
						<span className="text-indigo-600 font-bold">Pacientes y Citas</span>
					</p>

					{pacientes.map((paciente) => {
						return (
							<Paciente
								key={paciente.id}
								paciente={paciente}
								setPaciente={setPaciente}
								eliminarPaciente={eliminarPaciente}
							/>
						);
					})}
				</>
			) : (
				<p className="text-xl mt-5 mb-10 text-center">
					No hay pacientes, comienza creando uno{" "}
					<span className="text-indigo-600 font-bold">y apareceran aquí</span>
				</p>
			)}
		</div>
	);
}

export default ListadoPacientes;

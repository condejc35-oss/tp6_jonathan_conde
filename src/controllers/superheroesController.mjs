import { obtenerSuperheroePorid, obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30,
    crearSuperheroe, actualizarSuperheroe,
    eliminarSuperheroe, eliminarPorNombre }
from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes }
from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorid(id);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }
        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe', error: error.message });
    }
}

export async function obtenerTodosLosSuperheroresController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron superhéroes con ese atributo' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes', error: error.message });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron superhéroes mayores de 30 años' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send(
            { mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message });
    }
}

////////////////////////////////////////////////
//Nuevas funcionalidades - TP 1 - Sprint 3//////
////////////////////////////////////////////////

//Crear nuevo superhéroe
export async function crearSuperheroeController (req, res) {
    try {
        const nuevoHeroe = await crearSuperheroe(req.body);
        res.status(201).send(nuevoHeroe);
    } catch (error) {
        res.status(400).send(
            { mensaje: 'Error al crear el superhéroe', error: error.message });
    }
}

//Actualizar superhéroe en DB y mostrar todos actualizados
export async function actualizarSuperheroeController (req, res) {
    try {
        const heroeActualizado = await actualizarSuperheroe(req.body);
        res.status(201).send(heroeActualizado);
    } catch (error) {
        res.status(400).send(
            { mensaje: 'Error al actualizar el superhéroe', error: error.message });
    }
}

//Eliminar superhéroe por id en DB y mostrar todos actualizados
export async function eliminarHeroeController (req, res) {
    try {
        const { id } = req.params;
        const heroeEliminado = await eliminarSuperheroe(id);
        res.status(201).send(heroeEliminado);
    } catch (error) {
        res.status(400).send(
            { mensaje: 'Error al eliminar el superhéroe de DB', error: error.message });
    }
}

//Eliminar superhéroe por nombre en DB y mostrar eliminado
export async function eliminarPorNombreController(req, res) {
    try {
        const { nombreSuperHeroe } = req.params;
        const superheroeEliminado = await eliminarPorNombre(nombreSuperHeroe);
        res.status(201).send(superheroeEliminado);
        
    } catch (error) {
        res.status(400).send(
            { mensaje: 'Error al eliminar el superhéroe de DB', error: error.message });
    }

}

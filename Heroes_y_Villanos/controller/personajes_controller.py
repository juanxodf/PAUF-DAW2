import random
from ..clases.Heroe import Heroe
from ..clases.Villano import Villano
from ..log import logger


class PersonajesController:
    def __init__(self):
        self.personajes = []

    def crear_heroe(self, nombre, apellidos, fecha_nacimiento):
        try:
            # Convertir fecha de string a datetime
            from datetime import datetime
            fecha_obj = datetime.strptime(fecha_nacimiento, "%d/%m/%Y")
            heroe = Heroe(nombre, apellidos, fecha_obj)
            self.personajes.append(heroe)
            logger.info(f"Héroe creado: {heroe}")
            return heroe
        except Exception as e:
            logger.error(f"Error al crear héroe: {e}")
            return None

    def crear_villano(self, nombre, apellidos, fecha_nacimiento):
        try:
            from datetime import datetime
            fecha_obj = datetime.strptime(fecha_nacimiento, "%d/%m/%Y")
            villano = Villano(nombre, apellidos, fecha_obj)
            self.personajes.append(villano)
            logger.info(f"Villano creado: {villano}")
            return villano
        except Exception as e:
            logger.error(f"Error al crear villano: {e}")
            return None

    def buscar_personajes(self, **kwargs):
        resultados = []
        for p in self.personajes:
            match = True
            for clave, valor in kwargs.items():
                if hasattr(p, clave):
                    if getattr(p, clave) == valor:
                        continue
                elif hasattr(p, 'cualidades') and clave in p.cualidades:
                    if p.cualidades[clave] == valor:
                        continue
                match = False
                break
            if match:
                resultados.append(p)

        logger.info(f"Búsqueda realizada: {kwargs}, encontrados: {len(resultados)} personajes")
        return resultados

    def emparejar(self):
        heroes = [p for p in self.personajes if isinstance(p, Heroe)]
        villanos = [p for p in self.personajes if isinstance(p, Villano)]

        if not heroes or not villanos:
            logger.warning("No hay suficientes héroes o villanos para emparejar.")
            return None

        heroe = random.choice(heroes)
        villano = random.choice(villanos)

        diferencia = abs(heroe.puntuacion_total - villano.puntuacion_total)

        if diferencia < 10:
            resultado = "Enfrentamiento equilibrado"
        elif diferencia < 20:
            resultado = "Ligera ventaja"
        else:
            resultado = "Alta desviación"

        logger.info(f"Emparejados: {heroe} vs {villano} -> {resultado}")
        return {
            'heroe': heroe,
            'villano': villano,
            'diferencia': diferencia,
            'resultado': resultado
        }

    def listar_personajes(self):
        if not self.personajes:
            print("No hay personajes creados.")
            return

        print("\n--- LISTA DE PERSONAJES ---")
        heroes = [p for p in self.personajes if isinstance(p, Heroe)]
        villanos = [p for p in self.personajes if isinstance(p, Villano)]

        if heroes:
            print("\n🦸 HÉROES:")
            for heroe in heroes:
                print(f"  - {heroe}")

        if villanos:
            print("\n🦹 VILLANOS:")
            for villano in villanos:
                print(f"  - {villano}")

    def obtener_estadisticas(self):
        total = len(self.personajes)
        heroes = len([p for p in self.personajes if isinstance(p, Heroe)])
        villanos = len([p for p in self.personajes if isinstance(p, Villano)])

        if total == 0:
            return "No hay personajes creados."

        promedio_heroes = sum(
            p.puntuacion_total for p in self.personajes if isinstance(p, Heroe)) / heroes if heroes > 0 else 0
        promedio_villanos = sum(
            p.puntuacion_total for p in self.personajes if isinstance(p, Villano)) / villanos if villanos > 0 else 0

        return {
            'total': total,
            'heroes': heroes,
            'villanos': villanos,
            'promedio_heroes': promedio_heroes,
            'promedio_villanos': promedio_villanos
        }
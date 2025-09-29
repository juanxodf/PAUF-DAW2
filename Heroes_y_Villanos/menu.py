''' Aquí encontraremos todo lo que el usuario verá '''
import sys
from controller.personajes_controller import PersonajesController
from log import logger


def menu():
    """Muestra el menú principal en pantalla"""
    print("\n=== MENÚ PRINCIPAL ===")
    print("1) Crear Héroe")
    print("2) Crear Villano")
    print("3) Buscar un héroe o villano")
    print("4) Salir")


class Menu:
    def __init__(self):
        self.controller = PersonajesController()

    def crear_heroe(self):
        print("\n--- CREAR HÉROE ---")
        try:
            nombre = input("Nombre: ").strip()
            apellidos = input("Apellidos: ").strip()
            fecha = input("Fecha nacimiento (dd/mm/yyyy): ").strip()

            if not nombre or not apellidos or not fecha:
                print("❌ Todos los campos son obligatorios.")
                return

            heroe = self.controller.crear_heroe(nombre, apellidos, fecha)
            if heroe:
                print(f"✅ Héroe creado exitosamente: {heroe}")
                heroe.mostrar_cualidades()
            else:
                print("❌ Error al crear el héroe. Verifica el formato de fecha.")
        except Exception as e:
            print(f"❌ Error: {e}")
            logger.error(f"Error al crear héroe: {e}")

    def crear_villano(self):
        print("\n--- CREAR VILLANO ---")
        try:
            nombre = input("Nombre: ").strip()
            apellidos = input("Apellidos: ").strip()
            fecha = input("Fecha nacimiento (dd/mm/yyyy): ").strip()

            if not nombre or not apellidos or not fecha:
                print("❌ Todos los campos son obligatorios.")
                return

            villano = self.controller.crear_villano(nombre, apellidos, fecha)
            if villano:
                print(f"✅ Villano creado exitosamente: {villano}")
                villano.mostrar_cualidades()
            else:
                print("❌ Error al crear el villano. Verifica el formato de fecha.")
        except Exception as e:
            print(f"❌ Error: {e}")
            logger.error(f"Error al crear villano: {e}")

    def buscar_personaje(self):
        print("\n--- BUSCAR HÉROE O VILLANO ---")
        try:
            clave = input("👉 Atributo/cualidad a buscar: ").strip()
            valor = input("👉 Valor a buscar: ").strip()

            # Si es número, lo convertimos
            try:
                valor = int(valor)
            except ValueError:
                pass

            resultados = self.controller.buscar_personajes(**{clave: valor})

            if resultados:
                print("\n✅ Resultados encontrados:")
                for r in resultados:
                    print(r)
                    r.mostrar_cualidades()
            else:
                print("❌ No se encontraron personajes con ese criterio.")
        except Exception as e:
            print(f"❌ Error: {e}")
            logger.error(f"Error en búsqueda: {e}")

    def ejecutar(self):
        """Ejecuta el bucle principal del menú"""
        logger.info("Iniciando aplicación de Héroes y Villanos")

        while True:
            try:
                menu()
                opcion = input("Selecciona una opción: ").strip()

                if opcion == "1":
                    self.crear_heroe()
                elif opcion == "2":
                    self.crear_villano()
                elif opcion == "3":
                    self.buscar_personaje()
                elif opcion == "4":
                    print("\n👋 ¡Gracias por usar el sistema! Hasta luego.")
                    logger.info("Aplicación cerrada por el usuario")
                    sys.exit(0)
                else:
                    print("❌ Opción inválida. Por favor, selecciona una opción del 1 al 4.")

                input("\nPresiona Enter para continuar...")

            except KeyboardInterrupt:
                print("\n\n👋 Saliendo del programa...")
                logger.info("Aplicación cerrada con Ctrl+C")
                sys.exit(0)
            except Exception as e:
                print(f"❌ Error inesperado: {e}")
                logger.error(f"Error inesperado: {e}")


if __name__ == "__main__":
    app = Menu()
    app.ejecutar()

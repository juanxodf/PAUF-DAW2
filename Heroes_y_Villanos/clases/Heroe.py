import random
from .Persona import Persona

class Heroe(Persona):
    atributos = ["Código Limpio", "Bien Documentado", "GITGod", "Arquitecto", "Detallista"]

    def __init__(self, nombre, apellidos, fecha_nacimiento):
        super().__init__(nombre, apellidos, fecha_nacimiento)
        self.cualidades = {attr: random.randint(0, 100) for attr in Heroe.atributos}
        self.puntuacion_total = sum(self.cualidades.values()) / len(self.cualidades)

    def mostrar_cualidades(self):
        print(f"\n--- Cualidades de {self.nombre} {self.apellidos} ---")
        for cualidad, valor in self.cualidades.items():
            print(f"{cualidad}: {valor}/100")
        print(f"Puntuación total: {self.puntuacion_total:.2f}")

    def __str__(self):
        return f"Heroe: {self.nombre} {self.apellidos} - Puntuación: {self.puntuacion_total:.2f}"
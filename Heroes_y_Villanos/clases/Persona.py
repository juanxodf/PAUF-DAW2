# Persona.py
from datetime import datetime

class Persona:
    cod_per = 0

    def __init__(self, nombre, apellidos, fecha_nacimiento):
        Persona.cod_per += 1
        self.__id = Persona.cod_per
        self.__nombre = nombre
        self.__apellidos = apellidos
        self.__fecha_nacimiento = fecha_nacimiento

    @property
    def nombre(self):
        return self.__nombre

    @nombre.setter
    def nombre(self, value):
        self.__nombre = value

    @property
    def apellidos(self):
        return self.__apellidos

    @apellidos.setter
    def apellidos(self, value):
        self.__apellidos = value

    @property
    def fecha_nacimiento(self):
        return self.__fecha_nacimiento

    @fecha_nacimiento.setter
    def fecha_nacimiento(self, value):
        self.__fecha_nacimiento = value

    def edad(self):
        hoy = datetime.today()
        return hoy.year - self.fecha_nacimiento.year - (
                (hoy.month, hoy.day) < (self.fecha_nacimiento.month, self.fecha_nacimiento.day)
        )

    def __str__(self):  # Corregido: __toString a __str__
        return f"{self.__class__.__name__}({self.nombre} {self.apellidos})"
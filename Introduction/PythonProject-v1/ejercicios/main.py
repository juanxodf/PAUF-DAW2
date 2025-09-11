#Ejercicio 1: Lista de equipos
#Crea una lista con los 5 primeros equipos de la clasificación (puedes inventar el orden)
equipos = ["RM","FCB","ATM","VAL","VIL"]
#Muestra en pantalla el primer y último equipo
print(equipos[0] + " " + equipos[-1])
#Añade un equipo nuevo al final de la lista
equipos.append("SEV")
#Inserta a mano un equipo en la primera posición
equipos.insert(0,"MAL")
#Elimina un equipo que ya no quieras que esté en la lista
equipos.remove("SEV")

#Ejercicio 2: Jornada de partidos
#imprimir los partidos
locales = ["Real Madrid", "Barcelona", "Atlético", "Sevilla", "Valencia"]
visitantes = ["Athletic", "Betis", "Cádiz", "Villarreal", "Osasuna"]
for i in range(0,len(locales)-1):
    print(locales[i] + " vs " + visitantes[i])
#Elimina un partido (por ejemplo, el de Sevilla vs Villarreal)
del locales[4]
del visitantes[4]
#Añade un nuevo partido con un equipo inventado
locales.append("Elche")
visitantes.append("Getafe")

#Ejercicio 3: Clasificación de goleadores
# Crea una lista con los goles de 6 jugadores:
goleadores = ["6","4","2","7","6","3"]
# Muestra cuántos jugadores hay
print(len(goleadores))
# Ordena la lista de goles de menor a mayor y luego de mayor a menor.
goleadores.sort()
print("Goleadores de menor a mayor")
print(goleadores)
goleadores.reverse()
print("Goleadores de mayor a menor")
print(goleadores)
# Muestra el máximo y el mínimo de la lista (max() y min()).
print("El maximo goleador lleva: " + max(goleadores))
print("El minimo goleador lleva: " + min(goleadores))
# Inserta un nuevo jugador con 8 goles en la posición correcta para mantener el orden.
goleadores.insert(0,8)
print(goleadores)
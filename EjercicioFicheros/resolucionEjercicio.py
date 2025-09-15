from datetime import date
#Declaramos la variable estatica que tendra el principio de cada linea
estatica = "Insert into Personas (id,Nombre, Apellidos, fecha_nacimiento, calle, codigo_postal, numero, movil) values ( "

#Declaramos la fecha de hoy para ponerle nombre al archivo log cuando se cree
fecha = date.today()

#Leemos el archivo y vamos sacando los datos
with open("Libro2.txt","r") as fichero:
    #Guardamos la primera linea
    linea = fichero.readline()
    while linea:
        #Separamos los datos de cada linea en cada uno de los campos (Nombre, Apellido, ...
        data = linea.split(" ")
        #Eliminamos el salto de linea que esta agregado al final de cada linea
        data.pop()

        #Creamos el archivo o lo sobreescribimos si ya existe el archivo log
        with open(f"{fecha}_Personas.log", "a") as archivo:
            #Utilizamos el join para concatenar todos los string del vector con comas
            resultado = ", ".join(data)
            #Utilizamos la variable estatica junto a los datos de cada linea para dejar listo el insert
            archivo.write(f"{estatica}{resultado}); \n")

        #Pasamos a la siguiente linea
        linea = fichero.readline()
import logging
import os
from datetime import datetime

def configurar_logger():
    """
    Configura un sistema de logging para la aplicación Héroes y Villanos.
    - Guarda todos los logs en un archivo con la fecha actual en el nombre.
    - Muestra los logs también en consola con colores para distinguir INFO, WARNING y ERROR.
    """

    # 1. Crear directorio de logs si no existe
    if not os.path.exists("logs"):
        os.makedirs("logs")

    # 2. Nombre del archivo de log (cada día genera un archivo distinto)
    log_filename = f"logs/HEROESYVILLANOS_{datetime.now().strftime('%Y%m%d')}.log"

    # 3. Formato de los logs que se guardarán en archivo
    log_format = "%(asctime)s | %(levelname)-8s | %(message)s"
    date_format = "%Y-%m-%d %H:%M:%S"

    # 4. Configuración básica para guardar logs en archivo
    logging.basicConfig(
        filename=log_filename,
        level=logging.DEBUG,   # Guardamos TODO en el archivo (DEBUG, INFO, WARNING, ERROR, CRITICAL)
        format=log_format,
        datefmt=date_format
    )

    # 5. Definimos colores para los mensajes que aparecen en consola
    COLORS = {
        "INFO": "\033[92m",     # Verde → acciones correctas
        "WARNING": "\033[93m",  # Amarillo → advertencias
        "ERROR": "\033[91m",    # Rojo → errores graves
        "DEBUG": "\033[94m",    # Azul → mensajes de depuración
        "CRITICAL": "\033[95m", # Magenta → fallos críticos
        "RESET": "\033[0m"      # Reset para volver al color normal
    }

    # 6. Clase personalizada que aplica colores a los logs en consola
    class CustomFormatter(logging.Formatter):
        def format(self, record):
            log_color = COLORS.get(record.levelname, COLORS["RESET"])
            reset = COLORS["RESET"]
            record.levelname = f"{log_color}{record.levelname}{reset}"
            record.msg = f"{log_color}{record.msg}{reset}"
            return super().format(record)

    # 7. Configuramos un "handler" que manda los logs también a la consola
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)  # En consola mostramos solo INFO en adelante
    console_handler.setFormatter(CustomFormatter("%(levelname)s | %(message)s"))

    # 8. Creamos el logger principal y le añadimos el handler de consola
    logger = logging.getLogger("heroes_villanos")
    logger.setLevel(logging.DEBUG)  # Captura todos los niveles
    logger.addHandler(console_handler)

    # 9. Mensaje inicial para confirmar que el logger se configuró correctamente
    logger.info("📜 Logger configurado. Los registros se guardarán en archivo y se mostrarán en consola.")

    return logger


# === Instancia global de logger para usar en todo el proyecto ===
logger = configurar_logger()

from django.db import models

# Modelo de Localidad
class Localidad(models.Model):
    name = models.CharField(max_length=200)
    estatus = models.BooleanField(default=True)

    def __str__(self):
        return self.name

# Modelo de Producto
class Producto(models.Model):
    name = models.CharField(max_length=200)
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    localidad = models.ForeignKey(Localidad, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

# Modelo de Evento
class Evento(models.Model):
    name = models.CharField(max_length=300)
    descripcion = models.CharField(max_length=300, default="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, cumque. Possimus modi impedit beatae reiciendis at, ab cupiditate. Minus explicabo omnis tempore cumque itaque quas eveniet harum unde similique! Reiciendis?")
    imagen_url = models.CharField(max_length=300, default="https://img.freepik.com/fotos-premium/foto-3d-mujer-traje-colorido-plumas-coloridas-cabeza_1227606-10209.jpg?w=1380")
    fecha_inicio = models.DateTimeField("Fecha de inicio")
    fecha_fin = models.DateTimeField("Fecha de fin")
    localidad = models.ForeignKey(Localidad, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class Imagenes(models.Model):
    nombre = models.CharField(max_length=200, default="imagen")
    imagen_url = models.CharField(max_length=300, default="https://img.freepik.com/psd-premium/carnaval-ofertas-diseno-plantillas-redes-sociales-portugues-brasil-renderizado-3d_364106-3325.jpg?w=360")

    def __str__(self):
        return self.imagen_url
    
class Noticias(models.Model):
    titulo = models.CharField(max_length=200)
    imagen_url = models.CharField(max_length=300, default="https://img.freepik.com/psd-premium/disfraces-redes-sociales-tu-carnaval_220664-6324.jpg?w=1380")
    descripcion = models.TextField()

    def __str__(self):
        return self.titulo

# Modelo de Tipo de Boleto
class TipoBoleto(models.Model):
    tipo = models.CharField(max_length=200)

    def __str__(self):
        return self.tipo

# Modelo de Boletos
class Boleto(models.Model):
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    tipo_boleto = models.ForeignKey(TipoBoleto, on_delete=models.CASCADE)
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    imagen_url = models.CharField(max_length=300, default="https://img.freepik.com/vector-gratis/vector-dos-entradas-cine-disenadas-cerca-vista-superior-aislada-sobre-fondo-blanco_1284-47320.jpg?t=st=1740719910~exp=1740723510~hmac=8aa409fd45d08c6bd3e24325a90f8e69012f7447de506e32b5a404cdde122535&w=1480")
    fecha = models.DateTimeField("Fecha de compra")

    def __str__(self):
        return f"{self.tipo_boleto} - {self.precio}"

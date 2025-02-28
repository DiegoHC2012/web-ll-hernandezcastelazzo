from django.contrib import admin

from .models import Localidad, Producto, Evento, Boleto, TipoBoleto, Noticias, Imagenes

admin.site.register(Localidad)
admin.site.register(Producto)
admin.site.register(Evento)
admin.site.register(Boleto)
admin.site.register(TipoBoleto)
admin.site.register(Noticias)
admin.site.register(Imagenes)

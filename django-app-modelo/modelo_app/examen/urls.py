from django.urls import path

from . import views

urlpatterns = [
    path("", views.examen, name="examen"),
    path("boletos/", views.boletos, name="boletos"),
    path("eventos/", views.eventos, name="eventos"),
    path('eventosLista/', views.lista_eventos, name='lista_eventos'),
    path('eventosLista/eliminar/<int:evento_id>/', views.eliminar_evento, name='eliminar_evento'),
    path("boletosID/<int:evento_id>", views.boletoID, name="boletoID"),
    path("agregarEvento/", views.agregarEvento, name="agregarEvento"),
    path("crearEvento/", views.crearEvento, name="crearEvento"),
    path("agregarProducto/", views.agregarProducto, name="agregarProducto"),
    path('productosLista/', views.lista_productos, name='lista_productos'),
    path('productosLista/crear/', views.crear_producto, name='crear_producto'),
    path('productosLista/eliminar/<int:producto_id>/', views.eliminar_producto, name='eliminar_producto'),
]
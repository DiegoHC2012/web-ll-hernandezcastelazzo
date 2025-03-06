from django.urls import path

from . import views

urlpatterns = [
    path("", views.examen, name="examen"),
    path("boletos/", views.boletos, name="boletos"),
    path("eventos/", views.eventos, name="eventos"),
    path("boletosID/<int:evento_id>", views.boletoID, name="boletoID"),
]
from django.urls import path

from . import views

urlpatterns = [
    path("", views.examen, name="examen"),
    path("boletos/", views.boletos, name="boletos"),
    path("eventos/", views.eventos, name="eventos"),
]
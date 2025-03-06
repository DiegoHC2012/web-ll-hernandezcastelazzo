from django.shortcuts import render, get_object_or_404
from .models import Imagenes, Noticias, Evento, Boleto, TipoBoleto, Localidad, Producto

def examen(request):
    imagen1 = Imagenes.objects.get(id=1)
    imagen2 = Imagenes.objects.get(id=2)
    imagen3 = Imagenes.objects.get(id=3)
    imagen4 = Imagenes.objects.get(id=4)
    imagen5 = Imagenes.objects.get(id=5)
    Noticia_ = Noticias.objects.all()[:2]
    Eventos = Evento.objects.select_related('localidad')[:3]


    data = {
        "imagen1": imagen1,
        "imagen2": imagen2,
        "imagen3": imagen3,
        "imagen4": imagen4,
        "imagen5": imagen5,
        "Noticias": Noticia_,
        "Eventos": Eventos
    }
    return render(request, 'base/body.html', data)

def eventos(request):
    eventos = Evento.objects.select_related('localidad')

    data = {
        "eventos": eventos
    }
    return render(request, 'examen/Eventos.html', data)

def boletos(request):
    boletos = Boleto.objects.select_related('tipo_boleto', 'evento__localidad')

    data = {
        "boletos": boletos
    }
    return render(request, 'examen/Boletos.html', data)

def boletoID(request, evento_id):
    boletos = Boleto.objects.filter(evento=evento_id).select_related('tipo_boleto', 'evento__localidad')
    data = {
        "boletos": boletos
    }
    return render(request, 'examen/Boletos.html', data)
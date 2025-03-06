from django.http import JsonResponse
import json
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

def agregarEvento(request):
    localidades = Localidad.objects.order_by('name')
    data = {
        "localidades": localidades
    }

    return render(request, 'examen/AgregarEvento.html', data)

def crearEvento(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        localidad = Localidad.objects.get(id=data['localidad'])

        # Obtener el último evento añadido
        ultimo_evento = Evento.objects.order_by('-id').first()

        # Si hay al menos un evento en la base de datos
        if ultimo_evento:
            # Si la localidad del nuevo evento es la misma que la del último evento, bloquear
            if ultimo_evento.localidad == localidad:
                return JsonResponse({"error": "No puedes agregar otro evento seguido en la misma localidad. Agrega uno en otra localidad primero."}, status=400)

        # Crear el evento si la validación es correcta
        evento = Evento.objects.create(
            name=data['name'],
            descripcion=data['descripcion'],
            imagen_url="https://img.freepik.com/fotos-premium/foto-3d-mujer-traje-colorido-plumas-coloridas-cabeza_1227606-10209.jpg?w=1380",
            fecha_inicio=data['fecha_inicio'],
            fecha_fin=data['fecha_fin'],
            localidad=localidad
        )

        return JsonResponse({"mensaje": "Evento creado con éxito", "evento_id": evento.id})

    return JsonResponse({"error": "Método no permitido"}, status=400)

def lista_eventos(request):
    eventos = Evento.objects.order_by('-id')[:2]  # Obtener los 2 últimos eventos agregados
    return JsonResponse({"eventos": [
        {
            "id": evento.id,
            "name": evento.name,
            "fecha_inicio": evento.fecha_inicio.strftime("%Y-%m-%d %H:%M"),
            "fecha_fin": evento.fecha_fin.strftime("%Y-%m-%d %H:%M"),
            "localidad": evento.localidad.name
        } for evento in eventos
    ]})

def eliminar_evento(request, evento_id):
    evento = get_object_or_404(Evento, id=evento_id)
    evento.delete()
    return JsonResponse({"mensaje": "Evento eliminado correctamente."})
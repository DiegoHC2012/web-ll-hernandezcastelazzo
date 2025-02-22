from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from .models import Users, Users_Adress
import json

def indexUsers(request):
    users = Users.objects.all()

    data = {
        "Usuarios": users,
        "titulo": "Usuarios en la base de datos"
    }
    return render(request, 'users/index.html', data)

def createUserView(request):
    return render(request, 'users/create.html')

#def createUserByFetch(request):
#    body_unicode = request.body.decode('utf-8')
#    body = json.loads(body_unicode)
#    return JsonResponse({
#        "Nombre_recibido": body.get("name")
#    })

def createUserByFetch(request):
    if request.method == "POST":
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)

            # Extraer datos del JSON recibido
            name = body.get("name")
            email = body.get("email")
            age = body.get("age")
            rfc = body.get("rfc")
            photo = body.get("photo")

            # Crear y guardar el usuario en la base de datos
            user = Users.objects.create(name=name, email=email, age=age, rfc=rfc, photo=photo)

            return JsonResponse({
                "message": "User created successfully",
                "status": "Success",
                "user_id": user.id
            })
        
        except Exception as e:
            return JsonResponse({
                "message": str(e),
                "status": "Error"
            })
    else:
        return JsonResponse({
            "message": "Invalid request method",
            "status": "Error"
        }, status=400)


def createUser(request):
    data = {}
    try:
        if request.method == "POST":
            name = request.POST.get("name")
            email = request.POST.get("email")
            age = request.POST.get("age")
            rfc = request.POST.get("rfc")
            photo = request.POST.get("photo")

            user = Users(name=name, email=email, age=age, rfc=rfc, photo=photo)
            user.save()

            data["user"] = user
            data["message"] = "User created"
            data["status"] = "Success"

    except Exception as e:
        data["message"] = str(e)
        data["status"] = "Error"

    return render(request, 'users/create.html', data)

def userDetail(request, id):
    #De libreria
    #user = get_object_or_404(Users, id=id)

    #Manual
    user = Users.objects.get(id=id)
    return render(request, 'users/detail.html', {'user': user})

def editUser(request, id):
    user = get_object_or_404(Users, id=id)

    if request.method == "POST":  # Usamos POST como UPDATE
        try:
            body_unicode = request.body.decode('utf-8')

            if not body_unicode:  # Si el cuerpo está vacío, error
                return JsonResponse({"message": "No se recibieron datos.", "status": "Error"}, status=400)

            body = json.loads(body_unicode)  # Convertir JSON a diccionario

            # Actualizar los datos del usuario con los valores recibidos
            user.name = body.get("name", user.name)
            user.email = body.get("email", user.email)
            user.age = body.get("age", user.age)
            user.rfc = body.get("rfc", user.rfc)
            user.photo = body.get("photo", user.photo)
            user.save()  # Guardar cambios

            return JsonResponse({
                "message": "Usuario actualizado correctamente",
                "status": "Success"
            })

        except json.JSONDecodeError:
            return JsonResponse({
                "message": "Error en el formato JSON recibido",
                "status": "Error"
            }, status=400)

        except Exception as e:
            return JsonResponse({
                "message": str(e),
                "status": "Error"
            }, status=500)

    return render(request, 'users/edit.html', {'user': user})  # Renderizar la pantalla si es GET
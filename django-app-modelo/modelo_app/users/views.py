from django.shortcuts import render
from django.http import HttpResponse
from .models import Users, Users_Adress


def indexUsers(request):
    users = Users.objects.all()

    data = {
        "Usuarios": users,
        "titulo": "Usuarios en la base de datos"
    }
    return render(request, 'users/index.html', data)

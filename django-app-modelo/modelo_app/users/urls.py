from django.urls import path

from . import views

urlpatterns = [
    path("create", views.createUserView, name="createUserView"),
    path("createUser", views.createUser, name="createUser"),
    path("edit/<int:id>", views.editUser, name="editUser"),
    path("details/<int:id>", views.userDetail, name="userDetail"),
    path("", views.indexUsers, name="indexUsers"),
    path("createUser-by-fetch", views.createUserByFetch, name="createUser-by-fetch")
]
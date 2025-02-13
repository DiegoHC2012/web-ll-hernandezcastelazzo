from django.db import models

#Automaticamente coloca la llave primaria _id
class Users(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    age = models.PositiveIntegerField(default=18)
    rfc = models.CharField(max_length=200)
    photo = models.CharField(max_length=200)
    creted_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    
def __str__(self):
    return self.name


class Users_Adress(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    street = models.CharField(max_length=200)
    zip_code = models.PositiveIntegerField(default=97000)
    city = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.street
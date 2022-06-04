from django.shortcuts import render


def welcome(request):
    msg = 'Welcome to my first project'
    return render(request, 'client/welcome.html', {'message': msg})

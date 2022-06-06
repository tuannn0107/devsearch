from django.shortcuts import render


def welcome(request):
    msg = 'Welcome to my first project'
    return render(request, 'client/welcome.html', {'message': msg})


def create_project(request):
    return render(request, 'client/project_form.html')


def contact(request):
    return render(request, 'client/contact.html')

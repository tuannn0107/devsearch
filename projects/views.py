from django.shortcuts import render


def welcome(request):
    msg = 'Welcome to my first project'
    return render(request, 'client/welcome.html', {'message': msg})


def projects(request):
    # projects, search_query = searchProjects(request)
    # custom_range, projects = paginateProjects(request, projects, 6)
    #
    # context = {'projects': projects,
    #            'search_query': search_query, 'custom_range': custom_range}
    return render(request, 'client/projects.html')


def create_project(request):
    return render(request, 'client/project_form.html')


def feedback(request):
    return render(request, 'client/feedback.html')


def add_feedback(request):
    print(request.POST)
    return render(request, 'client/feedback.html', {'customer_name': 'Jacky Love'})

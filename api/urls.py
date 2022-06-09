from django.urls import path

from api import views

urlpatterns = [
    path('', views.get_routes, name="test"),
    path('projects/', views.get_projects),
    # path('project/<str:pk>/', views.project, name="project"),
    #
    # path('create-project/', views.createProject, name="create-project"),
    #
    # path('update-project/<str:pk>/', views.updateProject, name="update-project"),
    #
    # path('delete-project/<str:pk>/', views.deleteProject, name="delete-project"),
]

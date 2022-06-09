from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.serializers import ProjectSerializer
from projects.models import Project


def get_routes(request):
    routes = [
        {'name': 'Django', 'version': 'xxxx'}
    ]
    return JsonResponse(routes, safe=False)


@api_view(['GET'])
def get_projects(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

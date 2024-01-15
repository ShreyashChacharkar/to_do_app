from django.urls import path
from .views import manageTasks, updateTask, deleteTask

urlpatterns = [
    path('api/tasks/', manageTasks, name='manage-tasks'),
    path('api/tasks/<int:pk>/', updateTask, name='update-task'),
    path('api/tasks/<int:pk>/delete/', deleteTask, name='delete-task'),
]

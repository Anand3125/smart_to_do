from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.task_list_create),
    path('tasks/<int:pk>/', views.task_detail),
    path('categories/', views.category_list),
    path('context/', views.context_list_create),
    path('db-check/', views.db_connection_check),
    path('ai/suggest/', views.ai_suggest_task),
    path('ai/suggest/auto/', views.ai_suggest_task_auto_save),
]

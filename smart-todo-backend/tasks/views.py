from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import connections
from django.db.utils import OperationalError
from .models import Task, Category
from .serializers import TaskSerializer, CategorySerializer, ContextSerializer
from tasks.utils.gemini_ai import get_task_suggestion  # Import Gemini helper







# ✅ DB health check endpoint
@api_view(['GET'])
def db_connection_check(request):
    try:
        connections['default'].cursor()
        return Response({"message": "✅ Supabase DB connection successful!"}, status=status.HTTP_200_OK)
    except OperationalError:
        return Response({"message": "❌ Failed to connect to Supabase DB"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ✅ GET all tasks, POST new task
@api_view(['GET', 'POST'])
def task_list_create(request):
    if request.method == 'GET':
        tasks = Task.objects.all().order_by('-created_at')
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ GET / PUT / DELETE single task by ID
@api_view(['GET', 'PUT', 'DELETE'])
def task_detail(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        task.delete()
        return Response({'message': 'Task deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

# ✅ Get all categories
@api_view(['GET'])
def category_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)





@api_view(['GET', 'POST'])
def context_list_create(request):
    if request.method == 'GET':
        contexts = Context.objects.all().order_by('-created_at')
        serializer = ContextSerializer(contexts, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ContextSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def ai_suggest_task(request):
    title = request.data.get("title")
    context = request.data.get("context", "")

    if not title:
        return Response({"error": "Title is required"}, status=400)

    suggestion = get_task_suggestion(title, context)
    return Response(suggestion)







@api_view(['POST'])
def ai_suggest_task_auto_save(request):
    title = request.data.get("title")
    context = request.data.get("context", "")

    if not title:
        return Response({"error": "Title is required"}, status=status.HTTP_400_BAD_REQUEST)

    # 🧠 Use Gemini to get AI suggestion
    suggestion = get_task_suggestion(title, context)

    if "error" in suggestion:
        return Response(suggestion, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # ✅ Get or create category from AI suggestion
    category_name = suggestion.get("category", "General")
    category, _ = Category.objects.get_or_create(name=category_name)

    # 💾 Save task to DB
    task = Task.objects.create(
        title=title,
        description=suggestion.get("enhancedDescription", ""),
        category=category,
        priority_score=suggestion.get("priority", 0),
        deadline=suggestion.get("deadline"),
        status="pending"
    )

    serializer = TaskSerializer(task)
    return Response(serializer.data, status=status.HTTP_201_CREATED)




